"use client";

import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signup success", res);
      router.push("/login");
    } catch (err: any) {
      console.log("Sign up failed");
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-2 ">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <label className="" htmlFor="username">
        Username
      </label>
      <input
        className="rounded-lg px-2"
        id="username"
        placeholder="username"
        type="text"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <label className="" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className="rounded-lg px-2"
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
        className="rounded-lg px-2"
        placeholder="password"
        type="text"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />
    </div>
  );
};

export default page;
