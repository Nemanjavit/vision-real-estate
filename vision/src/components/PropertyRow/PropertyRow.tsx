import { client } from "@/sanity/lib/client";
import PropertyCard from "../PropertyCard/PropertyCard";

interface PropertyRowProps {
  category: "casa" | "departamento" | "terreno" | "oficina";
  operation: "venta" | "renta";
  title: string;
}

type PropertyTypeT = {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  mainImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    _type: "image";
  };
  price: number;
};

const getProperties = async (category: string, operation: string) => {
  const query = `*[_type == "property" && property_type == $category && tipo_de_operacion == $operation][0..5]{
    title, slug, price, mainImage,_id
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
    <section>
      <h2>{title}</h2>
      <div>
        {properties.map((property: PropertyTypeT) => {
          return <PropertyCard key={property._id} />;
        })}
      </div>
    </section>
  );
};
