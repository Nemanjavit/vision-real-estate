import { Button, Container, Text, Title } from "@mantine/core";
import classes from "./HeroSection.module.css";
import Image from "next/image";
import bg from "../../../public/images/herobg.jpg";

const HeroSection = () => {
  return (
    <section className={classes.root}>
      <Image
        className={classes.heroBackground}
        alt="hero background"
        src={bg}
        priority
        fill
      />
      <div className={classes.overlay}></div>
      <Container
        className={classes.heroContainer}
        h="100%"
        size="md"
        display="flex"
      >
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: "red", to: "red" }}
              >
                fully featured
              </Text>{" "}
              React components library
            </Title>

            <Text className={classes.description} mt={30}>
              Build fully functional accessible web applications with ease –
              Mantine includes more than 100 customizable components and hooks
              to cover you in any situation
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: "red", to: "red" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
