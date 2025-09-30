import classes from "./CustomField.module.css";
import { set, unset } from "sanity";

const CustomField = (props: any) => {
  const { schemaType } = props;
  const { onChange, value } = props.inputProps;
  const options = schemaType.options?.list || [];

  return (
    <div className={classes.customField}>
      <p className={classes.title}>{props.title}</p>
      <div className={classes.fieldRow}>
        {options.map((opt: any) => {
          const isSelected = value === opt.value;

          return (
            <button
              className={`${classes.button} ${isSelected ? classes.selected : ""}`}
              key={opt.value}
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
