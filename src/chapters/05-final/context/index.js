import React from "react";
import { AuthProvider } from "./auth-context";
import { EmailProvider } from "./email-context";

export default function AppProviders({ children, isAuthenticated, emails }) {
  return (
    <AuthProvider isAuthenticated={isAuthenticated}>
      <EmailProvider emails={emails}>{children}</EmailProvider>
    </AuthProvider>
  );
}
