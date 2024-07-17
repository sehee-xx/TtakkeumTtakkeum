import React, { forwardRef } from "react";
import styled, { keyframes, css } from "styled-components";

const jump = keyframes`
  0% { bottom: 0; }
  50% { bottom: 250px; }
  100% { bottom: 0; }
`;

const doubleJump = keyframes`
  0% { bottom: 250px; transform: rotate(0deg); }
  100% { bottom: 350px; transform: rotate(360deg); }
`;

const DochiWrapper = styled.div<{
  isJumping: boolean;
  isDoubleJumping: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: 200px;
  width: 150px;
  height: 150px;
  margin-bottom: 90px;
  background: url("/dochi.svg") no-repeat center/contain;
  ${({ isJumping }) =>
    isJumping &&
    css`
      animation: ${jump} 0.5s;
    `}
  ${({ isDoubleJumping }) =>
    isDoubleJumping &&
    css`
      animation: ${doubleJump} 0.75s;
    `}
`;

interface DochiProps {
  isJumping: boolean;
  isDoubleJumping: boolean;
}

const GameDochi = forwardRef<HTMLDivElement, DochiProps>(
  ({ isJumping, isDoubleJumping }, ref) => (
    <DochiWrapper
      ref={ref}
      isJumping={isJumping}
      isDoubleJumping={isDoubleJumping}
    />
  )
);

GameDochi.displayName = "Dochi";

export default GameDochi;
