"use client"
import { useEffect, useState } from "react";
import { CAP } from "@/components/Index";


export default function Page() {

  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role)
  }, []);

  if (role === null) {
    return <CAP status={"notLoggedIn"} />;
  } 
  return (
    <div>page</div>
  )
}
