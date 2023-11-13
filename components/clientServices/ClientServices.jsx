"use client";
import { Text, Container, ThemeIcon, SimpleGrid } from "@mantine/core";
import classes from "./ClientServices.module.css";
import Link from "next/link";
import { clientServiceslinks } from "@/components/static";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import { logout } from "@/api/firebase/functions/auth";
import { useRouter } from "next/navigation";

const logoutInfo = {
  image: "Logout",
  title: "Logout",
  description: "Log Out",
  link: "#",
  icon: <LogoutIcon />,
};

export default function ClientServices() {
  const router = useRouter();

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

  return (
    <Container size={700} className={classes.wrapper}>
      <Text className={classes.supTitle}>Client Services</Text>

      <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={50} mt={30}>
        {items}
        <div
          onClick={logoutUser}
          className={`${classes.item} ${classes.link}`}
          style={{ cursor: "pointer" }}
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
      </SimpleGrid>
    </Container>
  );
}
