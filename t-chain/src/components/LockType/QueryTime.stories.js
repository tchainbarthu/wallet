import { LockType } from ".";

export default {
  title: "Components/LockType",
  component: LockType,
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
