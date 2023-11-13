"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { adminPages, authPages, userPages } from "../static";
import { Hidden, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mantine/core";
import Image from "next/image";

const Navbar = () => {
  const userDoc = JSON.parse(localStorage.getItem("userDoc")) || {};
  const role = userDoc.role || null;

  const [userPagesToRender, setUserPagesToRender] = useState([]);

  useEffect(() => {
    const pages = {
      admin: adminPages,
      user: userPages,
      auth: authPages,
    };
    setUserPagesToRender(pages[role] || authPages);
  }, [role]);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Image src={"/logo.png"} alt="logo" width={120} height={120} />
      </Link>
      <Hidden mdDown>
        <ButtonsSection userPagesToRender={userPagesToRender} />
      </Hidden>
      <Hidden mdUp>
        <MenuSection userPagesToRender={userPagesToRender} />
      </Hidden>
    </nav>
  );
};

export default Navbar;

const ButtonsSection = ({ userPagesToRender }) => (
  <div>
    {userPagesToRender.map((val, ind) => (
      <Link key={ind} href={val.link}>
        <Button variant="light" color="red" style={{margin:"2px"}}>
          {val.label}
        </Button>
      </Link>
    ))}
  </div>
);

const MenuSection = ({ userPagesToRender }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="light" color="red" onClick={handleMenuOpen}>
        <MenuIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {userPagesToRender.map((val, ind) => (
          <Link style={{ textDecoration: "none" }} key={ind} href={val.link}>
            <MenuItem style={{color:'grey'}} onClick={handleMenuClose}>{val.label}</MenuItem>
          </Link>
        ))}
      </Menu>
    </>
  );
};
