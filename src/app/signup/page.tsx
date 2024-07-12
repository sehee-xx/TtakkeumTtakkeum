"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SignupWrapper>
      <Header />
      <SignupBox>
        <SignupImg src="/Signup.svg" />
        <SignupText>회원가입</SignupText>
        <Input placeholder="닉네임을 입력해주세요" />
        <Input placeholder="고슴도치의 이름을 입력해주세요" />
        <Input placeholder="아이디를 입력해주세요" />
        <Input placeholder="비밀번호를 입력해주세요" />
        <Input placeholder="비밀번호를 다시 입력해주세요" />
        <SignupButton>회원가입</SignupButton>
      </SignupBox>
    </SignupWrapper>
  );
};

export default Signup;

const SignupWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px;
  margin-top: 50px;
  margin-bottom: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SignupBox = styled.div`
  position: relative;
  width: 700px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-top: 50px;
  padding: 40px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const SignupImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const SignupText = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #58595b;
  margin-top: 30px;
  margin-bottom: 20px;
  align-self: flex-start;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  font-weight: 600;
  font-size: 18px;
  padding: 10px;
  color: #58595b;
  border: none;
  border-bottom: 2px solid #b3b3b3;
  box-sizing: border-box;
  margin-bottom: 20px;

  &::placeholder {
    color: #b3b3b3;
  }
`;

const SignupButton = styled.button`
  width: 150px;
  padding: 10px 10px;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border: none;
  border-radius: 10px;
  margin-top: 10px;

  &:hover {
    background-color: #d3a179;
  }
`;
