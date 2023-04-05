import React, { useState } from "react";
import {
  Center,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm: React.FC = (): React.ReactElement => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object().shape({
      email: yup.string().required("Required").email("Should be valid email"),
      password: yup.string().required("Required"),
    }),
    onSubmit: async (values, helpers) => {
      setLoading(true);

      try {
        // dispatch set user
      } catch (err) {
        if (typeof err === "string") {
          helpers.setFieldError("email", err);
        } else {
          helpers.setFieldError("email", "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const emailError =
    !!formik.touched.email &&
    typeof formik.errors.email === "string" &&
    formik.errors.email.length > 0;

  const passwordError =
    !!formik.touched.password &&
    typeof formik.errors.password === "string" &&
    formik.errors.password.length > 0;

  const submitDisabled =
    emailError ||
    passwordError ||
    formik.values.email.length === 0 ||
    formik.values.password.length === 0;

  return (
    <Center flexDir="column" p={[40, 20]} borderWidth={1} borderRadius={10}>
      <Heading mb={10}>Login</Heading>
      <Stack spacing={7} minW={300}>
        <FormControl isInvalid={emailError}>
          <FormLabel>Email address</FormLabel>
          <Input
            id="email"
            data-testid="email-input"
            type="email"
            isRequired
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {emailError && <FormErrorMessage>{formik.errors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={passwordError}>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            data-testid="password-input"
            type="password"
            isRequired
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {passwordError && <FormErrorMessage>{formik.errors.password}</FormErrorMessage>}
        </FormControl>

        <Button
          data-testid="submit-button"
          colorScheme="teal"
          type="submit"
          onClick={() => formik.handleSubmit()}
          isDisabled={submitDisabled || loading}
          isLoading={loading}
          size="md"
        >
          Submit
        </Button>
      </Stack>
    </Center>
  );
};

export default LoginForm;
