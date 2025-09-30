import styles from "./page.module.css";
import HeroSection from "@/components/Hero/HeroSection";
import { PropertyRow } from "@/components/PropertyRow/PropertyRow";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <PropertyRow category="casa" operation="venta" title="Casas en venta" />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
