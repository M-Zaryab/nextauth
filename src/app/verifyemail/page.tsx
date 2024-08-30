"use client";

import { useState, useEffect } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const [token, setToken] = useState("");
  const [verified, setVerfied] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", token);
      setVerfied(true);
      setError(false);
    } catch (err: any) {
      setError(true);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    // const { query } = router;
    // const urlToken2 = query.token;
    console.log("urlToken: ", urlToken);
    // console.log("urlToken2: ", urlToken2);
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen py-2 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Verify Email</h1>
      <h2 className="text-xl font-bold bg-orange-500 text-black">
        {token ? `${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Not Verified</h2>
        </div>
      )}
    </div>
  );
};

export default page;
