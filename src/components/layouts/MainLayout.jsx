import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCent,
  Box,
  BoxIcon,
  FilePlus2,
  Group,
  Home,
  ListTree,
  Menu,
  Package,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  User2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../Card/CartProduct";
import logo from "../../assets/logo/user.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { request } from "@/util/request/request";
import { clearAllItem } from "@/store/cartSlice";
import { setRefresh } from "@/store/refreshSlice";
import { useReactToPrint } from "react-to-print";
import Invocice from "../invoice/Invoice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logout } from "@/store/userSlice";
import { resetToken } from "@/store/tokenSlice";

function Sidebar({ isOpen, setIsOpen, isOpenDesktop, setIsOpenDesktop }) {
  const nav_item = [
    {
      to: "/",
      label: "Home",
      icon: <Home />,
    },
    {
      to: "/pos",
      label: "POS",
      icon: <ShoppingCart />,
    },
    {
      to: "/product",
      label: "Product",
      icon: <Package />,
    },
    {
      to: "/user",
      label: "User",
      icon: <Users />,
    },
    {
      to: "/brand",
      label: "Brand",
      icon: <BadgeCent />,
    },
    {
      to: "/category",
      label: "Category",
      icon: <ListTree />,
    },
    {
      to: "/supplier",
      label: "Supplier",
      icon: <Truck />,
    },
    {
      to: "/purchase",
      label: "Purchase",
      icon: <FilePlus2 />,
    },
  ];
  return (
    <div>
      {/* Mobile screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-700 fixed left-0 h-full w-64 z-[60] shadow-4xl"
          >
            <div className=" py-4 px-5 flex justify-between items-center border-b border-b-gray-50">
              <h1 className="text-white">Admin</h1>
              <button
                className="p-1 text-white hover:bg-gray-300 hover:text-black rounded"
                onClick={() => setIsOpen(!isOpen)}
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-5 py-5 px-5">
              {nav_item.map((item, index) => (
                <NavLink
                  key={index}
                  className={({ isActive }) =>
                    `p-2 px-5  rounded-4xl flex gap-3 ${
                      isActive ? "bg-blue-600 text-white" : "bg-gray-300"
                    }`
                  }
                  to={item.to}
                >
                  {item.icon}
                  <div className="">{item.label}</div>
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop screen */}
      {isOpenDesktop && (
        <motion.aside
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-700 hidden md:block fixed left-0 h-full w-64 shadow-4xl"
        >
          <div className=" py-4 px-5 flex justify-between items-center border-b border-b-gray-50">
            <h1 className="text-white">Admin</h1>
            <button
              className="p-1 text-white hover:bg-gray-300 hover:text-black rounded"
              onClick={() => setIsOpenDesktop(false)}
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col gap-5 py-5 px-5">
            {nav_item.map((item, index) => (
              <NavLink
                key={index}
                className={({ isActive }) =>
                  `p-2 px-5  rounded-4xl flex gap-3 ${
                    isActive ? "bg-blue-600 text-white" : "bg-gray-300"
                  }`
                }
                to={item.to}
              >
                {item.icon}
                <div className="">{item.label}</div>
              </NavLink>
            ))}
          </div>
        </motion.aside>
      )}
    </div>
  );
}

export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(true);
  const [seletePayment, setSelectePayment] = useState("");
  const dispatch = useDispatch();
  const printRef = useRef();

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

  const onCheckOut = async () => {
    try {
      const payload = {
        paid_amount: String(total),
        total_amount: String(total),
        payment_method: seletePayment,
        detail: cart.map((item) => ({
          product_id: item?.id,
          price: item?.price,
          qty: item?.qty,
          discount: item?.discount,
          total:
            Number(item?.price) * Number(item?.qty) -
            ((Number(item?.discount) * Number(item?.price)) / 100) *
              Number(item?.qty),
        })),
      };

      console.log(payload);
      // return;
      const res = await request("order", "post", payload);

      if (res) {
        console.log(res?.data);
        if (res?.data) {
          dispatch(clearAllItem());
          setIsOpenDrawer(false);
          dispatch(setRefresh(true));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPrint = useReactToPrint({
    contentRef: printRef,
  });

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (!user || !token) {
      return navigate("/auth/login");
    }
  }, [user, token, navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isOpenDesktop={isOpenDesktop}
        setIsOpenDesktop={setIsOpenDesktop}
      />

      {/* Contain */}
      <div
        className={`flex-1 flex flex-col  transition-all duration-300 ${
          isOpenDesktop ? "md:ml-64" : ""
        }`}
      >
        {/* header */}
        <header className="py-2 px-4 flex  justify-between items-center bg-gray-300 sticky top-0 z-[50]">
          <button
            className="p-1 hover:bg-gray-100 rounded hidden md:inline-flex"
            onClick={() => setIsOpenDesktop(!isOpenDesktop)}
          >
            <Menu />
          </button>
          <button
            className="p-1 hover:bg-gray-100 rounded md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </button>
          <div className="flex gap-5 items-center">
            <h1>Dashboard</h1>
            <button
              className="p-1 bg-gray-200 transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black rounded"
              onClick={() => setIsOpenDrawer(true)}
            >
              <ShoppingCart className="size-8" />
            </button>

            <Drawer open={isOpenDrawer} onOpenChange={setIsOpenDrawer}>
              <DrawerContent data-vaul-drawer-direction="right">
                <DrawerHeader className={"flex flex-row justify-between px-6"}>
                  <button
                    className="p-1 bg-gray-300  transition-all duration-300 hover:scale-105 hover:bg-gray-300 hover:text-black rounded"
                    onClick={() => setIsOpenDrawer(false)}
                  >
                    <X />
                  </button>
                  <DrawerTitle>Shopping Cart</DrawerTitle>
                </DrawerHeader>
                <div className="px-2 ">
                  {cart.length === 0 ? (
                    <div>
                      <h1>No Shopping</h1>
                    </div>
                  ) : (
                    <div>
                      <div className="flex flex-col gap-3">
                        {Array.isArray(cart) &&
                          cart?.map((item, index) => (
                            <CartProduct key={index} product={item} />
                          ))}
                      </div>
                      <div className="mt-5 px-2 space-y-2">
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
                        <div className="flex justify-between border-b">
                          <span>Total</span>
                          <Select
                            value={seletePayment}
                            onValueChange={(value) => setSelectePayment(value)}
                          >
                            <SelectTrigger className={"w-50 mb-1"}>
                              <SelectValue placeholder="Pls select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ABA">ABA</SelectItem>
                              <SelectItem value="AC">AC</SelectItem>
                              <SelectItem value="Wing">Wing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end">
                          <div className="flex gap-2">
                            <Button onClick={onPrint}>Print</Button>
                            <Button onClick={onCheckOut}>Check out</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="border-none outline-none ">
                  <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                    <img
                      src={logo}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      const res = await request("auth/logout", "post");
                      if (res) {
                        console.log("Logout : ", res);
                        dispatch(logout());
                        dispatch(resetToken());
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Contain area */}
        <main className="flex-1  p-5">
          <div className="hidden">
            <Invocice ref={printRef} />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
