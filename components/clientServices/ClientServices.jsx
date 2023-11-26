"use client";
import { Text, Container, ThemeIcon, SimpleGrid } from "@mantine/core";
import classes from "./ClientServices.module.css";
import Link from "next/link";
import { clientServiceslinks } from "@/components/static";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { logout } from "@/api/firebase/functions/auth";
import { useRouter } from "next/navigation";
import PriceJobIcon from "@mui/icons-material/MonetizationOn";
import { useEffect, useState } from "react";
// import PriceJobIcon from "./PriceJobIcon"; // Assuming PriceJobIcon is imported

const logoutInfo = {
  image: "Logout",
  title: "Logout",
  description: "Log Out",
  link: "#",
  icon: <LogoutIcon />,
};

export default function ClientServices() {
  const router = useRouter();
  const [userRole, setUserRole] = useState([]);

  useEffect(() => {
    const userDoc = JSON.parse(localStorage.getItem("userDoc")) || {};
    const role = userDoc.role || null;
    setUserRole(role);
  }, []);

  const logoutUser = async () => {
    await logout();
    router.push(`/Signin`);
  };

  const items = clientServiceslinks.map((item, index) => (
    <Link
      href={item.link}
      key={index}
      passHref
      style={{ textDecoration: "none" }}
    >
      {/* Apply styles to the Link component */}
      <div className={`${classes.item} ${classes.link}`}>
        <ThemeIcon
          variant="light"
          color="red"
          className={classes.itemIcon}
          size={60}
          radius="md"
        >
          {item.icon}
        </ThemeIcon>

        <div>
          <Text
            fw={700}
            fz="lg"
            style={{ color: "black" }}
            className={classes.itemTitle}
          >
            {item.title}
          </Text>
          <Text c="dimmed">{item.description}</Text>
        </div>
      </div>
    </Link>
  ));

  // Conditionally render the Price Job link if userRole is admin
  if (userRole === "business" || userRole === "admin") {
    items.push(
      <Link
        href="/PriceTheJob"
        key="adminLink"
        passHref
        style={{ textDecoration: "none" }}
      >
        <div className={`${classes.item} ${classes.link}`}>
          <ThemeIcon
            variant="light"
            color="red"
            className={classes.itemIcon}
            size={60}
            radius="md"
          >
            <PriceJobIcon />
          </ThemeIcon>
          <div>
            <Text
              fw={700}
              fz="lg"
              style={{ color: "black" }}
              className={classes.itemTitle}
            >
              Price Job
            </Text>
            <Text c="dimmed">Price a booking</Text>
          </div>
        </div>
      </Link>
    );
  }

  // Add the logout link at the end
  items.push(
    <div
      onClick={logoutUser}
      className={`${classes.item} ${classes.link}`}
      style={{ cursor: "pointer" }}
      key="logoutLink"
    >
      <ThemeIcon
        variant="light"
        color="red"
        className={classes.itemIcon}
        size={60}
        radius="md"
      >
        {logoutInfo.icon}
      </ThemeIcon>
      <div>
        <Text
          fw={700}
          fz="lg"
          style={{ color: "black" }}
          className={classes.itemTitle}
        >
          {logoutInfo.title}
        </Text>
        <Text c="dimmed">{logoutInfo.description}</Text>
      </div>
    </div>
  );

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>Client Services</Text>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
