

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { config } from "@/util/configs/config";
import { request } from "@/util/request/request";
import { Edit, Image, Plus, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductAdminDetailPage() {
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    qty: "",
    brand_id: "",
    price: "",
    discount: "",
    status: true,
    category_id: "",
    image: null,
  });
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [query, setQuery] = useState("");
  const fetchingData = async () => {
    setLoading(true);
    const res = await request("product", "get");
    const category = await request("category", "get");
    if (category) {
      setCategory(category.data);
    }
    const brand = await request("brand", "get");
    if (brand) {
      setBrand(brand.data);
    }

    if (res) {
      console.log("Response Product : ", res?.data);
      setProduct(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_header = [
    "Id",
    "Name",
    "Description",
    "Category",
    "Brand",
    "Quantity",
    "Price",
    "Discount",
    "Status",
    "Image",
    "Actions",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", form);

    const formData = new FormData();
    formData.append("name", form?.name);
    formData.append("description", form?.description);
    formData.append("status", form?.status ? 1 : 0);
    formData.append("brand_id", form?.brand_id);
    formData.append("category_id", form?.category_id);
    formData.append("price", form?.price);
    formData.append("discount", form?.discount);
    formData.append("qty", form?.qty);

    if (form.image instanceof File) {
      formData.append("image", form?.image);
    }

    if (isEdit) {
      formData.append("_method", "put");
      const res = await request(`product/${form?.id}`, "post", formData);
      if (res) {
        console.log("Update Product : ", res);
        fetchingData();
      }
      setIsEdit(false);
    } else {
      const res = await request("product", "post", formData);
      if (res) {
        console.log("Create Product : ", res);
        fetchingData();
      }
    }

    setIsOpen(false);
    setForm({
      id: "",
      name: "",
      description: "",
      qty: "",
      brand_id: "",
      price: "",
      discount: "",
      status: true,
      category_id: "",
      image: null,
    });
  };

  const onEdit = (itemEdit) => {
    console.log("Item Edit : ", itemEdit);
    setForm(itemEdit);
    setIsOpen(true);
    setIsEdit(true);
  };

  async function onDelete() {
    const res = await request(`product/${dataDelete?.id}`, "delete");
    if (res) {
      console.log("Deleted Product : ", res);
      setIsOpenDelete(false);
      fetchingData();
    }
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h1>Product </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placehoder="Search product"
          />
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`product/search/?q=${query}`, "get");
              if (res) {
                setLoading(false);
                console.log("Search Product : ", res);
                setProduct(res?.data);
              }
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
              setQuery("");
            }}
          >
            <SearchSlash />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent
            onPointerDownOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Update product" : "Create product"}
              </DialogTitle>
              <DialogClose />
            </DialogHeader>
            <form action="" onSubmit={onSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Name</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Description</Label>
                    <Input
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Description"
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Price</Label>
                    <Input
                      type={"number"}
                      min={0}
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="Price"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Discount</Label>
                    <Input
                      type={"number"}
                      min={0}
                      value={form.discount}
                      onChange={(e) =>
                        setForm({ ...form, discount: e.target.value })
                      }
                      placeholder="Discount"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Category</Label>
                    <Select
                      value={String(form.category_id)}
                      onValueChange={(value) =>
                        setForm({ ...form, category_id: value })
                      }
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Pls select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {category.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Brand</Label>
                    <Select
                      value={String(form.brand_id)}
                      onValueChange={(value) =>
                        setForm({ ...form, brand_id: value })
                      }
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Pls select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brand.map((item, index) => (
                          <SelectItem key={index} value={item?.id}>
                            {item?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="flex flex-col gap-3 w-full">
                    <Label>Quantity</Label>
                    <Input
                      type={"number"}
                      min={1}
                      value={form.qty}
                      onChange={(e) =>
                        setForm({ ...form, qty: e.target.value })
                      }
                      placeholder="Quantity"
                    />
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <Label>Status</Label>
                    <Select
                      value={String(form.status)}
                      onValueChange={(value) =>
                        setForm({ ...form, status: value === "true" })
                      }
                    >
                      <SelectTrigger className={"w-full"}>
                        <SelectValue placeholder="Pls select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Image</Label>
                  <Input
                    type={"file"}
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                    placeholder="Input image"
                  />

                  {form?.image && (
                    <div className="w-28 h-28 ">
                      <img
                        className="w-[100%] h-[100%] bg-gray-200 rounded-xl p-3"
                        src={
                          form?.image instanceof File
                            ? URL.createObjectURL(form.image)
                            : config.image_url + form?.image
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <div className="flex gap-5 ">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setForm({
                        id: "",
                        name: "",
                        description: "",
                        qty: "",
                        brand_id: "",
                        price: "",
                        discount: "",
                        status: true,
                        category_id: "",
                        image: null,
                      });
                      setIsEdit(false);
                    }}
                    type="button"
                    variant={"outline"}
                  >
                    Close
                  </Button>
                  <Button type="submit">{isEdit ? "Update" : "Save"}</Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isOpenDelete} onOpenChange={setIsOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this product ?
            </DialogTitle>
            <div className="flex justify-end mt-7">
              <div className="flex gap-5">
                <Button
                  onClick={() => {
                    setIsOpenDelete(false);
                    setDataDelete(null);
                  }}
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button onClick={onDelete} variant={"destructive"}>
                  Delete
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

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
                {product.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.description}</TableCell>
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

                    <TableCell>
                      <div className="flex gap-4">
                        <Button onClick={() => onEdit(item)}>
                          <Edit />
                        </Button>
                        <Button
                          onClick={() => {
                            setIsOpenDelete(true);
                            setDataDelete(item);
                          }}
                          variant={"destructive"}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
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
