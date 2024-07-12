// src/components/ClientLayout.tsx
"use client";

import styled from "styled-components";
import GlobalStyle from "../../styles/GlobalStyles";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalStyle />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  padding-top: 40px;

  @media (max-width: 480px) {
    padding-top: 70px;
  }
`;
