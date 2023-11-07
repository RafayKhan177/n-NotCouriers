"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const role = (JSON.parse(localStorage.getItem("userDoc")) || {}).role || null;
    setRole(role)
  }, []);

  if (role === null) {
    return <p>Please log in</p>;
  }
  return (
    <p>Invoices</p>
  );
}
