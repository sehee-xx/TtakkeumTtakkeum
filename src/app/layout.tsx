"use client";

import { useEffect, useState } from "react";
import GlobalStyle from "../../styles/GlobalStyles";
import Loading from "@/components/Loading";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleComplete);
    }

    return () => {
      window.removeEventListener("load", handleComplete);
    };
  }, []);

  return (
    <html lang="en">
      <GlobalStyle />
      <body>{loading ? <Loading /> : children}</body>
    </html>
  );
}
