import styles from "./page.module.css";
import HeroSection from "@/components/Hero/HeroSection";
import { PropertyRow } from "@/components/PropertyRow/PropertyRow";
import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";

const PROPERTIES_QUERY = `*[
  _type == "property"
  && defined(slug.current)
]`;

export default async function Home() {
  const properties = await client.fetch<SanityDocument[]>(PROPERTIES_QUERY, {});

  console.log(properties);
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
