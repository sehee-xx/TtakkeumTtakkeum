// RootLayout.tsx
"use client";

import { useEffect, useState } from "react";
import GlobalStyle from "../../styles/GlobalStyles";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import WalkingDochi from "@/components/WalkingDochi";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

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

  const handleHedgehogClick = () => {
    router.push("/game");
  };

  return (
    <html lang="en">
      <GlobalStyle />
      <body>
        {loading ? (
          <Loading />
        ) : (
          <>
            {children}
            {pathname !== "/game" && (
              <WalkingDochi onClick={handleHedgehogClick} />
            )}
          </>
        )}
      </body>
    </html>
  );
}
