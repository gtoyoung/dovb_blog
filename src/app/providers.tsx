"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "services/authprovider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </AuthProvider>
  );
}
