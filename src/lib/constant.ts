export const Colors = {
  // 240, 20%, 15%
  primary: "#1E1E2D",
  // 240, 5%, 63%
  inActive: "#9B9BA4",
  // 0, 84%, 60%
  red: "#EF4444",
  // 204, 33%, 97%
  bg: "#F5F8FA",

  // 0, 0%, 93%
  border: "#EDEDED",
  // 202, 100%, 48%
  blue: "#009EF7",
  // 147, 56%, 56%
  green: "#50CD89",
  // 224, 16%, 54%
  grey: "#78829D",
  // 229, 95%, 57%
  main: "#2850FA",
};

export const money = (value: string, currency = "") => {
  return `${currency}${value
    .replaceAll(",", "")
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// xs: 12px
// sm: 14px
// lg: 18px
// xl: 20px
// 2xl: 24px
// sm: 12px

export enum InputType {
  email = 10,
  text = 20,
  number = 30,
  date = 40,
  select = 50,
  combobox = 60,
}

// harna
export enum PAYMENT {
  QPAY = 1,
  LOYALTY = 2,
}

export enum SERVICE {
  REVIEW = 10,
  DATA = 20,
}
