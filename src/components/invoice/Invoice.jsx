import { forwardRef } from "react";
import logo from "../../assets/logo/logo.png";
import { useSelector } from "react-redux";
import { config } from "@/util/configs/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Image } from "lucide-react";

const Invocice = forwardRef((prop, ref) => {
  const cart = useSelector((state) => state.cart);

  const item = cart.reduce((acc, item) => acc + Number(item.qty), 0);
  const originalPrice = cart
    .reduce((acc, item) => acc + Number(item?.price) * Number(item?.qty), 0)
    .toFixed(2);

  const discountPrice = cart
    .reduce(
      (acc, item) =>
        acc +
        ((Number(item?.discount) * Number(item?.price)) / 100) *
          Number(item?.qty),
      0
    )
    .toFixed(2);
  const total = originalPrice - discountPrice;

  const tbl_header = [
    "Id",
    "Name",
    "Category",
    "Brand",
    "Quantity",
    "Price",
    "Discount",
    "Status",
    "Image",
  ];
  return (
    <div className="px-10 py-5" ref={ref}>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p>#inv-{Date.now()}</p>
          <p>Date : {new Date().toLocaleDateString()}</p>
        </div>

        <div className="">
          <div className="w-[200px] h-[200px]">
            <img className="rounded-full" src={logo} alt="" />
          </div>
        </div>
      </div>

      <div className="">
        <div className="mt-7">
          <Table>
            <TableHeader>
              <TableRow>
                {tbl_header.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item?.name}</TableCell>
                  {/* <TableCell>{item?.description}</TableCell> */}
                  <TableCell>{item?.category?.name}</TableCell>
                  <TableCell>{item?.brand?.name}</TableCell>
                  <TableCell>{item?.qty}</TableCell>
                  <TableCell>${item?.price}</TableCell>
                  <TableCell>{item?.discount}%</TableCell>
                  <TableCell>
                    <Badge variant={item?.status ? "default" : "socendory"}>
                      {item?.status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item?.image ? (
                      <div className="w-28 h-28 ">
                        <img
                          className="w-[100%] h-[100%] bg-gray-200 rounded-xl p-3"
                          src={config.image_url + item?.image}
                          alt={`pic ${item?.name}`}
                        />
                      </div>
                    ) : (
                      <div className="w-28 h-28 ">
                        <div className="w-[100%] h-[100%] bg-gray-200 rounded-xl p-3 flex items-center justify-center">
                          <Image />
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="mt-5 px-2 space-y-2 w-60">
          <div className="flex justify-between border-b">
            <span>Item</span>
            <span>{item}</span>
          </div>
          <div className="flex justify-between border-b">
            <span>Origanal</span>
            <span>${originalPrice}</span>
          </div>
          <div className="flex justify-between border-b">
            <span>Discount price</span>
            <span>${discountPrice}</span>
          </div>
          <div className="flex justify-between border-b">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Invocice;
