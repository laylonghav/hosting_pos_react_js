import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  addPurchase,
  removePurchase,
  resetPurchase,
  updatePurchase,
} from "@/store/purchaseSlice";
import { request } from "@/util/request/request";
import { ClockFading, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PurchasePage() {
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState([]);
  const [purchaseAPI, setPurchaseAPI] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [paid, setPaid] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [paidDate, setPaidDate] = useState("");

  const purchase = useSelector((state) => state.purchase);
  const dispatch = useDispatch();

  const fetchingData = async () => {
    setLoading(true);
    const supplier = await request("supplier", "get");
    const product = await request("product", "get");
    const purchse = await request("purchase", "get");
    if (purchse?.data) {
      setPurchaseAPI(purchse?.data);
      console.log("Response Purchase : ", purchse?.data);
      setLoading(false);
    }
    if (product?.data) {
      setProduct(product?.data);
      console.log("Response Product : ", product?.data);
      setLoading(false);
    }
    if (supplier?.data) {
      setSupplier(supplier?.data);
      console.log("Response Supplier : ", supplier?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_head = [
    "Product",
    "Quantity",
    "Cost",
    "Retail Price",
    "Ref",
    "Remark",
    "Action",
  ];

  const onChangeInput = (index, field, value) => {
    dispatch(updatePurchase({ index, field, value }));
  };

  const onAddProduct = () => {
    dispatch(addPurchase());
  };

  const total = purchase
    ?.reduce((acc, item) => acc + item?.qty * item?.cost, 0)
    .toFixed(0);

  const onSavePurchase = async () => {
    // console.log("Saving purchase", purchase);

    const payload = {
      supplier_id: supplierId,
      paid: paid,
      shipping_cost: shippingCost,
      paid_date: paidDate,
      product_purchase: purchase,
    };
    console.log("Saving purchase", payload);

    try {
      const res = await request("purchase", "post", payload);
      if (res?.data) {
        console.log("Purchase Created : ", res?.data);
        setPaid("");
        setPaidDate("");
        setSupplierId("");
        setShippingCost("");
        dispatch(resetPurchase());
        fetchingData();
      }
    } catch ($error) {
      console.log($error);
    }
  };

  const onCancelPurchase = () => {
    setPaid("");
    setPaidDate("");
    setSupplierId("");
    setShippingCost("");
    dispatch(resetPurchase());
  };

  const tbl_header = [
    "No",
    "Supplier",
    "Paid",
    "Shipping cost",
    "Product Purchase",
    "Paid date",
  ];

  return (
    <div>
      <h1>Create purchase</h1>
      <div className="mt-6">
        <div className="flex gap-5">
          <div className="flex gap-4 flex-col w-full">
            <Label>Supplier</Label>
            <Select
              value={supplierId}
              onValueChange={(value) => setSupplierId(value)}
            >
              <SelectTrigger className={"w-full"}>
                <SelectValue placeholder="Pls select supplier" />
              </SelectTrigger>

              <SelectContent>
                {supplier?.map((item, index) => (
                  <SelectItem key={index} value={item?.id}>
                    {item?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 flex-col w-full">
            <Label>Paid</Label>
            <Input
              type={"number"}
              value={paid}
              onChange={(e) => setPaid(e.target.value)}
              placeholder="Paid"
            />
          </div>
          <div className="flex gap-4 flex-col w-full">
            <Label>Shipping cost</Label>
            <Input
              type={"number"}
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              placeholder="Shipping Cost"
            />
          </div>

          <div className="flex gap-4 flex-col w-full">
            <Label>Paid data</Label>
            <Input
              type={"date"}
              value={paidDate}
              onChange={(e) => setPaidDate(e.target.value)}
              placeholder="Paid date"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              {tbl_head?.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(purchase) &&
              purchase?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Select
                      value={item?.product_id}
                      onValueChange={(value) =>
                        onChangeInput(index, "product_id", value)
                      }
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Pls select product" />
                      </SelectTrigger>

                      <SelectContent>
                        {product?.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Input
                      type={"number"}
                      value={item?.qty}
                      placeholder="Quantity"
                      onChange={(e) =>
                        onChangeInput(index, "qty", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type={"number"}
                      value={item?.cost}
                      placeholder="Cost"
                      onChange={(e) =>
                        onChangeInput(index, "cost", Number(e.target.value))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type={"number"}
                      value={item?.retail_price}
                      placeholder="Retail price"
                      onChange={(e) =>
                        onChangeInput(
                          index,
                          "retail_price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item?.ref}
                      placeholder="Ref"
                      onChange={(e) =>
                        onChangeInput(index, "ref", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item?.remark}
                      placeholder="Remark"
                      onChange={(e) =>
                        onChangeInput(index, "remark", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"destructive"}
                      onClick={() => {
                        dispatch(removePurchase(index));
                      }}
                    >
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <div className="mt-7 flex justify-between">
          <Button onClick={onAddProduct}>Add product</Button>
          <div className="">
            <h1 className="font-black text-xl mb-5">Total : ${total}</h1>
            <div className="flex gap-5">
              <Button onClick={onCancelPurchase}>Cancel</Button>
              <Button onClick={onSavePurchase}>Save purchase</Button>
            </div>
          </div>
        </div>
      </div>
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={9}>
                  <div className="flex justify-center mt-5">
                    <Spinner className={"size-10"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {purchaseAPI.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.supplier?.name}</TableCell>
                    <TableCell>${item?.paid}</TableCell>
                    <TableCell>${item?.shipping_cost}</TableCell>
                    <TableCell>
                      {item?.product_purchase?.map((item, index1) => (
                        <div>
                          <span>{index1 + 1}. </span>
                          <span>{item?.product?.name}</span> |
                          <span> Quantity : </span>
                          <span>{item?.qty} </span>|<span> Cost : </span>
                          <span> ${item?.cost}</span> |
                          <span> Retail Price : </span>
                          <span> ${item?.retail_price}</span>
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{item?.paid_date}</TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
