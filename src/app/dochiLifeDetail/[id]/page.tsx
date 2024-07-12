"use client";

import Header from "@/components/Header";
import { useRouter, useSearchParams } from "next/navigation";
import styled from "styled-components";

const DochiLifeDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "제목 없음";
  const image = searchParams.get("image") || "/loading.svg";
  const id = parseInt(searchParams.get("id") || "0", 10);

  const cardData = Array.from({ length: 25 }, (_, index) => ({
    id: index + 1,
    image: `/dochiLife/ex${index + 1}.png`,
    title: `도치의 일상 ${index + 1}`,
    date: `2023-07-${index + 1}`,
  }));

  const relatedCards = cardData.filter((card) => card.id !== id);

  console.log(id);
  console.log(relatedCards);

  const handleRelatedCardClick = (id: number, title: string, image: string) => {
    router.push(
      `/dochiLifeDetail/${id}?title=${encodeURIComponent(
        title
      )}&image=${encodeURIComponent(image)}`
    );
  };

  return (
    <DochiLifeDetailWrapper>
      <Header />
      <ContentWrapper>
        <Card>
          <CardImageWrapper>
            <DetailImage src={image} alt={title} />
          </CardImageWrapper>
          <CardContent>
            <TitleText>{title}</TitleText>
            <DescriptionText>
              넓은 의미로는 고슴도치아과(Erinaceinae)에 속한 포유류의 총칭이고,
              좁게는 국내 서식종인 고슴도치(Amur hedgehog, Erinaceus
              amurensis)를 가리킨다. 국내 서식종 기준으로 자연 서식지는 러시아
              아무르와 연해주, 중국 중앙부에서 동부(남부 해안가와 북부 제외),
              만주, 한반도 등지이다. 애완동물로 기르는 종은 한국 고슴도치가
              아니라 아프리카산의 네발가락고슴도치(Four-toed hedgehog, Atelerix
              albiventris)와 알제리고슴도치(Algerian hedgehog, A. algirus)의
              교배종이다.
            </DescriptionText>
          </CardContent>
        </Card>
        <RelatedCardsGrid>
          {relatedCards.map((card) => (
            <RelatedCard
              key={card.id}
              onClick={() =>
                handleRelatedCardClick(card.id, card.title, card.image)
              }
            >
              <RelatedCardImage src={card.image} alt={card.title} />
              <RelatedCardContent>
                <RelatedCardTitle>{card.title}</RelatedCardTitle>
                <RelatedCardDate>{card.date}</RelatedCardDate>
              </RelatedCardContent>
            </RelatedCard>
          ))}
        </RelatedCardsGrid>
      </ContentWrapper>
    </DochiLifeDetailWrapper>
  );
};

export default DochiLifeDetail;

const DochiLifeDetailWrapper = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1000px;
  background: #fff;
  border-radius: 60px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 40px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardImageWrapper = styled.div`
  width: 50%;
  height: auto;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardContent = styled.div`
  width: 50%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const TitleText = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #333;
  padding-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    font-size: 24px;
    padding-bottom: 10px;
  }
`;

const DescriptionText = styled.div`
  font-size: 18px;
  color: #555;
  line-height: 1.6;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const RelatedCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
`;

const RelatedCard = styled.div`
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

const RelatedCardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;

  ${RelatedCard}:hover & {
    transform: scale(1.1);
  }
`;

const RelatedCardContent = styled.div`
  padding: 20px;

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const RelatedCardTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  transition: color 0.3s;

  ${RelatedCard}:hover & {
    color: #d3a179;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const RelatedCardDate = styled.div`
  font-size: 14px;
  color: #777;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
