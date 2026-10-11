import { IoIosArrowForward } from "react-icons/io";
import Button from "./Button"

type IncomingOrdersProps ={

    orderID:string,
    name:string,
    delivaryType:string,
    ordertime: string,
    orders:string,
    totalPrice:string
}

const IncomingOrders = ({orderID,name, orders,delivaryType,ordertime,totalPrice}:IncomingOrdersProps) => {
  return (
    <div className="border-b border-gray-300 px-4 pb-2">
        <div className=" flex gap-3 items-center">
            <div>
                <p className=" font-bold">{orderID}</p>
                <p className=" text-xs">{ordertime}</p>
            </div>

            {/* name */}
            <div>
                <p className=" font-bold">{name}</p>
                <p className=" text-xs">{orders}</p>
            </div>
            {/* type */}
            <div className=" rounded-xl py-1 px-2 bg-yellow-400 text-red-600 mt-2">
                <p>{delivaryType}</p>
            </div>

            <p className=" mt-2">{totalPrice}</p>

            {/* button */}

           <Button text="Start preparing"
           className="  mt-2 bg-black text-white rounded-xl"
          icon={<IoIosArrowForward />}
          />
        </div>
    </div>
  )
}

export default IncomingOrders