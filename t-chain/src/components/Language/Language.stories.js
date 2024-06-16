import { Language } from ".";

export default {
  title: "Components/Language",
  component: Language,
  argTypes: {
    property1: {
      options: ["collepsed", "default"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "collepsed",
    className: {},
  },
};
