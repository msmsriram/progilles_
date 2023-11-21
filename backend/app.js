const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const {
  EMAIL_ALREADY_EXIST,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  UNAUTHORIZED,
  SUCCESS,
} = require("./constants");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Invalid JSON in request body" });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: "Email id is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.post("/calculate_unknowns", async (req, res) => {
  const c_p_h = 2,
    c_p_C = 1;
  // Given values
  let { T_H_IN, T_H_OUT, T_C_IN, T_C_OUT, m_dot_H, m_dot_C, UA } = req.body;

  let result;

  // Case 1: T_H_OUT is missing
  if (T_H_OUT === null) {
    m_dot_H = (T_H_IN - T_C_OUT) / UA;
    T_H_OUT = T_H_IN - m_dot_H * UA;
  }

  // Case 2: m_dot_H is missing
  else if (m_dot_H === null) {
    m_dot_H = (T_H_IN - T_H_OUT) / UA;
  }

  // Case 3: T_C_OUT is missing
  else if (T_C_OUT === null) {
    m_dot_H = (T_H_IN - T_H_OUT) / UA;
    T_C_OUT = T_H_IN - m_dot_H * UA;
  }

  // Case 4: m_dot_C is missing
  else if (m_dot_C === null) {
    m_dot_C = (T_H_IN - T_C_OUT) / UA;
  }

  // Case 5: T_H_IN is missing
  else if (T_H_IN === null) {
    T_H_IN = T_H_OUT + m_dot_H * UA;
  }

  // Case 6: T_C_IN is missing
  else if (T_C_IN === null) {
    T_C_IN = T_C_OUT + m_dot_C * UA;
  }

  // Case 7: UA is missing
  else if (UA === null) {
    UA = (T_H_IN - T_H_OUT) / m_dot_H;
  }

  // Display the results
  result = {
    T_H_OUT: T_H_OUT,
    T_C_OUT: T_C_OUT,
    T_H_IN: T_H_IN,
    T_C_IN: T_C_IN,
    m_dot_H: m_dot_H,
    m_dot_C: m_dot_C,
    UA: UA,
  };

  res.status(SUCCESS.status).send({ result: result, message: SUCCESS.message });
});

app.post("/register", async (req, res) => {
  const { username, name, password } = req.body;
  const user = await User.find({ username: username, password: password });
  if (user.length === 0) {
    const newUser = new User({
      username: username,
      name: name,
      password: password,
    });
    await newUser.save();
    res
      .status(REGISTER_SUCCESS.status)
      .send({ user: user, message: REGISTER_SUCCESS.message });
  } else {
    throw Error(EMAIL_ALREADY_EXIST.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username: username, password: password });
  if (user) {
    res
      .status(LOGIN_SUCCESS.status)
      .send({ user: user, message: LOGIN_SUCCESS.message });
  } else {
    throw Error(UNAUTHORIZED.message);
  }
});

app.use("/welcome", (req, res, next) => {
  req.send("Welcome !");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server started and db connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
