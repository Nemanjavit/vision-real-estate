import styles from "./page.module.css";
import HeroSection from "@/components/Hero/HeroSection";
import { PropertyRow } from "@/components/PropertyRow/PropertyRow";
import { Container } from "@mantine/core";
import { Geopoint } from "../../sanity.types";
import dynamic from "next/dynamic";

const MapWithNoSSR = dynamic(() => import("@/components/Map/CustomMap"));

export default async function Home() {
  const sampleLocations: Geopoint[] = [
    { _type: "geopoint", lat: 17.9865, lng: -92.932 },
    { _type: "geopoint", lat: 17.987, lng: -92.9375 },
    { _type: "geopoint", lat: 17.992, lng: -92.929 },
    { _type: "geopoint", lat: 17.991, lng: -92.935 },
    { _type: "geopoint", lat: 17.98, lng: -92.92 },
    { _type: "geopoint", lat: 17.984, lng: -92.94 },
    { _type: "geopoint", lat: 17.99, lng: -92.945 },
    { _type: "geopoint", lat: 17.995, lng: -92.938 },
    { _type: "geopoint", lat: 17.9925, lng: -92.915 },
    { _type: "geopoint", lat: 17.988, lng: -92.95 },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <HeroSection />
        <Container>
          <section className={styles.section_spacer}>
            <PropertyRow
              category="casa"
              operation="venta"
              title="Casas en venta"
            />
          </section>
          <section className={styles.section_spacer}>
            <MapWithNoSSR data={sampleLocations} />
          </section>
        </Container>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
