"use client"
import { Group, Paper, SimpleGrid, Text } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./Stats.module.css";
import { useEffect, useState } from "react";
import { getCollection } from "@/api/firebase/functions/fetch";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export default function Stats() {
  const [statsData, setStatsData] = useState({ bookings: 0, jobs: 0, users: 0 });

  useEffect(() => {
    const getData = async () => {
      try {
        const bookings = await getCollection("place_bookings");
        const jobs = await getCollection("place_job");
        const users = await getCollection("users");
        setStatsData({
          bookings: bookings?.length || 0,
          jobs: jobs?.length || 0,
          users: users?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const stats = [
    { title: "Bookings", icon: "receipt", value: statsData.bookings, diff: 18 },
    { title: "Jobs", icon: "coin", value: statsData.jobs, diff: 18 },
    {
      title: "Invoices",
      icon: "discount",
      value: statsData.bookings + statsData.jobs,
      diff: 18,
    },
    { title: "Customers", icon: "user", value: statsData.users, diff: 30 },
  ] as const;

  const renderedStats = stats.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          {/* <Text
            c={stat.diff > 0 ? "teal" : "red"}
            fz="sm"
            fw={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text> */}
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Company Status
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{renderedStats}</SimpleGrid>
    </div>
  );
}
