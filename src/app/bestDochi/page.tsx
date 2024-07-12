"use client";

import { useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";

const BestDochi = () => {
  const top10Dochi = [
    {
      id: 1,
      name: "고슴도치 1",
      image: "/dochiLife/ex1.png",
      points: 120,
    },
    {
      id: 2,
      name: "고슴도치 2",
      image: "/dochiLife/ex2.png",
      points: 110,
    },
    {
      id: 3,
      name: "고슴도치 3",
      image: "/dochiLife/ex3.png",
      points: 105,
    },
    // 나머지 고슴도치 데이터 추가
  ];

  return (
    <BestDochiWrapper>
      <Header />
      <Title>금주의 도치 구경하기</Title>
      <DochiGrid>
        {top10Dochi.map((dochi, index) => (
          <DochiCard key={dochi.id}>
            <Medal>
              {index === 0
                ? "🥇"
                : index === 1
                ? "🥈"
                : index === 2
                ? "🥉"
                : `#${index + 1}`}
            </Medal>
            <DochiInfo>
              <DochiName>{dochi.name}</DochiName>
              <DochiPoints>{dochi.points} 포인트</DochiPoints>
            </DochiInfo>
            <DochiImage src={dochi.image} alt={dochi.name} />
          </DochiCard>
        ))}
      </DochiGrid>
    </BestDochiWrapper>
  );
};

export default BestDochi;

const BestDochiWrapper = styled.div`
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
`;

const DochiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const DochiCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Medal = styled.div`
  font-size: 80px;
  font-weight: 800;
  margin-right: 20px;
`;

const DochiInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DochiName = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const DochiPoints = styled.div`
  font-size: 18px;
  color: #777;
`;

const DochiImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-left: 20px;
  border-radius: 10px;
`;
