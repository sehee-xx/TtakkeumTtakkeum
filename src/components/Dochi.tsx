import React, { forwardRef } from "react";
import styled, { keyframes, css } from "styled-components";

const jump = keyframes`
  0% { bottom: 0; }
  50% { bottom: 250px; }
  100% { bottom: 0; }
`;

const DochiWrapper = styled.div<{ isJumping: boolean }>`
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
`;

interface DochiProps {
  isJumping: boolean;
}

const Dochi = forwardRef<HTMLDivElement, DochiProps>(({ isJumping }, ref) => (
  <DochiWrapper ref={ref} isJumping={isJumping} />
));

Dochi.displayName = "Dochi";

export default Dochi;
