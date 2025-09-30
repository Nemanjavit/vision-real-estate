import { set, unset, StringFieldProps, TitledListValue } from "sanity";
import classes from "./CustomField.module.css";

type OptionItem = { title: string; value: string | undefined };

const CustomField = (props: StringFieldProps) => {
  const { schemaType, inputProps, title } = props;
  const { onChange, value } = inputProps;

  const rawOptions = (schemaType.options?.list ?? []) as (
    | string
    | TitledListValue<string>
  )[];

  const options: OptionItem[] = rawOptions.map((opt) =>
    typeof opt === "string"
      ? { title: opt, value: opt }
      : { title: opt.title, value: opt.value }
  );

  return (
    <div className={classes.customField}>
      <p className={classes.title}>{title}</p>
      <div className={classes.fieldRow}>
        {options.map((opt) => {
          const isSelected = value === opt.value;

          return (
            <button
              className={`${classes.button} ${isSelected ? classes.selected : ""}`}
              key={opt.value ?? opt.title}
              type="button"
              onClick={() => onChange(isSelected ? unset() : set(opt.value))}
            >
              {opt.title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomField;
