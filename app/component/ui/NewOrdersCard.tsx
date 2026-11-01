import Button from "./Button";

type NewOrdersCardProps = {
  orderID: string;
  orderTime: string;
  name: string;
  orders: string[];
  deliveryAddress: string;
  status?: string;
  buttonText?: string;
}

const NewOrdersCard = ({
  orderID,
  orderTime,
  name,
  orders,
  deliveryAddress,
}: NewOrdersCardProps) => {
  return (
    <div className="flex flex-row w-full rounded-lg overflow-hidden mt-4">
      <div className=" bg-amber-400 px-1"></div>
      <div className="bg-amber-100 flex flex-col justify-center items-center min-w-22.5 px-2">
        <h1>{/* number */}</h1>
        <p className=" text-xs">In QUEUE</p>
      </div>
      <div className=" bg-white py-4 px-4 w-full">
        <div className=" flex justify-between">
           <div className=" flex flex-row gap-2">
          <p> {orderID}</p>
          <p className=" text-red-500">{orderTime}</p>
        </div>

        <p className=" text-green-500 font-semibold">Pickup</p>
        </div>
       
        <h2 className=" font-semibold">{name}</h2>
       <div className="border-b border-dotted text-gray-400 flex gap-4">
  {orders.map((order, index) => (
    <p key={index}>{order}</p>
  ))}
</div>
        <div className=" flex justify-between mt-2 gap-4 ">
          
          <p>Deliver to: {deliveryAddress}</p>
          <Button text="Start Preparing" className=" bg-black text-white" />
        </div>
      </div>
    </div>
  );
};

export default NewOrdersCard;
