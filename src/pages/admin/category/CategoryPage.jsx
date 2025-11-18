import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { formatDate } from "@/util/helper/format";
import { request } from "@/util/request/request";
import { Edit, PlusCircle, Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [category, setCategory] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    description: "",
    status: true,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [laoding, setLoading] = useState(false);
  const [dataDelete, setDataDelete] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const fetchingData = async () => {
    setLoading(true);
    const res = await request("category", "get");
    if (res) {
      console.log("Category Respone : ", res);
      setCategory(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const tbl_head = [
    "Id",
    "Name",
    "Status",
    "Description",
    "Created at",
    "Updated at",
    "Actions",
  ];

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data : ", form);
    if (isEdit) {
      const res = await request(`category/${form.id}`, "put", form);
      if (res) {
        console.log("Updeted Category : ", res);
        fetchingData();
      }
      setIsEdit(false);
    } else {
      const res = await request("category", "post", form);
      if (res) {
        console.log("Create Category : ", res);
        fetchingData();
      }
    }

    setIsOpen(false);
    setForm({
      id: "",
      name: "",
      description: "",
      status: true,
    });
  };

  async function onDelete() {
    const res = await request(`category/${dataDelete?.id}`, "delete");
    if (res) {
      console.log("Deleted Category : ", res);
      setIsOpenDelete(false);
      fetchingData();
    }
  }

  const onEdit = (itemEdit) => {
    console.log("Item Edit : ", itemEdit);
    setForm(itemEdit);
    setIsOpen(true);
    setIsEdit(true);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h1>Category </h1>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placehoder="Search category"
          />
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await request(`category/search/?q=${query}`, "get");
              if (res) {
                setLoading(false);
                console.log("Search Category : ", res);
                setCategory(res?.data);
              }
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
            }}
          >
            <SearchSlash />
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <PlusCircle />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEdit ? "Update Category" : "Create Category"}
              </DialogTitle>
            </DialogHeader>
            <form action="" onSubmit={onSubmit}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Description</Label>
                  <Input
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Description"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label>Name</Label>
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
              <div className="flex justify-end mt-5">
                <div className="flex gap-5 ">
                  <Button
                    onClick={() => {
                      setIsOpen(false);
                      setForm({
                        id: "",
                        name: "",
                        description: "",
                        status: true,
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
              Are you sure you want to delete this Category ?
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
              {tbl_head.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {laoding ? (
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="flex justify-center mt-5">
                    <Spinner className={"size-10"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {category?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell>
                      {item?.status ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell>{formatDate(item?.created_at)}</TableCell>
                    <TableCell>{formatDate(item?.updated_at)}</TableCell>
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
