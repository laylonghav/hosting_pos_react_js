import { Minus, Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { useDispatch } from "react-redux";
import { addToCart, clearItemCart, descrementCart } from "@/store/cartSlice";

export default function CartProduct({ product }) {
  const dispatch = useDispatch();
  return (
    <div>
      <Card className={"p-2 flex flex-row gap-2"}>
        <div className="w-20 h-20 rounded-2xl overflow-hidden">
          <img
            className="w-[100%] h-[100%]"
            src={product?.image_url}
            alt={`pic ${product?.name}`}
          />
        </div>
        <div className="space-y-1 flex-1">
          <div className="font-bold flex gap-3">
            <div>{product?.name}</div>
            <Badge variant={product?.status ? "default" : "socendary"}>
              {product?.status ? "Active" : "InActive"}
            </Badge>
          </div>
          <div className="flex gap-1">
            <p>Qty : </p>
            <span>{product?.qty}</span> |
            <span>${Number(product?.price) * Number(product?.qty)}</span> |
            <span>{product?.discount}%</span>
          </div>
          <div className="flex gap-4">
            <button
              className=" bg-gray-300  transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black rounded-2xl"
              onClick={() => {
                dispatch(descrementCart(product));
              }}
            >
              <Minus />
            </button>
            <button
              className=" bg-gray-300  transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black rounded-2xl"
              onClick={() => {
                dispatch(addToCart(product));
              }}
            >
              <Plus />
            </button>
          </div>
        </div>
        <div className="">
          <button
            className="flex bg-gray-300  transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black rounded-2xl"
            onClick={() => {
              dispatch(clearItemCart(product));
            }}
          >
            <X />
          </button>
        </div>
      </Card>
    </div>
  );
}
