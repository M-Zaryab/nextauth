"use client";

import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("login success", res);
      router.push("/profile");
    } catch (err: any) {
      console.log("login failed");
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-2 ">
      <h1 className="m-5 font-bold text-xl">
        {loading ? "Processing" : "Login"}
      </h1>
      <label className="" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="email"
        type="text"
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <label className="" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="password"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {buttonDisabled ? "No Login" : "Login"}
      </button>
      <Link href={"/signup"} className="font-light">
        Visit <span className="font-medium">Signup</span>
      </Link>
    </main>
  );
};

export default page;
