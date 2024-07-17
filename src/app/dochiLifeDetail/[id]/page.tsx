"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styled from "styled-components";

interface Comment {
  id: number;
  author: string;
  content: string;
}

const DochiLifeDetail = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const id = pathname.split("/").pop() || "0";
  const initialTitle = searchParams.get("title") || "제목 없음";
  const initialImage = searchParams.get("image") || "/loading.svg";

  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);
  const [newContent, setNewContent] = useState(content);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>("");
  const [isProcessingLike, setIsProcessingLike] = useState(false);

  useEffect(() => {
    if (id) {
      fetchCard();
    }
  }, [id]);

  const fetchCard = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("resData", response.data);
      setContent(response.data.content);
      setNewContent(response.data.content);
      setNewTitle(response.data.title);
      setImagePreview(response.data.image || initialImage);
      setHashtags(response.data.hashtag);
      setComments(
        response.data.comments.map((comment: any) => ({
          id: comment.id,
          author: comment.user.nickname,
          content: comment.content,
        }))
      );
      setLiked(response.data.isLike); // 초기 좋아요 상태 설정
      setLoading(false);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("카드 데이터를 불러오지 못했습니다.", error);
        if (error.response && error.response.status === 401) {
          router.push("/signin");
        }
      } else {
        console.error("알 수 없는 오류가 발생했습니다.", error);
      }
      setLoading(false);
    }
  };

  const toggleLike = async () => {
    if (isProcessingLike) {
      return; // 요청이 진행 중이면 새로운 요청을 막음
    }

    setIsProcessingLike(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles/${id}/like`;
      const method = liked ? "delete" : "post";

      const response = await axios({
        method: method,
        url: url,
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setLiked((prevLiked) => !prevLiked);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("좋아요 요청을 처리하지 못했습니다.", error);
      } else {
        console.error("알 수 없는 오류가 발생했습니다.", error);
      }
    } finally {
      setIsProcessingLike(false);
    }
  };

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('click comment submit');
    if (commentInput.trim()) {
      try {
        const token = localStorage.getItem('token');
        // const userNickname = JSON.parse(
        //   localStorage.getItem('nickname') || 'null'
        // );
        const userNickname = localStorage.getItem('nickname') || 'null';

        console.log('userNickname', userNickname);
        if (!userNickname) {
          console.error("닉네임을 불러오지 못했습니다.");
          return;
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/comments`,
          { content: commentInput, articleId: Number(id) },
          {
            headers: {
              "Content-Type": `application/json`,
              "ngrok-skip-browser-warning": "69420",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("CommentPostRes", response.data);
        // 댓글 등록이 성공하면 새로운 댓글을 상태에 추가
        setComments((prevComments) => [
          ...prevComments,
          {
            id: response.data.id,
            author: userNickname,
            content: commentInput,
          },
        ]);
        setCommentInput("");
      } catch (error) {
        console.error("댓글 등록 실패", error);
      }
    }
  };

  const handleDivClick = (event: React.FormEvent) => {
    const form = document.getElementById("commentForm") as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  const handleEditButtonClick = (commentId: number, content: string) => {
    setEditCommentId(commentId);
    setEditCommentContent(content);
  };

  const handleEditCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditCommentContent(event.target.value);
  };

  const handleEditCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/comments/${editCommentId}`,
        { content: editCommentContent },
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === editCommentId
              ? { ...comment, content: editCommentContent }
              : comment
          )
        );
        setEditCommentId(null);
        setEditCommentContent("");
      }
    } catch (error) {
      console.error("댓글 수정 실패", error);
    }
  };

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const formData = new FormData();
      formData.append("title", newTitle);
      formData.append("content", newContent);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("hashtag", hashtags.join(","));

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setContent(newContent);
        setNewTitle(newTitle);
        setIsEditModalOpen(false);
        fetchCard(); // 수정 후 데이터를 다시 불러옴
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("수정 요청을 처리하지 못했습니다.", error);
      } else {
        console.error("알 수 없는 오류가 발생했습니다.", error);
      }
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleHashtagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHashtagInput(event.target.value);
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      if (hashtags.length < 5) {
        setHashtags([...hashtags, hashtagInput.trim()]);
      } else {
        alert("해시태그는 최대 5개까지 추가할 수 있습니다.");
      }
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== tag));
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles/${id}`,
        {
          headers: {
            'Content-Type': `application/json`,
            'ngrok-skip-browser-warning': '69420',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      router.push("/dochiLife");
    } catch (error) {
      console.error("삭제 실패", error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/comments/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <DochiLifeDetailWrapper>
      <Header />
      <ContentWrapper>
        <Card>
          <CardImageWrapper>
            <DetailImage
              src={imagePreview || "/loading.svg"}
              alt={newTitle || "제목 없음"}
            />
          </CardImageWrapper>
          <CardContent>
            <TitleText>{newTitle || "제목 없음"}</TitleText>
            <DescriptionText>{content}</DescriptionText>
            <HashtagList>
              {hashtags.map((hashtag, index) => (
                <Hashtag key={index}>#{hashtag}</Hashtag>
              ))}
            </HashtagList>
            <EditButton
              src="/editIcon.png"
              onClick={() => setIsEditModalOpen(true)}
            />
            <DeleteButton
              src="/deleteIcon.png"
              onClick={handleDeleteButtonClick}
            />
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
                {editCommentId === comment.id ? (
                  <EditCommentForm onSubmit={handleEditCommentSubmit}>
                    <EditCommentInput
                      value={editCommentContent}
                      onChange={handleEditCommentChange}
                    />
                    <SaveCommentButton type="submit">수정</SaveCommentButton>
                    <CancelEditButton onClick={() => setEditCommentId(null)}>
                      취소
                    </CancelEditButton>
                  </EditCommentForm>
                ) : (
                  <>
                    <CommentEdit
                      src="/editIcon.png"
                      onClick={() =>
                        handleEditButtonClick(comment.id, comment.content)
                      }
                    />
                    <CommentDelete
                      src="/deleteIcon.png"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <CommentContent>{comment.content}</CommentContent>
                  </>
                )}
              </Comment>
            ))}
          </CommentList>
        </CommentSection>
      </ContentWrapper>
      {isEditModalOpen && (
        <EditModal>
          <EditForm onSubmit={handleEditSubmit}>
            <EditLabel>
              제목
              <EditInput
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </EditLabel>
            <EditLabel>
              내용
              <EditTextarea
                rows={10}
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </EditLabel>
            <EditLabel>
              이미지 업로드
              <EditInput
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </EditLabel>
            {imagePreview && (
              <ImagePreview src={imagePreview} alt="Image preview" />
            )}
            <EditLabel>
              해시태그
              <HashtagInputWrapper>
                <EditInput
                  type="text"
                  value={hashtagInput}
                  onChange={handleHashtagInputChange}
                  placeholder="해시태그를 입력하세요"
                />
                <AddHashtagButton type="button" onClick={handleAddHashtag}>
                  추가
                </AddHashtagButton>
              </HashtagInputWrapper>
              <HashtagList>
                {hashtags.map((tag, index) => (
                  <Hashtag key={index} onClick={() => handleRemoveHashtag(tag)}>
                    #{tag}
                  </Hashtag>
                ))}
              </HashtagList>
            </EditLabel>
            <Button type="submit">수정 완료</Button>
          </EditForm>
        </EditModal>
      )}
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
  padding: 30px;
  box-sizing: border-box;

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
  font-size: 28px;
  font-weight: 800;
  color: #58595b;
  padding-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 16px;
    padding-bottom: 10px;
    font-size: 20px;
  }
`;

const DescriptionText = styled.div`
  font-size: 18px;
  color: #58595b;
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
  cursor: pointer;

  &:hover {
    background-color: #d3a179;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const EditButton = styled.img`
  width: 26px;
  height: 26px;
  position: absolute;
  top: 30px;
  right: 70px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    top: 20px;
    right: 50px;
    width: 20px;
    height: 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled.img`
  width: 26px;
  height: 26px;
  position: absolute;
  top: 30px;
  right: 110px;

  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 480px) {
    top: 20px;
    right: 80px;
    width: 20px;
    height: 20px;
  }
`;

const LikeButton = styled.img`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 30px;
  right: 30px;

  @media (max-width: 768px) {
    width: 26px;
    height: 26px;
  }

  @media (max-width: 480px) {
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px;
  }
`;

const CommentSection = styled.div`
  width: 100%;
  max-width: 1000px;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

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
  box-sizing: border-box;

  @media (max-width: 480px) {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

const CommentEdit = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 40px;
`;

const CommentDelete = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 15px;
`;

const CommentAuthor = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
`;

const CommentContent = styled.div`
  font-size: 16px;
  color: #555;
  margin-top: 5px;
`;

const EditCommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const EditCommentInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SaveCommentButton = styled.button`
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

const CancelEditButton = styled.button`
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

const EditModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
`;

const EditForm = styled.form`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 90%;
  max-width: 500px;
  margin: 20px;
  margin-top: calc(12vh + 20px);
  box-sizing: border-box;
`;

const EditLabel = styled.label`
  font-size: 16px;
  color: #58595b;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const EditInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const EditTextarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const HashtagInputWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const AddHashtagButton = styled.button`
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
    font-size: 12px;
  }
`;

const Button = styled.button`
  width: 120px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  align-self: flex-end;
  cursor: pointer;

  &:hover {
    background-color: #d3a179;
  }

  @media (max-width: 480px) {
    font-size: 16px;
    width: 100px;
    height: 40px;
  }
`;
