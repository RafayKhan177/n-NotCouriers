"use client"
import React, { useEffect, useState } from 'react';
import { ClientServices } from '../../components/Index';

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
    <ClientServices />
  );
}
