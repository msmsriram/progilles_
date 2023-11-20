const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.post("/calculate_unknowns", (req, res) => {
  const c_p_h = 2,
    c_p_C = 1;
  const { T_H_IN, T_C_IN, m_dot_H, m_dot_C, UA } = req.body;

  let T_H_OUT = 0;
  let T_C_OUT = 0;

  // Calculate temperature differences
  const DeltaT_H = T_H_IN - T_H_OUT;
  const DeltaT_C = T_C_OUT - T_C_IN;

  // Calculate heat transfer rates
  const Q_H = m_dot_H * c_p_h * DeltaT_H;
  const Q_C = m_dot_C * c_p_C * DeltaT_C;

  // Check if UA is sufficient for heat transfer
  if (UA <= 0) {
    throw new Error("Error: Insufficient data");
  }
  if (Q_H <= 0) {
    throw new Error("Error: Insufficient data");
  }
  if (Q_C >= 0) {
    throw new Error("Error: Insufficient data");
  }

  // Calculate log mean temperature difference
  const T_D_1 = T_H_IN - T_C_OUT;
  const T_D_2 = T_H_OUT - T_C_IN;

  // Ensure positive logarithmic argument
  const smallValue = 1e-10;
  const LMTD = Math.abs(
    (T_D_1 - T_D_2) /
      Math.log((Math.abs(T_D_1) + smallValue) / (Math.abs(T_D_2) + smallValue))
  );

  // Calculate overall heat transfer
  const Q_LMTD = UA * LMTD;

  // Solve for the unknowns
  T_H_OUT = T_H_IN - Q_H / (m_dot_H * c_p_h);
  T_C_OUT = T_C_IN - Q_C / (m_dot_C * c_p_C);

  res.send(200, { T_H_OUT, T_C_OUT });
});

app.listen(8002, () => {
  console.log("server started");
});
