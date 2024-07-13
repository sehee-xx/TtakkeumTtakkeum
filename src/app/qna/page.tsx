"use client";

import Header from "@/components/Header";
import { useState } from "react";
import styled from "styled-components";

const QnA = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      author: "사용자1",
      question: "고슴도치 먹이는 무엇이 좋을까요?",
      answers: [
        { id: 1, author: "사용자2", content: "곤충이 좋습니다." },
        { id: 2, author: "사용자3", content: "사료도 가능합니다." },
      ],
    },
    {
      id: 2,
      author: "사용자4",
      question: "고슴도치의 적정 온도는?",
      answers: [
        { id: 1, author: "사용자5", content: "22도에서 26도가 적당합니다." },
      ],
    },
  ]);

  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const handleQuestionSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (questionInput.trim()) {
      setQuestions([
        ...questions,
        {
          id: questions.length + 1,
          author: "새 작성자", // 임의의 작성자 이름
          question: questionInput,
          answers: [],
        },
      ]);
      setQuestionInput("");
    }
  };

  const handleAnswerSubmit = (event: React.FormEvent, questionId: number) => {
    event.preventDefault();
    if (answerInput.trim()) {
      setQuestions(
        questions.map((q) =>
          q.id === questionId
            ? {
                ...q,
                answers: [
                  ...q.answers,
                  {
                    id: q.answers.length + 1,
                    author: "새 작성자", // 임의의 작성자 이름
                    content: answerInput,
                  },
                ],
              }
            : q
        )
      );
      setAnswerInput("");
      setSelectedQuestionId(null);
    }
  };

  return (
    <QnAWrapper>
      <Header />
      <MainContent>
        <Section>
          <Title>[ Q&A ]</Title>
          {questions.map((q) => (
            <Question key={q.id}>
              <QuestionAuthor>{q.author}</QuestionAuthor>
              <QuestionText>{q.question}</QuestionText>
              <AnswerList>
                {q.answers.map((answer, index) => (
                  <Answer key={index}>
                    <AnswerAuthor>{answer.author}</AnswerAuthor>
                    {answer.content}
                  </Answer>
                ))}
              </AnswerList>
              {selectedQuestionId === q.id ? (
                <Form onSubmit={(event) => handleAnswerSubmit(event, q.id)}>
                  <Textarea
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                    placeholder="답변을 입력하세요..."
                    required
                  />
                  <Button type="submit">답변하기</Button>
                </Form>
              ) : (
                <AnswerButton onClick={() => setSelectedQuestionId(q.id)}>
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
`;

const Question = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const QuestionAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 5px;
`;

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 10px;
`;

const AnswerList = styled.div`
  margin-top: 10px;
  padding-left: 20px;
`;

const Answer = styled.div`
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 10px;
  color: #58595b;
`;

const AnswerAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 5px;
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
  border-radius: 5px;
  resize: none;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  resize: none;
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
`;
