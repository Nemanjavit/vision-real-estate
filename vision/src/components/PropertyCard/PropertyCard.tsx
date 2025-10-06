import { Box, Card, Center, Group, Text } from "@mantine/core";
import classes from "./PropertyCard.module.css";
import { PropertyRowTypeT } from "@/types/types";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

type PropertyCardType = {
  property: PropertyRowTypeT;
};

const PropertyCard: React.FC<PropertyCardType> = ({ property }) => {
  const { mainImage, title, price, tipo_de_operacion } = property;

  const formatPrice = (price: number) => {
    const formatedPrice = new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "MXN",
    }).format(price);

    return formatedPrice;
  };

  return (
    <Link
      className={classes.linkOverlay}
      href={`/propiedades/${property.slug.current}`}
    >
      <Card
        p="lg"
        shadow="lg"
        className={classes.card}
        radius="md"
        component="div"
      >
        <Box
          className={classes.operationTypeBox}
          component="div"
          bg="red.9"
          pos="absolute"
          top="0"
          right="0"
          px="lg"
          py="2"
        >
          <Text className={classes.operationType} fw={900} c="gray.1">
            {tipo_de_operacion}
          </Text>
        </Box>
        <div
          className={classes.image}
          style={{
            backgroundImage: `url(${urlFor(mainImage).width(400).url()})`,
          }}
        />
        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Text size="lg" className={classes.title} fw={500}>
              {title}
            </Text>

            <Group justify="space-between" gap="xs">
              <Text size="sm" className={classes.author}>
                {formatPrice(price)}
              </Text>

              <Group gap="lg">
                <Center></Center>
              </Group>
            </Group>
          </div>
        </div>
      </Card>{" "}
    </Link>
  );
};

export default PropertyCard;
