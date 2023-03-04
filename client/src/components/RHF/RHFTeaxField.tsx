// form
import { Controller, Control } from "react-hook-form";
// @mui
import { TextField, TextFieldProps } from "@mui/material";

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  control: Control<any, any>;
};

export function RHFTextField({ name, control, ...other }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <TextField
          fullWidth
          inputRef={ref}
          autoComplete="off"
          error={!!error}
          helperText={error?.message}
          {...field}
          {...other}
        />
      )}
    />
  );
}
