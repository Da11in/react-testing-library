import { Button, Text, Center, Heading } from "@chakra-ui/react";
import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Center h="100vh" flexDirection="column">
      <Heading>Page not found</Heading>
      <Text p={10} color="red.600">
        {isRouteErrorResponse(error) && typeof error.data === "string"
          ? error.data
          : "Page not found"}
      </Text>
      <Button>
        <Link to="/">Go back</Link>
      </Button>
    </Center>
  );
};

export default ErrorPage;
