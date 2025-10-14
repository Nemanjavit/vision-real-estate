import { ResponsiveImage, SanityImageUnion } from "../Gallery/Gallery";
import classes from "./Thumb.module.css";

type ThumbPropsT = {
  image: SanityImageUnion;
  selected: boolean;
  sizes: string;
  quality: number;
  onClick: () => void;
};

const Thumb: React.FC<ThumbPropsT> = ({
  image,
  selected,
  onClick,
  sizes,
  quality,
}) => {
  return (
    <div
      className={`${classes.embla_thumbs__slide} ${selected ? classes.slide__slected : ""}`}
    >
      <button
        onClick={onClick}
        type="button"
        className={classes.embla_thumbs__slide__button}
      >
        <ResponsiveImage
          className={classes.thumb_image}
          sizes={sizes}
          image={image}
          alt="thumbnail image"
          quality={quality}
        />
      </button>
    </div>
  );
};

export default Thumb;
