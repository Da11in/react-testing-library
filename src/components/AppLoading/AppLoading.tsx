import { Box, Center, Spinner } from "@chakra-ui/react";

const AppLoading = () => {
  return (
    <Box w="100%" h="100vh">
      <Center h="100vh">
        <Spinner size="lg" color="teal.500" />
      </Center>
    </Box>
  );
};

export default AppLoading;
