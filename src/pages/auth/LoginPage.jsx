import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { request } from "@/util/request/request";
import { setToken } from "@/store/tokenSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  async function onLogin(e) {
    e.preventDefault();
    console.log(data);
    const res = await request("login", "post", data);
    if (res) {
      dispatch(setUser(res?.user));
      dispatch(setToken(res?.token));
      console.log("Token : ", res?.token);
      navigate("/");
    }
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        // backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={onLogin} className="shadow-xl rounded-xl">
        <div className="w-[425px] p-5 flex flex-col gap-5">
          <h1 className="text-center my-4 font-bold">Login</h1>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Email</Label>
              <Input
                type={"email"}
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="email"
                name="email"
              />
            </div>
            <div className="grid gap-3">
              <Label>Password</Label>
              <Input
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                name="name"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button type="submit">Login</Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
