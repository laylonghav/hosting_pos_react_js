import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { Menu, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MasterLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-gray-200 py-2 px-4 sticky top-0 z-50">
        {/* Desktop Screen */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px]">
              <img className="rounded-full" src={logo} alt="" />
            </div>
            <div className="">
              <div className="font-bold italic text-xl">ICT Center</div>
              <div className="">Teacher</div>
            </div>
          </div>

          <div className="hidden md:flex gap-5 items-center ">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 bg-blue-500 rounded-4xl"
                  : "p-2 hover:bg-blue-500 rounded-4xl"
              }
              to={"/"}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 bg-blue-500 rounded-4xl"
                  : "p-2 hover:bg-blue-500 rounded-4xl"
              }
              to={"/product"}
            >
              Product
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "p-2 bg-blue-500 rounded-4xl"
                  : "p-2 hover:bg-blue-500 rounded-4xl"
              }
              to={"/profile"}
            >
              Profile
            </NavLink>
            <button className="p-1 hover:bg-gray-300 rounded flex justify-center items-center">
              <ShoppingCart />
            </button>
            <button className="p-1 hover:bg-gray-300 rounded flex justify-center items-center">
              <User />
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 hover:bg-gray-300 rounded flex justify-center items-center"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {/* Mobile Screen */}
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-200 py-4 pt-6 px-4 flex flex-col gap-5  space-y-2 absolute left-0 w-full z-40"
            >
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 bg-blue-500 rounded-4xl"
                    : "py-2 px-6 hover:bg-blue-500 rounded-4xl"
                }
                onClick={() => setIsOpen(false)}
                to={"/"}
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 bg-blue-500 rounded-4xl"
                    : "py-2 px-6 hover:bg-blue-500 rounded-4xl"
                }
                to={"/product"}
                onClick={() => setIsOpen(false)}
              >
                Product
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "py-2 px-6 bg-blue-500 rounded-4xl"
                    : "py-2 px-6 hover:bg-blue-500 rounded-4xl"
                }
                to={"/profile"}
                onClick={() => setIsOpen(false)}
              >
                Profile
              </NavLink>
              <div className="flex gap-5">
                <button className="p-1 hover:bg-gray-300 rounded flex justify-center items-center">
                  <ShoppingCart />
                </button>
                <button className="p-1 hover:bg-gray-300 rounded flex justify-center items-center">
                  <User />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default MasterLayout;
