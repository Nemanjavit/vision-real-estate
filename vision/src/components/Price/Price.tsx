import { NumberFormatter } from "@mantine/core";
type PriceT = { price: number };

const Price: React.FC<PriceT> = ({ price }) => {
  return (
    <NumberFormatter prefix="$" suffix="MXN" value={price} thousandSeparator />
  );
};

export default Price;
