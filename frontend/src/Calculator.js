import React, { useState } from "react";
import "./style.css";

const Calculator = () => {
  const [T_H_IN, setT_H_IN] = useState();
  const [T_H_OUT, setT_H_OUT] = useState();
  const [T_C_IN, setT_C_IN] = useState();
  const [T_C_OUT, setT_C_OUT] = useState();
  const [m_dot_H, set_m_dot_H] = useState();
  const [m_dot_C, set_m_dot_C] = useState();
  const [UA, set_UA] = useState();
  const calculate = () => {
    const formData = {
      T_H_IN: T_H_IN,
      T_C_IN: T_C_IN,
      m_dot_H: m_dot_H,
      m_dot_C: m_dot_C,
      UA: UA,
    };

    fetch("https://progillesx.onrender.com/calculate_unknowns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setT_H_OUT(data.T_H_OUT);
        setT_C_OUT(data.T_C_OUT);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div>
      <h1>Heat Exchanger Calculator</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label for="T_H_IN">T_H_IN:</label>
        <input
          type="number"
          id="T_H_IN"
          step="0.1"
          onChange={(e) => {
            setT_H_IN(e.target.value);
          }}
          required
        />
        <br />

        <label for="T_C_IN">T_C_IN:</label>
        <input
          type="number"
          id="T_C_IN"
          step="0.1"
          onChange={(e) => {
            setT_C_IN(e.target.value);
          }}
          required
        />
        <br />

        <label for="m_dot_H">m_dot_H:</label>
        <input
          type="number"
          id="m_dot_H"
          step="0.1"
          onChange={(e) => {
            set_m_dot_H(e.target.value);
          }}
          required
        />
        <br />

        <label for="m_dot_C">m_dot_C:</label>
        <input
          type="number"
          id="m_dot_C"
          step="0.1"
          onChange={(e) => {
            set_m_dot_C(e.target.value);
          }}
          required
        />
        <br />

        <label for="UA">UA:</label>
        <input
          type="number"
          id="UA"
          step="0.1"
          onChange={(e) => {
            set_UA(e.target.value);
          }}
          required
        />
        <br />

        <button type="button" onClick={calculate()}>
          Calculate
        </button>
      </form>

      <h2>Results:</h2>
      <p>T_H_OUT: {T_H_OUT}</p>
      <p>T_C_OUT: {T_C_OUT}</p>
    </div>
  );
};

export default Calculator;
