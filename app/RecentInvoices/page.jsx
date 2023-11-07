import React, { useEffect, useState } from "react";
import { userRole } from "../../api/firebase/functions/auth";

export default function Page() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userDoc = JSON.parse(localStorage.getItem("userDoc"));
    const userRoleValue = (userDoc || {}).role || null;
    setRole(userRoleValue);
  }, []);

  if (role === null) return <p>Please log in</p>;

  return (
    <p>Invoices</p>
  );
}
