import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuthState } from "./store";
import Layout from "./layout";
import Login from "./pages/login/Login";

function App() {
  const { authUser } = useAuthState();

  if (!authUser) {
    return (
      <Layout>
        <Login />
      </Layout>
    );
  }

  return <div></div>;
}

export default App;
