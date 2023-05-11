import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FormProvider, FTextField } from "react-hook-form";
import { useForm } from "react-hook-form";
import { yupResolver, YupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("Password")], "Passwords must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

const RegisterPage = () => {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState();
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState();

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const {
    handleSubmid,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
};

export default RegisterPage;
