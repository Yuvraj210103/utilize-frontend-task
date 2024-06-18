import { Button } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";
import { IoArrowBackCircle } from "react-icons/io5";
import InputWithTopHeader from "../../components/common/inputs/InputWithTopHeader";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputSelect from "../../components/common/inputs/InputSelect";
import { useEffect, useState } from "react";
import ordersData from "../../constant/orders.json";
import { showSnackbar } from "../../utilities/TsxUtils";
import { IOrder } from "../../@types/database";

export const orderCreateSchema = z.object({
  id: z.string().optional(),
  customer_name: z.string().min(3),
  customer_email: z
    .string()
    .min(3, { message: "Valid email is required" })
    .regex(/^(^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$)?$/),
  product: z.enum(["Product 1", "Product 2", "product 3"]),
  quantity: z.coerce.number(),
  order_value: z.coerce.number(),
});

export type OrderCreateFormFields = z.infer<typeof orderCreateSchema>;

interface OrderAddOrEditProps {
  orders: IOrder[];
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

const OrderAddOrEdit = ({ orders, setOrders }: OrderAddOrEditProps) => {
  const [searchParam] = useSearchParams();

  const orderId = searchParam.get("id");

  const navigate = useNavigate();

  const [product, setProduct] = useState<
    "Product 1" | "Product 2" | "product 3"
  >("Product 1");

  const order = orderId ? orders.find((order) => order.id === orderId) : null;

  useEffect(() => {
    if (order) {
      setProduct(order.product as typeof product);
    }
  }, [order]);

  const methods = useForm<OrderCreateFormFields>({
    resolver: zodResolver(orderCreateSchema),
    defaultValues: order
      ? {
          customer_email: order.customer_email,
          customer_name: order.customer_name,
          id: order.id,
          order_value: order.order_value,
          product: order.product as typeof product,
          quantity: order.quantity,
        }
      : undefined,
  });

  useEffect(() => {
    methods.setValue("product", product);
  }, [product]);

  const quantity = methods.watch("quantity");

  useEffect(() => {
    if (!quantity) return;
    if (product === "Product 1") {
      methods.setValue("order_value", 29 * quantity);
      return;
    }
    if (product === "Product 2") {
      methods.setValue("order_value", 49 * quantity);
      return;
    }
    methods.setValue("order_value", 149 * quantity);
  }, [quantity, product]);

  const onSubmit = async (data: OrderCreateFormFields) => {
    console.log(data);
    if (orderId) {
      const updatedOrders = orders.map((o) => (o.id === orderId ? data : o));
      setOrders(updatedOrders as typeof orders);
    } else {
      const newOrder = { ...data, id: (orders.length + 1).toString() };
      setOrders([...orders, newOrder as IOrder]);
    }

    showSnackbar({ message: "Order created successfully", type: "success" });

    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex justify-between w-full p-4 rounded bg-surface shadow-md  items-center ">
            <div
              onClick={() => navigate(-1)}
              className="flex items-center gap-4 cursor-pointer "
            >
              <div className="cursor-pointer">
                <IoArrowBackCircle className="h-6 w-6" />
              </div>
              <div className="font-semibold text-lg">
                {orderId ? "Edit Order" : "Create Order"}
              </div>
            </div>
            <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-surface shadow-md rounded">
            <InputWithTopHeader
              label="Customer Name"
              className="mx-0"
              register={methods.register}
              name="customer_name"
              error={methods.formState.errors.customer_name?.message}
            />
            <InputWithTopHeader
              label="Customer Email"
              className="mx-0"
              register={methods.register}
              name="customer_email"
              error={methods.formState.errors.customer_email?.message}
            />

            <InputSelect
              label="Product"
              data={[
                { label: "Product 1", value: "Product 1" },
                { label: "Product 2", value: "Product 2" },
                { label: "Product 3", value: "Product 3" },
              ]}
              value={product}
              onChange={(e) => setProduct(e as typeof product)}
            />

            <InputWithTopHeader
              label="Quantity"
              className="mx-0"
              register={methods.register}
              name="quantity"
              error={methods.formState.errors.quantity?.message}
              decimalCount={2}
            />
            <InputWithTopHeader
              label="Order Value"
              className="mx-0"
              register={methods.register}
              name="order_value"
              error={methods.formState.errors.order_value?.message}
              disabled
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default OrderAddOrEdit;
