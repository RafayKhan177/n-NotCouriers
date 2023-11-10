import { Text, Container, ThemeIcon, SimpleGrid } from '@mantine/core';
import classes from './ClientServices.module.css';
import Link from 'next/link';
import { clientServiceslinks } from "@/components/static"

export default function ClientServices() {
  const items = clientServiceslinks.map((item) => (
    <Link href={item.link} key={item.image} style={{ textDecoration: 'none' }}>
      <div className={classes.item} >
        <ThemeIcon variant="light" color='red' className={classes.itemIcon} size={60} radius="md">
          {item.icon}
        </ThemeIcon>

        <div>
          <Text fw={700} fz="lg" style={{ color: "black" }} className={classes.itemTitle}>
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
      </SimpleGrid>
    </Container>
  );
}