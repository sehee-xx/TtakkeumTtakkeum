"use client";

import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const DochiLifeDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "제목 없음";
  const image = searchParams.get("image") || "/loading.svg";
  const id = parseInt(searchParams.get("id") || "0", 10);

  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "작성자1",
      content: "댓글 내용 1",
      replies: [
        { id: 1, author: "작성자2", content: "답글 내용 1-1" },
        { id: 2, author: "작성자3", content: "답글 내용 1-2" },
      ],
    },
    {
      id: 2,
      author: "작성자4",
      content: "댓글 내용 2",
      replies: [],
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const [hashtags, setHashtags] = useState<string[]>([
    "#고슴도치",
    "#일상",
    "#애완동물",
  ]);

  const cardData = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    image: `/dochiLife/ex${index + 1}.png`,
    title: `도치의 일상 ${index + 1}`,
    date: `2023-07-${index + 1}`,
  }));

  const relatedCards = cardData.filter((card) => card.id !== id);

  const handleRelatedCardClick = (id: number, title: string, image: string) => {
    router.push(
      `/dochiLifeDetail/${id}?title=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(image)}`
    );
  };

  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentInput.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: "새 작성자",
          content: commentInput,
          replies: [],
        },
      ]);
      setCommentInput("");
    }
  };

  const handleReplySubmit = (commentId: number) => {
    if (replyInput.trim()) {
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: comment.replies.length + 1,
                    author: "새 작성자",
                    content: replyInput,
                  },
                ],
              }
            : comment
        )
      );
      setReplyInput("");
      setSelectedCommentId(null);
    }
  };

  const handleDivClick = () => {
    const form = document.getElementById("commentForm") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <DochiLifeDetailWrapper>
      <Header />
      <ContentWrapper>
        <Card>
          <CardImageWrapper>
            <DetailImage src={image} alt={title} />
          </CardImageWrapper>
          <CardContent>
            <TitleText>{title}</TitleText>
            <DescriptionText>
              넓은 의미로는 고슴도치아과(Erinaceinae)에 속한 포유류의 총칭이고,
              좁게는 국내 서식종인 고슴도치(Amur hedgehog, Erinaceus
              amurensis)를 가리킨다. 국내 서식종 기준으로 자연 서식지는 러시아
              아무르와 연해주, 중국 중앙부에서 동부(남부 해안가와 북부 제외),
              만주, 한반도 등지이다. 애완동물로 기르는 종은 한국 고슴도치가
              아니라 아프리카산의 네발가락고슴도치(Four-toed hedgehog, Atelerix
              albiventris)와 알제리고슴도치(Algerian hedgehog, A. algirus)의
              교배종이다.
            </DescriptionText>
            <HashtagList>
              {hashtags.map((hashtag, index) => (
                <Hashtag key={index}>{hashtag}</Hashtag>
              ))}
            </HashtagList>
            <LikeButton
              onClick={toggleLike}
              src={liked ? "/fillHeart.png" : "/emptyHeart.png"}
            />
          </CardContent>
        </Card>
        <CommentSection>
          <CommentForm id="commentForm" onSubmit={handleCommentSubmit}>
            <CommentInput
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 작성하세요..."
            />
            <DivCommentButton onClick={handleDivClick}>작성</DivCommentButton>
          </CommentForm>
          <CommentList>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <CommentAuthor>{comment.author}</CommentAuthor>
                <CommentContent>{comment.content}</CommentContent>
                <ReplyList>
                  {comment.replies.map((reply) => (
                    <Reply key={reply.id}>
                      <ReplyAuthor>{reply.author}</ReplyAuthor>
                      <ReplyContent>{reply.content}</ReplyContent>
                    </Reply>
                  ))}
                </ReplyList>
                {selectedCommentId === comment.id ? (
                  <ReplyForm onSubmit={(event) => event.preventDefault()}>
                    <ReplyInput
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder="답글을 입력하세요..."
                      required
                    />
                    <DivButton onClick={() => handleReplySubmit(comment.id)}>
                      답글 달기
                    </DivButton>
                  </ReplyForm>
                ) : (
                  <ReplyButton onClick={() => setSelectedCommentId(comment.id)}>
                    답글 달기
                  </ReplyButton>
                )}
              </Comment>
            ))}
          </CommentList>
        </CommentSection>
      </ContentWrapper>
    </DochiLifeDetailWrapper>
  );
};

export default DochiLifeDetail;

const DochiLifeDetailWrapper = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  background: #fff;
  border-radius: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 15px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    border-radius: 30px;
  }
`;

const CardImageWrapper = styled.div`
  width: 50%;
  height: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TitleText = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #333;
  padding-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 20px;
    padding-bottom: 10px;
    font-size: 20px;
  }
`;

const DescriptionText = styled.div`
  font-size: 18px;
  color: #555;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const HashtagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

const Hashtag = styled.span`
  background-color: #ccc;
  color: #ffffff;
  padding: 10px 10px;
  border-radius: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const LikeButton = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 30px;
  right: 30px;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    top: 20px;
    right: 20px;
  }
`;

const CommentSection = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 10px;
    background-color: #fff;
    box-shadow: none;
  }
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const DivCommentButton = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #d3a179;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Comment = styled.div`
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  padding-bottom: 50px;

  @media (max-width: 480px) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
`;

const CommentContent = styled.div`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const ReplyList = styled.div`
  margin-top: 10px;
  padding-left: 20px;
`;

const Reply = styled.div`
  background: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const ReplyAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
`;

const ReplyContent = styled.div`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const ReplyForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const ReplyInput = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const DivButton = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #d3a179;
  }
`;

const ReplyButton = styled.div`
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
  position: absolute;
  right: 10px;
  bottom: 10px;

  &:hover {
    background-color: #47a;
  }
`;
