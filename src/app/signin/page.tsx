"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Signin = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const MySwal = withReactContent(Swal);

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

  const onClickSignin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("token", response.data.accessToken);
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "success",
          title: "로그인 성공",
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
          title: "로그인 성공",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
      router.push("/");
    } catch (error) {
      console.error("로그인 실패", error);
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "error",
          title: "로그인 실패",
          text: "로그인 정보를 다시 확인해주세요!",
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
          title: "로그인 실패",
          text: "로그인 정보를 다시 확인해주세요!",
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
    <SigninWrapper>
      <Header />
      <SigninBox>
        <SigninImg src="/Signin.svg" />
        <SiginText>로그인</SiginText>
        <Input
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SigninButton onClick={onClickSignin}>로그인</SigninButton>
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

  @media (max-width: 480px) {
    padding: 30px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const SigninImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const SiginText = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #58595b;
  margin-top: 30px;
  margin-bottom: 20px;
  align-self: flex-start;

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 15px;
  }
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

  @media (max-width: 480px) {
    font-size: 16px;
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

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
