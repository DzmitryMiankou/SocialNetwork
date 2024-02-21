import { render, screen } from "@testing-library/react";
import Input from "./Input";

it("changes the class when hovered", () => {
  render(<Input value="htjt" handleChange={() => {}} />);
  const elem = screen.getByAltText("htjt");
  expect(elem).toBeInTheDocument();
});
