export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const articleValues = {
  title: "",
  content: "",
  image: {} as File | string,
  isPublic: false,
};

export const MAX_CONTENT_LENGTH = 90;
