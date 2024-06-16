import { Description } from ".";

export default {
  title: "Components/Description",
  component: Description,
  argTypes: {
    property1: {
      options: ["english", "chinese"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    property1: "english",
    className: {},
  },
};
