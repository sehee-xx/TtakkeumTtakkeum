// WalkingDochi.tsx
import React from "react";
import styled, { keyframes } from "styled-components";

const walk = keyframes`
  0% { left: -150px; }
  100% { left: 100%; }
`;

const DochiWrapper = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100px;
  height: 100px;
  background: url("/gamestart.svg") no-repeat center/contain;
  animation: ${walk} 10s linear infinite;
  cursor: pointer;
  z-index: 1000;
`;

interface WalkingDochiProps {
  onClick: () => void;
}

const WalkingDochi: React.FC<WalkingDochiProps> = ({ onClick }) => {
  return <DochiWrapper onClick={onClick} />;
};

export default WalkingDochi;
