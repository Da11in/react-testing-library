import { validateInput } from "../../utils/validateInput";

describe("Validate input util tests", () => {
  it("Valid input value", () => {
    expect(validateInput("New").isValid).toBeTruthy();
    expect(validateInput("New").errorText).toHaveLength(0);
  });

  it("Invalid (empty) input value", () => {
    expect(validateInput("").isValid).toBeFalsy();
    expect(validateInput("").errorText).toBe("Can not be empty");
  });
});
