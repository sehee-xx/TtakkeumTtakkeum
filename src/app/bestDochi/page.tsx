"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/Header";
import axios from "axios";

interface BestCard {
  id: number;
  dochiArticleImage: string;
  dochiname: string;
  totalLikes: number;
}

const BestDochi = () => {
  const [liked, setLiked] = useState(Array(10).fill(false));
  const [bestCard, setBestCard] = useState<BestCard[]>([]);

  const fetchBestDochi = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles/dochi-of-the-week`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // bestCard 데이터를 적절히 변환하여 id 속성을 추가
      const transformedData = response.data.map((item: any, index: number) => ({
        id: item.id || index, // id가 없으면 index를 사용
        dochiArticleImage: item.dochiArticleImage,
        dochiname: item.dochiname,
        totalLikes: item.totalLikes,
      }));
      setBestCard(transformedData);
    } catch (error) {
      console.error("금주의 도치 로드 실패", error);
    }
  };

  useEffect(() => {
    fetchBestDochi();
  }, []);

  const handleLikeClick = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  return (
    <BestDochiWrapper>
      <Header />
      <Title>[ 금주의 도치 보기 ]</Title>
      <DochiGrid>
        {bestCard.map((dochi, index) => (
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
            <DochiImageWrapper>
              <DochiImage
                src={dochi.dochiArticleImage}
                alt={dochi.dochiArticleImage}
              />
              {/* <LikeButton
                liked={liked[index]}
                onClick={() => handleLikeClick(index)}
              >
                {liked[index] ? "❤️" : "♡"}
              </LikeButton> */}
            </DochiImageWrapper>
            <DochiInfo>
              <DochiName>{dochi.dochiname}</DochiName>
              <DochiPoints>{dochi.totalLikes} 좋아요</DochiPoints>
            </DochiInfo>
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

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #58595b;
  padding-bottom: 30px;

  @media (max-width: 480px) {
    font-size: 20px;
    padding-bottom: 20px;
  }
`;

const DochiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const DochiCard = styled.div`
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const Medal = styled.div`
  font-size: 60px;
  font-weight: 800;
  margin-top: 20px;

  @media (max-width: 480px) {
    font-size: 45px;
  }
`;

const DochiImageWrapper = styled.div`
  position: relative;
  width: 85%;
  padding-top: 90%;
  overflow: hidden;
  border-radius: 20px;

  @media (max-width: 480px) {
  }
`;

const DochiImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
`;

const DochiInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const DochiName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const DochiPoints = styled.div`
  font-size: 16px;
  color: #777;
  padding-top: 15px;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

interface LikeButtonProps {
  liked: boolean;
}

const LikeButton = styled.div<LikeButtonProps>`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  color: ${(props) => (props.liked ? "red" : "white")};
  cursor: pointer;
  transition: color 0.3s;
`;
