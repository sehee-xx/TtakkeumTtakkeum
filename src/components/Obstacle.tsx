// Obstacle.tsx
import styled, { keyframes } from "styled-components";

const move = keyframes`
  0% { right: -50px; }
  100% { right: 100%; }
`;

const ObstacleWrapper = styled.div<{ left: number }>`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}%;
  width: 120px;
  height: 120px;
  margin-bottom: 80px;
  background: url("/obstacle.png") no-repeat center/contain;
  animation: ${move} 2s linear infinite;
`;

interface ObstacleProps {
  id: string;
  left: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ id, left }) => (
  <ObstacleWrapper id={id} left={left} />
);

export default Obstacle;
