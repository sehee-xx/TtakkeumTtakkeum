// WalkingDochi.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const DochiWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  right: 10px;
  width: 140px;
  height: 140px;
  background: url("/gamestart.png") no-repeat center/contain;
  cursor: pointer;
  z-index: 1000;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

interface WalkingDochiProps {
  onClick: () => void;
}

const WalkingDochi: React.FC<WalkingDochiProps> = ({ onClick }) => {
  return <DochiWrapper onClick={onClick} />;
};

export default WalkingDochi;
