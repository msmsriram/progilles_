export const PASSWORD_MESSAGE =
  "Password must be minimum 8 characters, with at least a symbol, upper and lower case letters and a number";

export const PHONE_MESSAGE = "Phone number must be 10 digits";

export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const CONFIRM_PASSWORD = "Confirmed password must be same as password";

export const LOADING = "loading";

export const SUCCEEDED = "succeeded";

export const IDLE = "idle";

export const FAILED = "failed";

export const ADD_FORM_FIELD = "ADD_FORM_FIELD";

export const UPDATE_FORM_FIELD = "UPDATE_FORM_FIELD";

export const REMOVE_FORM_FIELD = "REMOVE_FORM_FIELD";

export const UPDATE_RADIO_FIELD = "UPDATE_RADIO_FIELD";

// 2XX

export const SUCCESS = {
  status: 200,
};

export const LOGIN_SUCCESS = {
  status: 200,
  message: "Logged in successfully",
};

export const REGISTER_SUCCESS = {
  status: 201,
  message: "Registered successfully",
};

export const FORM_CREATE_SUCCESS = {
  status: 201,
  message: "Form created successfully",
};

export const NO_CONTENT = {
  status: 204,
  message: "No content available",
};

//4XX

export const STANDARD_ERROR = {
  status: 400,
};

export const UNAUTHORIZED = {
  status: 401,
  message: "Invalid credentials",
};

export const FORBIDDEN = {
  status: 403,
  message: "Unauthorized",
};

export const ERROR_UNKNOWN = {
  status: 500,
  message: "Something went wrong!",
};
