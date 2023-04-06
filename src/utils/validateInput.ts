export const validateInput = (value: string) => {
  if (value.length === 0) {
    return { isValid: false, errorText: "Can not be empty" };
  }

  return { isValid: true, errorText: "" };
};
