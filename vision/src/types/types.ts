export type PropertyRowTypeT = {
  _id: string;
  title: string;
  tipo_de_operacion: string;
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
