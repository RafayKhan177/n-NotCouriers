"use client";
import {
  Image,
  Text,
  Container,
  ThemeIcon,
  Title,
  SimpleGrid,
} from "@mantine/core";
// import IMAGES from './images';
import classes from "./ClientServices.module.css";
import Link from "next/link";

const data = [
  {
    image: "Place Booking",
    title: "Place Booking",
    description: "Place a Booking",
    link: "#",
  },
  {
    image: "Track Booking",
    title: "Track Booking",
    description: "Track your recent bookings",
    link: "#",
  },
  {
    image: "Job Inquiry",
    title: "Job Inquiry",
    description: "Enquire on a apecific booking",
    link: "#",
  },
  {
    image: "Price Job",
    title: "Price Job",
    description: "Price a booking",
    link: "#",
  },
  {
    image: "Addresses",
    title: "Addresses",
    description: "Manage frequent address",
    link: "#",
  },
  {
    image: "Invoices",
    title: "Invoices",
    description: "view invoices",
    link: "#",
  },
  {
    image: "Logout",
    title: "Logout",
    description: "Log Out",
    link: "#",
  },
];

export default function ClientServices() {
  const items = data.map((item) => (
    <Link href={item.link} style={{ textDecoration: "none" }}>
      <div className={classes.item} key={item.image}>
        {/* <ThemeIcon variant="light" className={classes.itemIcon} size={60} radius="md"> */}
        {/* <Image src={IMAGES[item.image]} /> */}
        {/* </ThemeIcon> */}

        <div className={classes.blockLayout}>
          <Text
            fw={700}
            fz="lg"
            className={classes.itemTitle + " " + classes.btn}
          >
            {item.title}
          </Text>
          <Text className={classes.descr} c="dimmed">
            {item.description}
          </Text>
        </div>
      </div>
    </Link>
  ));

  return (
    <Container size={700} className={classes.wrapper}>
      <Title className={classes.title} order={2}>
        CLIENT SERVICES
      </Title>

      <SimpleGrid spacing={50} mt={30}>
        {items}
      </SimpleGrid>
    </Container>
  );
}
