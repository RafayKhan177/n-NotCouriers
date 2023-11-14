"use client";
import { Container, Group, Anchor } from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import classes from "./Footer.module.css";
import Image from "next/image";

const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Careers" },
];

export default function Footer() {
  const items = links.map((link) => (
    <Anchor<"a">
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={"/logo.png"} alt="logo" width={150} height={150} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
