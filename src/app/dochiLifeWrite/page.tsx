"use client";

import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

const DochiLifeWrite = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // 게시글 로직 작성 (POST)
    router.push("/dochiLife");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDivClick = () => {
    const form = document.getElementById("writeForm") as HTMLFormElement;
    if (form) {
      form.requestSubmit(); // 이 메서드는 버튼 없이 폼을 제출합니다.
    }
  };

  return (
    <WriteWrapper>
      <Header />
      <Form id="writeForm" onSubmit={handleSubmit}>
        <Title>[ 게시글 작성 ]</Title>
        <Label>
          제목
          <Input type="text" required />
        </Label>
        <Label>
          내용
          <Textarea rows={10} required />
        </Label>
        <Label>
          이미지 업로드
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Label>
        {imagePreview && (
          <ImagePreview src={imagePreview} alt="Image preview" />
        )}
        <DivButton onClick={handleDivClick}>작성 완료</DivButton>
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

const DivButton = styled.div`
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
