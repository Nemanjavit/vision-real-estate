"use client";
import { useState } from "react";
import { Burger, Container, Group, Drawer, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../../../public/logo/vision.png";
import classes from "./Header.module.css";
import Link from "next/link";
import Image from "next/image";

const links = [
  { link: "/propiedades", label: "Propiedades" },
  { link: "/contactar", label: "Contactar" },
];

const Header = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Link className="logo-link" href="/">
          <Image width={100} height={50} src={logo} alt="Company Logo" />
        </Link>
        <Group gap={5} visibleFrom="sm" className={classes.linkGroup}>
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </Container>
      <Drawer
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        size="75%"
        padding="md"
        position="right"
        overlayProps={{ opacity: 0.55, blur: 3 }}
      >
        <ScrollArea h="100%">
          <Group className={classes.drawer} gap="lg">
            {items}
          </Group>
        </ScrollArea>
      </Drawer>
    </header>
  );
};

export default Header;
