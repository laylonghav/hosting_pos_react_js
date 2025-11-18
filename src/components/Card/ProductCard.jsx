import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

export default function ProdcutCard({ product }) {
  return (
    <div>
      <Card className={""}>
        <CardContent className={"space-y-2"}>
          <div className="w-[100%] h-100 rounded-2xl overflow-hidden">
            <img
              className="w-[100%] h-[100%]"
              src={product?.image_url}
              alt={`pic ${product?.name}`}
            />
          </div>
          <div className="font-bold">
            <CardTitle>{product?.name}</CardTitle>
          </div>
          <CardDescription>{product?.description}</CardDescription>
          <div className="text-muted-foreground">
            <div className="">
              <span>
                <strong>Brand : </strong> {product?.brand?.name}
              </span>
            </div>
            <div className="">
              <span>
                <strong>Category : </strong> {product?.category?.name}
              </span>
            </div>
            <div className="">
              <span>
                <strong>Price : $</strong> {product?.price}
              </span>
            </div>
            <div className="">
              <span>
                <strong>Discount : </strong> {product?.discount}%
              </span>
            </div>
            <div className="">
              <span>
                <strong>Quantity : </strong> {product?.qty}
              </span>
            </div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className={"flex  justify-between"}>
          <Button variant={"outline"} className={"cursor-pointer"}>
            Detail
          </Button>
          <Button
            onClick={() => product.btnAddToCart?.(product)}
            className={"cursor-pointer"}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
