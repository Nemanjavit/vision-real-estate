import { client } from "@/sanity/lib/client";
import classes from "./PropertyRow.module.css";
import CustomCarousel from "../Carousel/CustomCarousel";

type PropertyRowProps = {
  category: "casa" | "departamento" | "terreno" | "oficina";
  operation: "venta" | "renta";
  title: string;
};

const getProperties = async (category: string, operation: string) => {
  const query = `*[_type == "property" && property_type == $category && tipo_de_operacion == $operation][0..5]{
    title, slug, price, mainImage,_id,tipo_de_operacion,
  }`;

  return client.fetch(query, { category, operation });
};

export const PropertyRow: React.FC<PropertyRowProps> = async ({
  category,
  operation,
  title,
}) => {
  const properties = await getProperties(category, operation);

  if (!properties?.length) return null;

  return (
    <section className={classes.propertyRow}>
      <h2 className={classes.heading}>{title}</h2>
      <CustomCarousel items={properties} />
    </section>
  );
};
