import { checkURL } from "../src/client/script/checkURL";

describe("Testing the checking url functionality", () => {
  test("Testing the existence of checkURL()", () => {
    expect(checkURL).toBeDefined();
  });
  test("Testing checkURL() being a function", () => {
    expect(typeof checkURL).toBe("function");
  });
  test("Testing the validity of the input in checkURL()", () => {
    expect(checkURL("https://www.udacity.com/")).toBeTruthy();
    expect(checkURL("www.stackoverflow.com/")).toBeTruthy();
    expect(checkURL("q2w3e4r5t6y")).toBeFalsy();
    expect(checkURL("")).toBeFalsy();
  });
});
