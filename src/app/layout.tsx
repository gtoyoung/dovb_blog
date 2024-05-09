import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WithSubnavigation from "components/layout/header";
import { ColorModeScript, Container } from "@chakra-ui/react";
import theme from "components/config/theme";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dovb`s Blog",
  description: "Dovb의 블로그에 오실걸 환영합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <WithSubnavigation />
          <Container maxW={"max-content"}>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
