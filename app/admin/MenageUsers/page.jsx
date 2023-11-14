"use client"
import { useState, useEffect } from "react";
import { getCollection } from "@/api/firebase/functions/fetch";
import { Users } from "@/components/Index";

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await getCollection("users");
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, []);

  return <Users users={users} />;
}
