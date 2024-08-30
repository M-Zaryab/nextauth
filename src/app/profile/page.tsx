"use client";

import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const getUserData = async () => {
    try {
      const userData = await axios.post("/api/users/me");
      console.log(userData);
      setData(userData.data.data._id);
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  const logout = async () => {
    try {
      await axios.get("/api/users/logut");
      toast.success("Logout success");
    } catch (err: any) {}
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1></h1>
      <hr />
      <h2>
        {data === null ? (
          "No Data"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr className="text-white" />
      <button
        className="m-2 px-4 rounded-md bg-orange-500"
        onClick={() => getUserData()}
      >
        Get Data
      </button>
      <button
        className="m-2 rounded-md px-4 bg-blue-600"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
