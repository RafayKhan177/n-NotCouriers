"use client"
import { ClientServices } from '../../components/Index'
import { UserRole } from "../../api/userRole"

export default function page() {
  if (UserRole() == null) return <p>Please log in</p>;
  return (
    <ClientServices />
  )
}
