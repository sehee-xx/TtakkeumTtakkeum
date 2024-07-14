"use client";

import ClientLayout from "@/components/ClientLayout";
import Header from "@/components/Header";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";

export default function Home() {
  const router = useRouter();

  const onClickDochiLife = () => {
    router.push("/dochiLife");
  };

  const onClickBestDochi = () => {
    router.push("/bestDochi");
  };

  const onClickQnA = () => {
    router.push("/qna");
  };

  const [ref1, isVisible1] = useIntersectionObserver();
  const [ref2, isVisible2] = useIntersectionObserver();
  const [ref3, isVisible3] = useIntersectionObserver();

  return (
    <>
      <Header />
      <ClientLayout>
        <Section
          ref={ref1}
          style={{ background: "linear-gradient(135deg, #FFFAE0, #FFE4B5)" }}
          className={isVisible1 ? "visible" : ""}
        >
          <CardBig onClick={onClickDochiLife}>
            <ImageWrapper>
              <img src="/MainCard/MainCard1.svg" alt="Hedgehog 1" />
            </ImageWrapper>
            <CardText>
              <h2>내 고슴도치 자랑하기</h2>
              <p>당신의 고슴도치를 자랑해보세요! 사진과 이야기를 공유하세요!</p>
            </CardText>
          </CardBig>
          <CardSmall>
            <SmallCard src="/SubCard/SubCard1.png" alt="SubCard1" />
            <SmallCard src="/SubCard/SubCard2.png" alt="SubCard2" />
            <SmallCard src="/SubCard/SubCard3.png" alt="SubCard3" />
            <SmallCard src="/SubCard/SubCard4.png" alt="SubCard4" />
          </CardSmall>
        </Section>
        <Section
          ref={ref2}
          style={{ background: "linear-gradient(135deg,#D3D3D3, #F9F9F9)" }}
          className={isVisible2 ? "visible" : ""}
        >
          <CardSmall>
            <SmallCard src="/SubCard/SubCard5.png" alt="SubCard5" />
            <SmallCard src="/SubCard/SubCard6.png" alt="SubCard6" />
            <SmallCard src="/SubCard/SubCard7.png" alt="SubCard7" />
            <SmallCard src="/SubCard/SubCard8.png" alt="SubCard8" />
          </CardSmall>
          <CardBig onClick={onClickBestDochi}>
            <ImageWrapper>
              <img src="/MainCard/MainCard2.svg" alt="Hedgehog 2" />
            </ImageWrapper>
            <CardText>
              <h2>금주의 고슴도치 보기</h2>
              <p>이번 주 최고의 고슴도치를 구경해보세요!</p>
            </CardText>
          </CardBig>
        </Section>
        <Section
          ref={ref3}
          style={{ background: "linear-gradient(135deg,#E0FFE5, #F6FDEB)" }}
          className={isVisible3 ? "visible" : ""}
        >
          <CardBig onClick={onClickQnA}>
            <ImageWrapper>
              <img src="/MainCard/MainCard4.svg" alt="Hedgehog 4" />
            </ImageWrapper>
            <CardText>
              <h2>정보 공유하기</h2>
              <p>고슴도치에 대한 질문과 답변을 통해 정보를 공유해보세요!</p>
            </CardText>
          </CardBig>
          <CardSmall>
            <SmallCard src="/SubCard/SubCard13.png" alt="SubCard13" />
            <SmallCard src="/SubCard/SubCard14.png" alt="SubCard14" />
            <SmallCard src="/SubCard/SubCard15.png" alt="SubCard15" />
            <SmallCard src="/SubCard/SubCard16.png" alt="SubCard16" />
          </CardSmall>
        </Section>
      </ClientLayout>
    </>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.section`
  scroll-snap-align: start;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeIn} 0.5s ease-out;
  }

  @media (max-width: 1200px) {
    height: fit-content;
    padding-bottom: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }

  @media (max-width: 480px) {
    padding-bottom: 20px;
  }
`;

const CardBig = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    padding: 20px 20px;
  }

  @media (max-width: 480px) {
    padding: 10px 10px;
  }
`;

const CardSmall = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 40px;
  margin-top: 20px;

  @media (max-width: 1200px) {
    grid-gap: 20px;
    margin-top: 40px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const SmallCard = styled.img`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-align: center;
  transform: rotate(${() => Math.random() * 10 - 5}deg);

  &:nth-child(even) {
    transform: rotate(${() => Math.random() * 10 - 5}deg) translateY(-10px);
  }

  &:nth-child(odd) {
    transform: rotate(${() => Math.random() * 10 - 5}deg) translateY(10px);
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
  }

  @media (max-width: 1200px) {
    img {
      width: 250px;
      height: 250px;
      object-fit: cover;
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 100px;
    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
    }
  }
`;

const CardText = styled.div`
  padding: 20px;

  h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #58595b;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  p {
    font-size: 16px;
    color: #58595b;
  }
`;
