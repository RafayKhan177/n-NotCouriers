"use client"
import { userRole } from "../api/firebase/functions/auth"

export default function Page() {

  
  
  if (userRole() == null) return <div>Please log in</div>;
  return (
    <div>hi</div>
  );
}
