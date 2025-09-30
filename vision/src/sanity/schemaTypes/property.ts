import { defineField, defineType } from "sanity";
import CustomField from "../components/shared/customField/CustomField";

export const propertyType = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fieldsets: [
    {
      name: "detalles",
      title: "Detalles de la propiedad",
      options: { columns: 2 },
    },
    {
      name: "ubicación",
      title: "Ubicación",
      options: { columns: 3 },
    },
  ],

  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "property_type",
      title: "Tipo de propiedad",
      type: "string",
      options: {
        list: [
          { title: "Casa", value: "casa" },
          { title: "Departamento", value: "departamento" },
          { title: "Terreno", value: "terreno" },
          { title: "Oficina", value: "oficina" },
        ],
      },
      components: { field: CustomField },
    }),

    defineField({
      type: "string",
      name: "tipo_de_operacion",
      title: "tipo de operacion",
      options: {
        list: [
          { title: "Venta", value: "venta" },
          { title: "Renta", value: "renta" },
        ],
      },
      components: { field: CustomField },
    }),

    defineField({
      name: "area_construida",
      title: "Area construida",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "superficie_del_terreno",
      type: "number",
      title: "Superficie del terreno",
      fieldset: "detalles",
    }),

    defineField({
      name: "recamaras",
      title: "Recámaras",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "banos",
      title: "Baños",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "mediosBanos",
      title: "Medios baños",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "estacionamientos",
      title: "Plazas de estacionamiento",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "price",
      title: "Precio",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "amueblado",
      title: "Amueblado",
      type: "string",
      options: {
        list: [
          { title: "Sin amueblar", value: "sin" },
          { title: "Totalmente amueblado", value: "total" },
        ],
        layout: "dropdown",
      },
      fieldset: "detalles",
    }),

    defineField({
      name: "anoConstruccion",
      title: "Año de construcción",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "gastosMantenimiento",
      title: "Gastos de mantenimiento",
      type: "string",
      fieldset: "detalles",
    }),

    defineField({
      name: "pisos",
      title: "Pisos",
      type: "number",
      fieldset: "detalles",
    }),

    defineField({
      name: "location",
      title: "Ubicación",
      type: "geopoint",
    }),

    defineField({
      name: "mainImage",
      title: "Imagen principal",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "gallery",
      title: "Galería de imágenes",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
    }),

    defineField({
      name: "description",
      title: "Descripción",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    }),
  ],
});
