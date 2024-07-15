"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Dochi from "./Dochi";
import Obstacle from "./Obstacle";

const GameWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fff8dc;
`;

const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  background: #8b45136d;
`;

const GameOverText = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  font-weight: bold;
  color: brown;
`;

const LifeText = styled.div`
  position: absolute;
  top: 160px;
  right: 200px;
  font-size: 24px;
  color: #58595b;
  font-weight: bold;
`;

const ScoreText = styled.div`
  position: absolute;
  top: 120px;
  right: 200px;
  font-size: 24px;
  color: #58595b;
  font-weight: bold;
`;

const RestartButton = styled.div`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  padding: 10px 20px;
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a3d1c;
  }
`;

interface ObstacleType {
  id: number;
  left: number;
}

const Game: React.FC = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gameRef = useRef<HTMLDivElement>(null);
  const dochiRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  const handleJump = useCallback(
    (e: KeyboardEvent) => {
      if ((e.key === " " || e.key === "ArrowUp") && !isJumping) {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    },
    [isJumping]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleJump);
    return () => {
      window.removeEventListener("keydown", handleJump);
    };
  }, [handleJump]);

  useEffect(() => {
    const addObstacle = () => {
      setObstacles((prev) => [...prev, { id: Date.now(), left: 100 }]);
    };

    const interval = setInterval(addObstacle, 2000);
    return () => clearInterval(interval);
  }, []);

  const gameLoop = useCallback(() => {
    setObstacles((prevObstacles) =>
      prevObstacles.map((obstacle) => ({
        ...obstacle,
        left: obstacle.left - 1,
      }))
    );

    const checkCollision = () => {
      if (!dochiRef.current) return;
      const dochiRect = dochiRef.current.getBoundingClientRect();

      obstacles.forEach((obstacle) => {
        const obstacleElement = document.getElementById(
          `obstacle-${obstacle.id}`
        );
        if (obstacleElement) {
          const obstacleRect = obstacleElement.getBoundingClientRect();

          if (
            dochiRect.right > obstacleRect.left &&
            dochiRect.left < obstacleRect.right &&
            dochiRect.bottom > obstacleRect.top &&
            dochiRect.top < obstacleRect.bottom
          ) {
            setObstacles((prev) =>
              prev.filter((obs) => obs.id !== obstacle.id)
            );
            setLives((prevLives) => prevLives - 1);
          } else if (obstacle.left < -50) {
            setScore((prevScore) => prevScore + 1);
            setObstacles((prev) =>
              prev.filter((obs) => obs.id !== obstacle.id)
            );
          }
        }
      });
    };

    checkCollision();

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [obstacles]);

  useEffect(() => {
    if (!gameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [gameLoop, gameOver]);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      cancelAnimationFrame(requestRef.current);
    }
  }, [lives]);

  const handleRestart = () => {
    setLives(5);
    setScore(0);
    setObstacles([]);
    setGameOver(false);
  };

  return (
    <GameWrapper ref={gameRef}>
      <LifeText>Life: {lives}</LifeText>
      <ScoreText>Score: {score}</ScoreText>
      {gameOver && (
        <>
          <GameOverText>Game Over</GameOverText>
          <RestartButton onClick={handleRestart}>Restart</RestartButton>
        </>
      )}
      <Dochi ref={dochiRef} isJumping={isJumping} />
      {obstacles.map((obstacle) => (
        <Obstacle
          key={obstacle.id}
          id={`obstacle-${obstacle.id}`}
          left={obstacle.left}
        />
      ))}
      <Ground />
    </GameWrapper>
  );
};

export default Game;
