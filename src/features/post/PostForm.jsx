import React from "react";
import { FTextField, FormProvider } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Card, Stack, alpha } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: "",
};

const PostForm = () => {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  //
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;
  //

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.post);
  const onSubmit = (data) => {
    dispatch(createPost(data)).then(() => reset());
  };
  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <FTextField
            rows={4}
            placeholder="Share what you are thinking here ..."
            sx={{
              "& fieldset": {
                borderWidth: "1px !important",
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
            name="content"
            multiline
            fullWidth
          />
          <FTextField name="image" placeholder="Image" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
};

export default PostForm;
