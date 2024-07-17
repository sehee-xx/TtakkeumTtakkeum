"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface QnACard {
  qId: number;
  qAuthorNickname: string;
  qContent: string;
  answers: Answer[];
}
interface Answer {
  aId: number;
  aAuthorNickname: string;
  aContent: string;
}

const QnA = () => {
  const [qnaCard, setQnaCard] = useState<QnACard[]>([]);
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );
  const MySwal = withReactContent(Swal);

  const fetchQnA = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/qnas`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );

      // 서버로부터 받아온 데이터를 변환하여 QnACard 형태로 변형
      const transformedData = response.data.map((item: any) => ({
        qId: item.id,
        qAuthorNickname: item.author.nickname,
        qContent: item.content,
        answers: item.answers.map((answer: any) => ({
          aId: answer.id,
          aAuthorNickname: answer.author.nickname,
          aContent: answer.content,
        })),
      }));

      // qnaCard 상태 업데이트
      setQnaCard(transformedData);
    } catch (error) {
      console.error("QnA 로드 실패", error);
    }
  };

  useEffect(() => {
    fetchQnA();
  }, []);

  const handleQuestionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (questionInput.trim()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/qnas/questions`,
          {
            content: questionInput,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const newQuestion = {
          qId: response.data.id,
          qAuthorNickname: response.data.author.nickname,
          qContent: response.data.content,
          answers: [],
        };

        setQnaCard([...qnaCard, newQuestion]);
        setQuestionInput("");
        if (window.innerWidth <= 768) {
          MySwal.fire({
            icon: "success",
            title: "질문이 등록되었습니다.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        } else {
          MySwal.fire({
            icon: "success",
            title: "질문이 등록되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#d3a179",
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        }
      } catch (error) {
        if (window.innerWidth <= 768) {
          MySwal.fire({
            icon: "error",
            title: "질문 등록에 실패했습니다.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "질문 등록에 실패했습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#d3a179",
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        }
      }
    }
  };

  const handleAnswerSubmit = async (
    event: React.FormEvent,
    selectedQuestionId: number
  ) => {
    event.preventDefault();
    if (selectedQuestionId && answerInput.trim()) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/qnas/${selectedQuestionId}/answers`,
          {
            content: answerInput,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const newAnswer = {
          aId: response.data.id,
          aAuthorNickname: response.data.author.nickname,
          aContent: response.data.content,
        };

        setQnaCard(
          qnaCard.map((q) =>
            q.qId === selectedQuestionId
              ? {
                  ...q,
                  answers: [...q.answers, newAnswer],
                }
              : q
          )
        );
        setAnswerInput("");
        setSelectedQuestionId(null);
        if (window.innerWidth <= 768) {
          MySwal.fire({
            icon: "success",
            title: "답변이 등록되었습니다.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        } else {
          MySwal.fire({
            icon: "success",
            title: "답변이 등록되었습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#d3a179",
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        }
      } catch (error) {
        if (window.innerWidth <= 768) {
          MySwal.fire({
            icon: "error",
            title: "답변 등록에 실패했습니다.",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        } else {
          MySwal.fire({
            icon: "error",
            title: "답변 등록에 실패했습니다.",
            confirmButtonText: "확인",
            confirmButtonColor: "#d3a179",
            customClass: {
              popup: "swal-custom-popup",
              title: "swal-custom-title",
              htmlContainer: "swal-custom-html-container",
            },
          });
        }
      }
    }
  };

  const handleDeleteQna = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/qnas/${id}`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // 상태 업데이트
        setQnaCard((prevQnaCard) => prevQnaCard.filter((q) => q.qId !== id));
      } else {
        console.error("삭제 실패: 응답 상태가 200이 아님");
      }
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "success",
          title: "질문이 삭제되었습니다.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      } else {
        MySwal.fire({
          icon: "success",
          title: "질문이 삭제되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
    } catch (error) {
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "error",
          title: "질문 삭제에 실패했습니다.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "질문 삭제에 실패했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
    }
  };

  const handleDeleteAnswer = async (id: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/qnas/answers/${id}`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setQnaCard((prevQnaCard) =>
          prevQnaCard.map((q) => ({
            ...q,
            answers: q.answers.filter((a) => a.aId !== id),
          }))
        );
      } else {
        console.error("삭제 실패: 응답 상태가 200이 아님");
      }
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "success",
          title: "답변이 삭제되었습니다.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      } else {
        MySwal.fire({
          icon: "success",
          title: "답변이 삭제되었습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
    } catch (error) {
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "error",
          title: "답변 삭제 과정에서 오류가 발생했습니다.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "답변 삭제 과정에서 오류가 발생했습니다.",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
    }
  };

  return (
    <QnAWrapper>
      <Header />
      <MainContent>
        <Section>
          <Title>[ Q&A ]</Title>
          {qnaCard.map((q) => (
            <Question key={q.qId}>
              <QuestionDeleteIcon
                src="/deleteIcon.png"
                onClick={() => handleDeleteQna(q.qId)}
              />
              <QuestionAuthor>{q.qAuthorNickname}</QuestionAuthor>
              <QuestionText>{q.qContent}</QuestionText>
              <AnswerList>
                {q.answers.map((answer, index) => (
                  <Answer key={index}>
                    <AnswerDeleteIcon
                      src="/deleteIcon.png"
                      onClick={() => handleDeleteAnswer(answer.aId)}
                    />
                    <AnswerAuthor>{answer.aAuthorNickname}</AnswerAuthor>
                    {answer.aContent}
                  </Answer>
                ))}
              </AnswerList>
              {selectedQuestionId === q.qId ? (
                <Form onSubmit={(event) => handleAnswerSubmit(event, q.qId)}>
                  <Textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="답변을 입력하세요..."
                    required
                  />
                  <Button type="submit">답변하기</Button>
                </Form>
              ) : (
                <AnswerButton onClick={() => setSelectedQuestionId(q.qId)}>
                  답변하기
                </AnswerButton>
              )}
            </Question>
          ))}
        </Section>
        <Section>
          <Title>질문하기</Title>
          <Form onSubmit={handleQuestionSubmit}>
            <Textarea
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="질문을 입력하세요..."
              required
            />
            <DivButton onClick={handleQuestionSubmit}>질문하기</DivButton>
          </Form>
        </Section>
      </MainContent>
    </QnAWrapper>
  );
};

export default QnA;

const QnAWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 100px 200px;

  @media (max-width: 1200px) {
    padding: 100px 100px;
  }

  @media (max-width: 768px) {
    padding: 100px 50px;
  }

  @media (max-width: 480px) {
    padding: 90px 20px 30px 20px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #58595b;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const Question = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const QuestionDeleteIcon = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 10px;
  right: 10px;
`;

const AnswerDeleteIcon = styled.img`
  position: absolute;
  width: 15px;
  height: 15px;
  top: 10px;
  right: 10px;
`;

const QuestionAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 10px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const AnswerList = styled.div`
  margin-top: 10px;
  padding-left: 20px;

  @media (max-width: 480px) {
    padding-left: 10px;
  }
`;

const Answer = styled.div`
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #58595b;
  position: relative;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const AnswerAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  color: #58595b;
  border-radius: 5px;
  resize: none;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  resize: none;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d3a179;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: 14px;
  }
`;

const DivButton = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #d3a179;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: 14px;
  }
`;

const AnswerButton = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #5a9;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: fit-content;
  align-self: flex-end;

  &:hover {
    background-color: #47a;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
    font-size: 12px;
  }
`;
