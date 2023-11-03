"use client"
import { Group, Burger, } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';
import classes from './Header.module.css';
import { links } from "../static"
import Link from 'next/link';


export default function Header() {
    console.log(links)
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => (
        <div
            key={link.label}
            href={link.link}
            className={classes.link}
            onClick={(event) => event.preventDefault()}
        >
            <Link href={link.link} style={{ textDecoration: "none" }} className={classes.link}>
                {link.label}
            </Link>
        </div>
    ));

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                    <MantineLogo size={28} />
                </Group>

                <Group>
                    <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
                        {items}
                    </Group>
                </Group>
            </div>
        </header>
    );
}