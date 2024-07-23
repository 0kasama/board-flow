"use client";

import Link from "next/link";
import { register } from "@/fetch/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, Mail, User } from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }
    const response = await register({
      name,
      email,
      password,
    });

    if (response.message === "Register Success") {
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handlePasswordChange = (e, setPasswordFunc) => {
    setPasswordFunc(e.target.value);
    setPasswordMatch(password === e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='container mx-auto h-screen flex flex-col items-center justify-center gap-5 w-2/3 lg:w-1/4'>
      <h1 className='text-5xl font-bold mb-2'>Register</h1>

      <label className='input input-bordered input-info flex items-center gap-2 w-full'>
        <User />
        <input
          type='text'
          className='grow'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className='input input-bordered input-info flex items-center gap-2 w-full'>
        <Mail />
        <input
          type='email'
          className='grow'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <div className='relative w-full'>
        <label
          className={`input input-bordered input-info flex items-center gap-2 w-full ${
            !passwordMatch ? "border-red-500 focus-border-red-500" : ""
          }`}
        >
          <KeyRound />
          <input
            type={showPassword ? "text" : "password"}
            className='grow'
            placeholder='Password'
            value={password}
            onChange={(e) => handlePasswordChange(e, setPassword)}
          />
        </label>
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2'
          onClick={handleShowPassword}
          type='button'
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <div className='relative w-full'>
        <label
          className={`input input-bordered input-info flex items-center gap-2 w-full ${
            !passwordMatch ? "border-red-500 focus-border-red-500" : ""
          }`}
        >
          <KeyRound />
          <input
            type={showPassword ? "text" : "password"}
            className='grow'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => handlePasswordChange(e, setConfirmPassword)}
          />
        </label>
        <button
          className='absolute right-2 top-1/2 transform -translate-y-1/2'
          onClick={handleShowPassword}
          type='button'
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      <button
        className='btn btn-info text-xl font-bold w-full'
        onClick={handleRegister}
      >
        Register
      </button>
      <Link href={"/login"} className='link link-info'>
        Already have an account?
      </Link>
    </div>
  );
}
