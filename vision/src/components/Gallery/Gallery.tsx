"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Property } from "../../../sanity.types";
import { urlFor } from "@/sanity/lib/image";
import classes from "./Gallery.module.css";
import Image, { ImageLoader } from "next/image";
import { useCallback, useState, useEffect } from "react";
import Thumb from "../Thumb/Thumb";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

type GalleryPropsT = Pick<Property, "mainImage" | "gallery">;

const options: EmblaOptionsType = {};

export type SanityMainImage = NonNullable<Property["mainImage"]>;

export type SanityGalleryImage = NonNullable<Property["gallery"]>[number];

export type SanityImageUnion = SanityMainImage | SanityGalleryImage;
type ResponsiveImageT = {
  image: SanityImageUnion;
  alt: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
};

export const ResponsiveImage: React.FC<ResponsiveImageT> = ({
  image,
  alt,
  sizes = "80vw",
  priority = false,
  quality = 75,
  className,
}) => {
  const loader: ImageLoader = ({ width, quality: q }) =>
    urlFor(image)
      .width(width)
      .auto("format")
      .quality(q ?? quality)
      .url();

  const src = urlFor(image).width(800).auto("format").quality(quality).url();
  return (
    <Image
      loader={loader}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
};

const Gallery: React.FC<GalleryPropsT> = ({ mainImage, gallery }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const onNextClick = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollNext();
  }, [emblaMainApi]);

  const onPrevClick = useCallback(() => {
    if (emblaMainApi) emblaMainApi.scrollPrev();
  }, [emblaMainApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  if (!gallery || !mainImage) return;
  const slides = [mainImage, ...gallery];

  return (
    <div className={classes.embla}>
      <div className={classes.embla__controls}>
        <button
          onClick={onPrevClick}
          className={`${classes.embla__prev} ${selectedIndex === 0 ? classes.embla__prev__disabled : ""}`}
        >
          <IoIosArrowDropleftCircle size={36} />
        </button>

        <button
          onClick={onNextClick}
          className={`${classes.embla__next} ${selectedIndex === slides.length - 1 ? classes.embla__next__disabled : ""}`}
        >
          <IoIosArrowDroprightCircle size={36} />
        </button>
      </div>
      <div className={classes.embla__viewport} ref={emblaMainRef}>
        <div className={classes.embla__container}>
          {slides.map((slide, index) => {
            if (!slide.asset) return;

            return (
              <div className={classes.embla__slide} key={index}>
                <ResponsiveImage
                  alt="slide image"
                  priority={index === 0}
                  image={slide}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={classes.embla_thumbs}>
        <div className={classes.embla_thumbs__viewport} ref={emblaThumbsRef}>
          <div className={classes.embla_thumbs__container}>
            {slides.map((image, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                image={image}
                sizes="100px"
                quality={100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
