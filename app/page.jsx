"use client"
import { userRole } from "../api/firebase/functions/auth"
export default function Page() {
  if (userRole() == null) return <p>Please log in</p>;
  return (
    <p>hi</p>
  );
}
