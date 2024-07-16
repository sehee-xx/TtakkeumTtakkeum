// pages/index.js
"use client";
import { useEffect, useRef } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "@/components/Header";
import Head from "next/head";
import Hill from "@/components/Hill";
import DochiController from "@/components/DochiController";

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hillsRef = useRef<Hill[]>([]);
  const dochiControllerRef = useRef<DochiController | null>(null);
  let dots = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    hillsRef.current = [
      new Hill("#E5B080", 0.2, 12),
      new Hill("#D3A179", 0.5, 8),
      new Hill("#F7C997", 1.4, 6),
    ];

    dochiControllerRef.current = new DochiController();

    const resize = () => {
      canvas.width = window.innerWidth * 2;
      canvas.height = window.innerHeight * 2;
      ctx.scale(2, 2);

      hillsRef.current.forEach((hill) =>
        hill.resize(window.innerWidth, window.innerHeight)
      );

      if (dochiControllerRef.current) {
        dochiControllerRef.current.resize(
          window.innerWidth,
          window.innerHeight
        );
      }
    };

    const animate = (t: any) => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      dots = hillsRef.current.flatMap((hill) => hill.draw(ctx));
      if (dochiControllerRef.current) {
        dochiControllerRef.current.draw(ctx, t, dots);
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize, false);
    resize();
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </Head>
      <Header />
      <GlobalStyle />
      <HomeWrapper>
        <CanvasWrapper ref={canvasRef}></CanvasWrapper>
      </HomeWrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
  }

  body {
    overflow: hidden;
    background-color: #FFFAE0;
  }
`;

const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CanvasWrapper = styled.canvas`
  width: 100%;
  height: 100%;
`;
