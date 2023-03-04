import { Button, Container, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { RHFTextField } from "../../../components/RHF/RHFTeaxField";
import { v4 as uuidv4 } from "uuid";
import useFormPersist from "react-hook-form-persist";

type Props = {
  defaultValues: {
    userId: string
  };
};


export const Login: FC<Props> = ({defaultValues}) => {
  const { handleSubmit, setValue, watch, control } = useForm({
    defaultValues,
  });

  // persist data
  useFormPersist("loginForm", {
    watch,
    setValue,
    storage: window.localStorage, // default window.sessionStorage
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const createNewId = () => {
    setValue("userId", uuidv4());
  };

  return (
    <Container sx={{ m: 8 }}>
      <Typography variant="h3" component={"h3"}>
        {" "}
        Login{" "}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container sx={{ mt: 2 }} spacing={2} gap={3}>
          <Grid md={4} xs={12} item>
            <RHFTextField
              name="userId"
              control={control}
              variant="outlined"
              label="Enter You ID"
              fullWidth
            />
          </Grid>
          <Grid md={4} xs={12} item>
            <Button type="submit" variant="contained" sx={{ m: 2 }}>
              Login
            </Button>
            <Button onClick={createNewId} variant="contained" color="secondary">
              Create New Id
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
