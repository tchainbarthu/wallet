import { SelectionOption } from ".";

export default {
  title: "Components/SelectionOption",
  component: SelectionOption,
  argTypes: {
    stateProp: {
      options: ["hover", "selected", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    optionText: "Select Option",
    stateProp: "hover",
    className: {},
    text: "Select Option",
  },
};
