import { Container } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Container height="100vh" display="flex" justifyContent="center" alignItems="center">
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
