"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Signin = () => {
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
    <SigninWrapper>
      <Header />
      <SigninBox>
        <SigninImg src="/Signin.svg" />
        <SiginText>로그인</SiginText>
        <Input placeholder="아이디를 입력해주세요" />
        <Input placeholder="비밀번호를 입력해주세요" />
        <SigninButton>로그인</SigninButton>
      </SigninBox>
    </SigninWrapper>
  );
};

export default Signin;

const SigninWrapper = styled.div`
  width: 100%;
  height: 100vh;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SigninBox = styled.div`
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

const SigninImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
`;

const SiginText = styled.div`
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

const SigninButton = styled.button`
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
