import styled from "styled-components";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <LogoText>따끔따끔</LogoText>
        <HeaderMenu>
          <MenuText>도치의 삶</MenuText>
          <MenuText>자료실</MenuText>
          <MenuText>입양</MenuText>
          <MenuText>Q&A</MenuText>
        </HeaderMenu>
      </HeaderLeft>
      <ShowGeumchi>명예 금치 구경하기</ShowGeumchi>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 200px;
  background-color: #ffffff;
  z-index: 1000;

  @media (max-width: 1200px) {
    padding: 20px 100px;
  }

  @media (max-width: 768px) {
    padding: 20px 50px;
  }

  @media (max-width: 480px) {
    padding: 20px 20px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const LogoText = styled.label`
  font-size: 30px;
  font-weight: 800;
  color: #d3a179;
  cursor: pointer;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const MenuText = styled.label`
  font-size: 18px;
  font-weight: 700;
  color: #58595b;
  cursor: pointer;

  &:hover {
    color: #d3a179;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const ShowGeumchi = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #58595b;
  cursor: pointer;
  width: fit-content;

  &:hover {
    color: #d3a179;
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
