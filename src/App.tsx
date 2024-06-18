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
import ordersData from "./constant/orders.json";
import { IOrder } from "./@types/database";
import { useEffect, useState } from "react";

function App() {
  const { authUser } = useAuthState();

  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData as IOrder[]);
    }
  }, [ordersData]);

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
            <Route
              path={PageRoutes.HOME}
              element={<Home orders={orders} setOrders={setOrders} />}
            />
            <Route
              path={PageRoutes.ORDER_CREATE_OR_EDIT}
              element={<OrderAddOrEdit orders={orders} setOrders={setOrders} />}
            />
          </Routes>
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
