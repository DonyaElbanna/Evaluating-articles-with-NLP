import { submitForm } from "../src/client/script/submitForm";

describe("Testing the form submission functionality", () => {
  test("Testing the existence of submitForm()", () => {
    expect(submitForm).toBeDefined();
  });
  test("Testing submitForm() being a function", () => {
    expect(typeof submitForm).toBe("function");
  });
});
