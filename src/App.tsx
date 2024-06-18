import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useAuthState } from "./store";
import Layout from "./layout";
import Login from "./pages/login/Login";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import LoaderModal from "./components/common/modals/LoaderModal";
import { ContextConfirmModal } from "./components/common/modals/ContextConfirmModal";
import { ToastContainer } from "react-toastify";
import { PageRoutes } from "./@types/enum";
import Home from "./pages/home/Home";
import useAuthStateChange from "./hooks/useAuthStateChange";
import OrderAddOrEdit from "./pages/order/OrderAddOrEdit";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const { authUser } = useAuthState();

  useAuthStateChange();

  if (!authUser) {
    return (
      <MantineProvider withGlobalClasses withCssVariables withStaticClasses>
        <ModalsProvider
          modals={{ loader: LoaderModal, confirmModal: ContextConfirmModal }}
        >
          <Login />
        </ModalsProvider>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider withGlobalClasses withCssVariables withStaticClasses>
      <ModalsProvider
        modals={{ loader: LoaderModal, confirmModal: ContextConfirmModal }}
      >
        <Layout>
          <ToastContainer />
          <Routes>
            <Route path={PageRoutes.HOME} Component={Home} />
            <Route
              path={PageRoutes.ORDER_CREATE_OR_EDIT}
              Component={OrderAddOrEdit}
            />
          </Routes>
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
