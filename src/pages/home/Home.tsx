import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { Button, Pagination, TextInput } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { PageRoutes } from "../../@types/enum";
import { IOrder } from "../../@types/database";

interface HomeProps {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

const Home = ({ orders, setOrders }: HomeProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const ordersPerPage = 10;

  const filteredOrders = orders.filter((order) =>
    order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfFirstOrder + ordersPerPage
  );

  const totalOrderValue = filteredOrders.reduce(
    (total, order) => total + order.order_value,
    0
  );

  function handleDeleteOrder(orderId: string) {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  }

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>
      <div className="flex justify-between items-center mb-4 bg-surface p-4 rounded shadow">
        <TextInput
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => navigate(PageRoutes.ORDER_CREATE_OR_EDIT)}>
          Create New Order
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold">
          Total Order Value: ${totalOrderValue}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 bg-surface rounded shadow-md flex flex-col gap-1"
          >
            <h3 className="text-lg font-bold">{order.customer_name}</h3>
            <p>Email: {order.customer_email}</p>
            <p>Product: {order.product}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Order Value: ${order.order_value}</p>
            <div className="flex items-center justify-between gap-4 mt-2">
              <Button
                onClick={() =>
                  navigate(PageRoutes.ORDER_CREATE_OR_EDIT + `?id=${order.id}`)
                }
              >
                Edit Order
              </Button>
              <Button
                color="red"
                onClick={() => {
                  openContextModal({
                    modal: "confirmModal",
                    withCloseButton: false,
                    centered: true,
                    closeOnClickOutside: true,
                    innerProps: {
                      title: "Confirm",
                      body: "Are you sure to delete this order",
                      onConfirm: () => {
                        handleDeleteOrder(order.id);
                      },
                    },
                    size: "30%",
                    styles: {
                      body: { padding: "0px" },
                    },
                  });
                }}
              >
                Delete Order
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        onChange={setCurrentPage}
        total={Math.ceil(filteredOrders.length / ordersPerPage)}
      />
    </div>
  );
};

export default Home;
