"use client";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Button, Group } from "@mantine/core";
import Link from "next/link";
import NextTopLoader from "nextjs-toploader";
import { useEffect, useState } from "react";
import { adminPages, userPages, authPages } from "../static";
import Image from "next/image";
import { Header } from "@/components/Index";

export default function Navbar({ children }) {
  const [opened, { toggle }] = useDisclosure();

  const [role, setRole] = useState(null);
  useEffect(() => {
    const userDoc = JSON.parse(localStorage.getItem("userDoc")) || {};
    const userRole = userDoc.role || null;
    setRole(userRole);
  }, []);

  const pages = {
    admin: adminPages,
    user: userPages,
    auth: authPages,
  };

  const userPagesToRender = pages[role] || authPages;

  return (
    <AppShell
      header={{ height: 170 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
        <Group h="70%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }} mr={22}>
            <Image src="/logo.png" width={100} height={100} alt="Logo" />
            <Group ml="xl" gap={0} visibleFrom="sm">
              {userPagesToRender.map((val, ind) => (
                <Link key={ind} href={val.link}>
                  <Button variant="light" color="red" mr={5}>
                    {val.label}
                  </Button>
                </Link>
              ))}
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {userPagesToRender.map((val, ind) => (
          <Link key={ind} href={val.link}>
            <Button
              style={{ width: "100%", height: "3rem", marginTop: ".5rem" }}
              variant="light"
              color="red"
              mr={5}
            >
              {val.label}
            </Button>
          </Link>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
        <NextTopLoader />
      </AppShell.Main>
    </AppShell>
  );
}
