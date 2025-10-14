import Gallery from "@/components/Gallery/Gallery";
import classes from "./page.module.css";
import Price from "@/components/Price/Price";
import { client } from "@/sanity/lib/client";
import { Container, Divider, Title, Text, Flex } from "@mantine/core";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import CustomMap from "@/components/Map/CustomMap";

type PropertyPageT = {
  params: Promise<{ slug: string }>;
};

const PropertyPage: React.FC<PropertyPageT> = async ({ params }) => {
  const { slug } = await params;

  const query = groq`*[_type == "property" && slug.current == $slug][0]{
  title,
  price,
  tipo_de_operacion,
  description[],
  mainImage,
  gallery,
  location
}`;

  const property = await client.fetch(query, { slug });

  return (
    <div>
      <Container>
        <Flex className={classes.heading} wrap="wrap" py="xl">
          <Title className={classes.title} size={40} order={1}>
            {property.title}
          </Title>
          <Divider className={classes.divider} mx={36} orientation="vertical" />
          <Flex className={classes.subheading} direction="column">
            <Text size="xl" tt="capitalize">
              {property.tipo_de_operacion}
            </Text>
            <Price price={property.price} />
          </Flex>
        </Flex>

        <Gallery mainImage={property.mainImage} gallery={property.gallery} />
        <CustomMap location={property.location} />
        <PortableText value={property.description} />
        {/* map */}
      </Container>
    </div>
  );
};

export default PropertyPage;
