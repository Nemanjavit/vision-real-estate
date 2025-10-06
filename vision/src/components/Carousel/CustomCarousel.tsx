"use client";
import React from "react";
import classes from "./CustomCarousel.module.css";
import { Carousel } from "@mantine/carousel";
import { PropertyRowTypeT } from "@/types/types";
import PropertyCard from "../PropertyCard/PropertyCard";

type CustomCarousel = {
  base?: string;
  slideGap?: number;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  slidesToScroll?: number;
  items: PropertyRowTypeT[];
};

const CustomCarousel: React.FC<CustomCarousel> = ({
  slidesToScroll = 1,
  slideGap = 10,
  base = "100%",
  sm = "50%",
  md = "50%",
  lg = "33%",
  xl = "33%",
  items,
}) => {
  return (
    <Carousel
      slideSize={{ base, sm, md, lg, xl }}
      slideGap={slideGap}
      emblaOptions={{ slidesToScroll }}
      classNames={classes}
    >
      {items.map((item) => {
        return (
          <Carousel.Slide key={item._id}>
            <PropertyCard property={item} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default CustomCarousel;
