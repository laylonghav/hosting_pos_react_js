import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { addUser, deteleUser, updateUser } from "@/store/usersSlice";

import { Edit, Plus, Save, Search, Trash } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserAdminPage() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  //   const [data, setData] = useState([
  //     // {
  //     //   id: 1,
  //     //   username: "hav",
  //     //   password: "123",
  //     //   role: "Admin",
  //     // },
  //   ]);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    role: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(updateUser({ id: form.id, data: form }));
      setIsEdit(false);
    } else {
      //   const addData = { ...form, id: Date.now() };
      //   setData([...data, addData]);
      dispatch(addUser({ ...form, id: Date.now() }));
      console.log(form);
    }

    setIsOpen(false);
    setForm({
      id: "",
      username: "",
      password: "",
      role: "",
    });
  };
  const onEdit = (userEdit) => {
    setIsOpen(true);
    console.log(userEdit);
    setForm({
      id: userEdit.id,
      username: userEdit.username,
      password: userEdit.password,
      role: userEdit.role,
    });

    setIsEdit(true);
    // setForm({
    //   ...form,
    // });
  };
  const Delete = (userDelete) => {
    dispatch(deteleUser(userDelete.id));
    console.log(userDelete);
  };

  const dataFilter = users.filter(
    (user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>User Page</h1>
      <div className="flex justify-between mt-5">
        <div className="flex flex-row gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
          />
          <Button>
            <Search />
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure ? </DialogTitle>
              <DialogDescription>Good everythings</DialogDescription>
            </DialogHeader>

            <form action="" onSubmit={onSubmit}>
              <div className="grid gap-5">
                <div className="grid gap-3">
                  <Label>Username</Label>
                  <Input
                    value={form.username}
                    placeholder="Username"
                    onChange={(e) =>
                      setForm((pre) => ({ ...pre, username: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Password</Label>
                  <Input
                    value={form.password}
                    placeholder="Password"
                    onChange={(e) =>
                      setForm((pre) => ({ ...pre, password: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-3">
                  <Label>Role</Label>
                  <Input
                    value={form.role}
                    placeholder="Role"
                    onChange={(e) =>
                      setForm((pre) => ({ ...pre, role: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="flex mt-5 gap-4 justify-end">
                <Button type="submit">
                  <Save />
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(dataFilter) &&
              dataFilter.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className={"flex gap-2"}>
                    <Button onClick={() => onEdit(user)}>
                      <Edit />
                    </Button>
                    <Button onClick={() => Delete(user)}>
                      <Trash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
