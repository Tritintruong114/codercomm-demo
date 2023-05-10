import React, { useState } from "react";
import { FCheckBox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

const LoginPage = () => {
  //
  const auth = useAuth();
  //
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  //
  const {
    handleSubmit,
    reset,
    setError,
    formState: { error, isSubmitting },
  } = methods;
  //
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState();
  //

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;
    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {error.responseError && (
            <Alert severity="error">{error.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?
            <Link variant="subtitle2" components={RouterLink} to="/register">
              Get Started
            </Link>
          </Alert>

          <FTextField name="email" label="Email Address"></FTextField>

          <FTextField
            name="password"
            label="password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></FTextField>
        </Stack>
      </FormProvider>
    </Container>
  );
};

export default LoginPage;
