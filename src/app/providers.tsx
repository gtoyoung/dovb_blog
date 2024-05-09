"use client";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { AuthProvider } from "services/authprovider";

export function Providers({ children }: { children: React.ReactNode }) {
  const { ToastContainer } = createStandaloneToast();
  return (
    <AuthProvider>
      <ChakraProvider>{children}</ChakraProvider>
      <ToastContainer />
    </AuthProvider>
  );
}
