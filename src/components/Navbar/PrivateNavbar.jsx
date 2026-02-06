import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IoLogOutOutline } from "react-icons/io5";
import { SiAuthy } from "react-icons/si";
import { logoutAction } from "../../redux/slice/authSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutAction());
    localStorage.removeItem("userInfo");
  };

  return (
    <Disclosure as="nav" className="bg-white border-b shadow-sm">
      {({ open }) => (
        <>
          {/* TOP BAR */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">

              {/* LEFT: Mobile Menu Button */}
              <div className="flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>

              {/* CENTER: Logo */}
              <div className="flex items-center gap-2">
                <SiAuthy className="h-8 w-8 text-green-500" />
                <span className="text-lg font-semibold text-gray-800 hidden sm:block">
                  Expense Tracker
                </span>
              </div>

              {/* DESKTOP LINKS */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                <Link to="/add-transaction" className="nav-link">Add Transaction</Link>
                <Link to="/add-category" className="nav-link">Add Category</Link>
                <Link to="/categories" className="nav-link">Categories</Link>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/profile" className="nav-link">Profile</Link>

                <button
                  onClick={logoutHandler}
                  className="flex items-center gap-1 rounded-md bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                >
                  <IoLogOutOutline />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* MOBILE MENU */}
          <Disclosure.Panel className="md:hidden border-t">
            <div className="space-y-1 px-4 py-3">
              {[
                ["/", "Home"],
                ["/add-transaction", "Add Transaction"],
                ["/add-category", "Add Category"],
                ["/categories", "Categories"],
                ["/dashboard", "Dashboard"],
                ["/profile", "Profile"],
              ].map(([to, label]) => (
                <Link key={to} to={to}>
                  <Disclosure.Button className="block w-full rounded-md px-3 py-2 text-left text-gray-700 hover:bg-gray-100">
                    {label}
                  </Disclosure.Button>
                </Link>
              ))}

              <button
                onClick={logoutHandler}
                className="mt-2 flex w-full items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              >
                <IoLogOutOutline />
                Logout
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
