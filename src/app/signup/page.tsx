"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState(""); // 닉네임
  const [dochiname, setDochiname] = useState(""); // 고슴도치 이름
  const [email, setEmail] = useState(""); // 이메일
  const [password, setPassword] = useState(""); // 비밀번호
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
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

  const onClickSignup = async () => {
    if (password !== confirmPassword) {
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "error",
          title: "비밀번호 오류",
          text: "비밀번호를 다시 확인해주세요!",
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
          title: "비밀번호 오류",
          text: "비밀번호를 다시 확인해주세요!",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/users`,
        {
          nickname,
          dochiname,
          email,
          password,
        }
      );
      console.log(response.data);
      localStorage.setItem("nickname", JSON.stringify("고슴도치"));
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "success",
          title: "회원가입 성공",
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
          title: "회원가입 성공",
          confirmButtonText: "확인",
          confirmButtonColor: "#d3a179",
          customClass: {
            popup: "swal-custom-popup",
            title: "swal-custom-title",
            htmlContainer: "swal-custom-html-container",
          },
        });
      }
      router.push("/signin");
    } catch (error) {
      console.error("회원가입 실패", error);
      if (window.innerWidth <= 768) {
        MySwal.fire({
          icon: "error",
          title: "회원가입 실패",
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
          title: "회원가입 실패",
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
    <SignupWrapper>
      <Header />
      <SignupBox>
        <SignupImg src="/Signup.svg" />
        <SignupText>회원가입</SignupText>
        <Input
          placeholder="닉네임을 입력해주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          placeholder="고슴도치의 이름을 입력해주세요"
          value={dochiname}
          onChange={(e) => setDochiname(e.target.value)}
        />
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
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <SignupButton onClick={onClickSignup}>회원가입</SignupButton>
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

  @media (max-width: 480px) {
    padding: 30px;
  }
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

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const SignupImg = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const SignupText = styled.div`
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

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;
