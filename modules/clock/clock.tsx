"use client";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const Clock = () => {
  // today is unused, but it's needed to trigger the useEffect
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [today, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 950);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const now = dayjs();

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <div className="text-2xl">{now.format("dddd, MMMM D, YYYY")}</div>
      <div className="flex flex-row gap-2">
        <div className="text-8xl">{now.format("HH:mm")}</div>
        <div className="text-3xl text-gray-500">{now.format("ss")}</div>
      </div>
    </div>
  );
};

export default Clock;
