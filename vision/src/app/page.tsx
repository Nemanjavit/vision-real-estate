import styles from "./page.module.css";
import HeroSection from "@/components/Hero/HeroSection";
import { PropertyRow } from "@/components/PropertyRow/PropertyRow";
import { Container } from "@mantine/core";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <Container>
          <PropertyRow
            category="casa"
            operation="venta"
            title="Casas en venta"
          />
        </Container>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
