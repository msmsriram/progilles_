import React, { useState } from "react";
import "./style.css";
import { SUCCESS } from "./Utils/constants";

const Calculator = () => {
  const [T_H_IN, setT_H_IN] = useState(NaN);
  const [T_H_OUT, setT_H_OUT] = useState(NaN);
  const [T_C_IN, setT_C_IN] = useState(NaN);
  const [T_C_OUT, setT_C_OUT] = useState(NaN);
  const [m_dot_H, set_m_dot_H] = useState(NaN);
  const [m_dot_C, set_m_dot_C] = useState(NaN);
  const [UA, set_UA] = useState();

  const calculate = async (event) => {
    event.preventDefault();
    const formData = {
      T_H_OUT: T_H_OUT,
      T_H_IN: T_H_IN,
      T_C_OUT: T_C_OUT,
      T_C_IN: T_C_IN,
      m_dot_H: m_dot_H,
      m_dot_C: m_dot_C,
      UA: UA,
    };
    try {
      await fetch("http://localhost:5000/calculate_unknowns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then(async (response) => {
        const res = await response.json();
        setT_H_OUT(res.result.T_H_OUT);
        setT_H_IN(res.result.T_H_IN);
        setT_C_OUT(res.result.T_C_OUT);
        setT_C_IN(res.result.T_C_IN);
        set_m_dot_H(res.result.m_dot_H);
        set_m_dot_C(res.result.m_dot_C);
        set_UA(res.result.UA);
      });
    } catch (err) {
      const error = err;
      error.message = err.response.data?.message;
      throw error;
    }
  };
  return (
    <div>
      <h1>Heat Exchanger Calculator</h1>

      <form>
        <label for="T_H_IN">T_H_IN:</label>
        <input
          type="number"
          id="T_H_IN"
          step="0.1"
          onChange={(e) => {
            setT_H_IN(e.target.value);
          }}
          value={T_H_IN}
          required
        />
        <br />

        <label for="T_H_OUT">T_H_OUT:</label>
        <input
          type="number"
          id="T_H_OUT"
          step="0.1"
          onChange={(e) => {
            setT_H_OUT(e.target.value);
          }}
          value={T_H_OUT}
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
          value={T_C_IN}
          required
        />
        <br />

        <label for="T_C_OUT">T_C_OUT:</label>
        <input
          type="number"
          id="T_C_OUT"
          step="0.1"
          onChange={(e) => {
            setT_C_OUT(e.target.value);
          }}
          value={T_C_OUT}
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
          value={m_dot_H}
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
          value={m_dot_C}
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
          value={UA}
          required
        />
        <br />

        <button type="button" onClick={calculate}>
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculator;
