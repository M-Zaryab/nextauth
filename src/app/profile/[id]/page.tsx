"use client";

const page = ({ params }: any) => {
  return (
    <div className="flex felx-col items-center justify-center min-h-screen py-2">
      <h2>{params.id}</h2>
    </div>
  );
};

export default page;
