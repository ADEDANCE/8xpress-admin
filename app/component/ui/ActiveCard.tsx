import Button from "./Button";

type ActiveCardProps = {
  orderID: string;
  orderTime: string;
  name: string;
  orders: string[];
  deliveryType: "Delivery" | "Pickup";
  deliveryAddress?: string;
  price: String;
};

const ActiveCard = ({
  orderID,
  orderTime,
  name,
  orders,
  deliveryType,
  deliveryAddress,
  price,
}: ActiveCardProps) => {
  return (
    <div className=" bg-white py-2 px-2 border  mt-4 border-gray-100 rounded-2xl">
      <div className=" flex justify-between">
        <p>{orderID}</p>
        <p className=" text-red-500">{orderTime}</p>
      </div>

      <h2 className=" font-semibold">{name}</h2>

      <div className="border-b border-dotted text-gray-400 flex ">
        {orders.map((order, index) => (
          <p key={index}>{order}</p>
        ))}
      </div>

      <div className=" flex justify-between">
        {/* delivery or pick up */}
        <p className=" text-amber-400 font-semibold">{deliveryType}</p>

        {/* price */}
        <p className=" text-green-500 font-semibold">{price}</p>
      </div>
      {deliveryType === "Delivery" && <p>Deliver to: {deliveryAddress}</p>}
      <Button
        text="Complete order"
        className="bg-black text-white mx-auto w-full mt-3"
      />
    </div>
  );
};

export default ActiveCard;
