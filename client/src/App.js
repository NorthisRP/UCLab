import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/Auth.Context";
import Header from "./Components/Header";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
    <Suspense fallback="loading">
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
        }}
      >
        <Router>
          <Header />
          {routes}
        </Router>
      </AuthContext.Provider>
    </Suspense>
  );
}

export default App;
