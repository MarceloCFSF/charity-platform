import { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { NumericFormat } from "react-number-format";

const CurrencyField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [field, meta, helpers] = useField(props.name);

    return (
      <NumericFormat
        inputRef={ref}
        value={field.value}
        onChange={field.onChange}
        onValueChange={(value) => {
          helpers.setValue(value.floatValue)
        }}
        onBlur={field.onBlur}
        label={props.label}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        fixedDecimalScale
        decimalScale={2}
        prefix="R$ "
      />
    )
  })

export default CurrencyField;
