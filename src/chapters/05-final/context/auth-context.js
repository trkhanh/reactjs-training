import React from "react";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    props.isAuthenticated || false
  );

  const login = React.useCallback(() => {
    setIsAuthenticated(true);
  }, [setIsAuthenticated]);

  const logout = React.useCallback(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  const value = React.useMemo(() => {
    return {
      isAuthenticated,
      login,
      logout
    };
  }, [isAuthenticated, login, logout]);

  return <AuthContext.Provider value={value} {...props} />;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
