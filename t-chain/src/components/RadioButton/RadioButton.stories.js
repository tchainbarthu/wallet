import { RadioButton } from ".";

export default {
  title: "Components/RadioButton",
  component: RadioButton,
  argTypes: {
    stateProp: {
      options: ["havor", "selected", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    stateProp: "havor",
    className: {},
  },
};
