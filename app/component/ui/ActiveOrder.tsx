import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
type ActiveOrderProps = {
  orderID: string;
  name: string;
  delivaryType: string;
  status: string;
};

const ActiveOrder = ({ orderID, name, delivaryType,status }: ActiveOrderProps) => {
  return (
    <div className="border-b border-gray-300 px-4 pb-2">
      <div className=" flex justify-between items-center">
        <div>
          <p className=" font-bold">{orderID}</p>
          <div className=" flex">
             <p className=" text-xs">{name}</p>
            <p className=" text-xs">{delivaryType}</p>
          </div>
         
        </div>

      
<div className=" flex gap-2 items-center">
      <div className=" rounded-xl  px-2 bg-yellow-400 text-red-600 mt-2">
                <p>{status}</p>
            </div>


              <Link className=" mt-2" href={""}>
          <IoIosArrowForward />
        </Link>
</div>

     

      
      </div>
    </div>
  );
};

export default ActiveOrder;
