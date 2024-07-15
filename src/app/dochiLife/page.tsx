"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface CardData {
  id: number;
  image: string;
  title: string;
  date: string;
}

const DochiLife = () => {
  const router = useRouter();
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const handleCardClick = (id: number, title: string, image: string) => {
    router.push(
      `/dochiLifeDetail/${id}?title=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(image)}`
    );
  };

  const fetchCardData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_HOSTNAME}/articles`,
        {
          headers: {
            "Content-Type": `application/json`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      console.log("resData", response);
      if (Array.isArray(response.data)) {
        setCardData(response.data);
      } else {
        console.error("Unexpected response data format:", response.data);
        setCardData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("카드 데이터를 불러오지 못했습니다.", error);
      setError("카드 데이터를 불러오지 못했습니다.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleWriteClick = () => {
    router.push("/dochiLifeWrite");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  console.log(cardData);

  return (
    <DochiLifeWrapper>
      <Header />
      <TitleText>[ 도치의 일상 ]</TitleText>
      <WriteButton onClick={handleWriteClick}>작성하기</WriteButton>
      <CardGrid>
        {Array.isArray(cardData) && cardData.length > 0 ? (
          cardData.map((card) => (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card.id, card.title, card.image)}
            >
              <CardImageWrapper>
                <CardImage src={card.image} alt={card.title} />
                <CardOverlay />
              </CardImageWrapper>
              <CardContent>
                <CardTitle>{card.title}</CardTitle>
                <CardDate>{card.date}</CardDate>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No cards available</p>
        )}
      </CardGrid>
    </DochiLifeWrapper>
  );
};

export default DochiLife;

const DochiLifeWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 100px 200px;
  position: relative;

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

const TitleText = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: #333;
  padding-bottom: 40px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 16px;
    padding-bottom: 20px;
  }
`;

const WriteButton = styled.div`
  position: absolute;
  top: 100px;
  right: 200px;
  width: 100px;
  height: 40px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  background-color: #e5b080;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #d3a179;
  }

  @media (max-width: 1200px) {
    top: 100px;
    right: 100px;
  }

  @media (max-width: 768px) {
    top: 95px;
    right: 50px;
  }

  @media (max-width: 480px) {
    top: 85px;
    right: 20px;
    font-size: 12px;
    width: 80px;
    height: 30px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 75%;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5));
  opacity: 0;
  transition: opacity 0.3s;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 20px;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const CardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #58595b;
  margin-bottom: 10px;
  transition: color 0.3s;

  ${Card}:hover & {
    color: #d3a179;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const CardDate = styled.div`
  font-size: 14px;
  color: #777;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
