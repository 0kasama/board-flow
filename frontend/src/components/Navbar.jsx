"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Theme from "@/components/Theme";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    setAccessToken(Cookies.get("accessToken"));
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/");
    window.location.reload();
  };

  return (
    <div className='navbar bg-base-100 shadow-xl'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle'>
            <Menu />
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {!accessToken ? (
              <>
                <li>
                  <Link href={"/login"}>Login</Link>
                </li>
                <li>
                  <Link href={"/register"}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/profile"}>Profile</Link>
                </li>
                <li>
                  <a className='text-red-500' onClick={handleLogout}>
                    Logout
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className='navbar-center'>
        <Link href={"/"}>
          <button className='btn btn-ghost text-xl'>Board Flow</button>
        </Link>
      </div>
      <div className='navbar-end pr-2'>
        <Theme />
      </div>
    </div>
  );
}
