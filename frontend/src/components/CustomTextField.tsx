import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";
import { forwardRef } from "react";

const CustomTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    const [field, meta] = useField(props.name);

    return <TextField 
      ref={ref} 
      value={field.value} 
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      {...props}
    />;
  }
);

export default CustomTextField;
