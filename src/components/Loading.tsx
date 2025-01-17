import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingWrapper>
      <LoadingImg src="/loading.svg" />
      Loading...
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
`;

const LoadingImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  padding-bottom: 30px;
`;
