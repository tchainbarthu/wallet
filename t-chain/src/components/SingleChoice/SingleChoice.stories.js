import { SingleChoice } from ".";

export default {
  title: "Components/SingleChoice",
  component: SingleChoice,
  argTypes: {
    selectedOption: {
      options: ["two", "none", "three", "one"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    selectedOption: "two",
    className: {},
    selectionOptionText: "Select Option",
    selectionOptionText1: "Select Option",
    selectionOptionText2: "Select Option",
  },
};
