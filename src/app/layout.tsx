"use client";

import type { Metadata } from "next";
import GlobalStyle from "../../styles/GlobalStyles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStyle />
      <body>{children}</body>
    </html>
  );
}
