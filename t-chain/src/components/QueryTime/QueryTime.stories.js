import { QueryTime } from ".";

export default {
  title: "Components/QueryTime",
  component: QueryTime,
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
