"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { login } from "@/fetch/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, Mail } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const token = response.accessToken;
      if (!token) {
        setError(true);
      } else {
        Cookies.set("accessToken", token);
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 1000);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      setError(true);
    } finally {
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center gap-5 w-2/3 lg:w-1/4'>
      <h1 className='text-5xl font-bold mb-2'>LOGIN</h1>
      <label className='input input-bordered input-info flex items-center gap-2 w-full'>
        <Mail />
        <input
          type='text'
          className='grow'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <div className='relative w-full'>
        <label className='input input-bordered input-info flex items-center gap-2 w-full'>
          <KeyRound />
          <input
            type={showPassword ? "text" : "password"}
            className='grow'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2'
          onClick={handleShowPassword}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <button
        className='btn btn-info text-xl font-bold w-full'
        onClick={handleLogin}
      >
        Login
      </button>
      <Link href={"/register"} className='link link-info'>
        Don't have an account yet?
      </Link>
    </div>
  );
}
