"use client";

import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const DochiLifeWrite = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("imageUrl", imageFile);
    }
    formData.append("hashtag", JSON.stringify(hashtags));

    try {
      console.log(process.env.BACKEND_HOSTNAME);
      const response = await axios.post(
        `${process.env.BACKEND_HOSTNAME}/articles`,
        formData
      );
      console.log("글 작성 성공", response.data);
      router.push("/dochiLife");
    } catch (error) {
      console.error("글 작성 실패", error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHashtagInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHashtagInput(event.target.value);
  };

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && !hashtags.includes(hashtagInput.trim())) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((hashtag) => hashtag !== tag));
  };

  return (
    <WriteWrapper>
      <Header />
      <Form id="writeForm" onSubmit={handleSubmit}>
        <Title>[ 게시글 작성 ]</Title>
        <Label>
          제목
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Label>
        <Label>
          내용
          <Textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Label>
        <Label>
          이미지 업로드
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Label>
        {imagePreview && (
          <ImagePreview src={imagePreview} alt="Image preview" />
        )}
        <Label>
          해시태그
          <HashtagInputWrapper>
            <Input
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
        </Label>
        <Button type="submit">작성 완료</Button>
      </Form>
    </WriteWrapper>
  );
};

export default DochiLifeWrite;

const WriteWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 90px 200px;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #58595b;
  padding-bottom: 0px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #58595b;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
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
`;
