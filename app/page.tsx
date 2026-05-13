"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/groups")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
  

  return (
    <div>
      Home
    </div>
  );
}
