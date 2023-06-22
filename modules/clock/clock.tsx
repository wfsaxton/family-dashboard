"use client";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { clockConfig } from "@/config/config";

const Clock = () => {
  const [dateFormatted, setDateFormatted] = useState("");
  const [timeFormatted, setTimeFormatted] = useState("");
  const [secondsFormatted, setSecondsFormatted] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      setDateFormatted(now.format("dddd, MMMM D, YYYY"));
      setTimeFormatted(now.format("HH:mm"));
      setSecondsFormatted(now.format("ss"));
    }, clockConfig.refreshInterval);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <div className="text-2xl w-full">{dateFormatted}</div>
      <div className="flex flex-row gap-2 w-full">
        <div className="text-8xl w-7/8">{timeFormatted}</div>
        <div className="text-3xl text-gray-500 w-1/8">{secondsFormatted}</div>
      </div>
    </div>
  );
};

export default Clock;
