// src/components/TecladoVirtual.jsx
import React from "react";
import "./TecladoVirtual.css";

export default function TecladoVirtual({ onClick, onClear }) {
  const numeros = ["1","2","3","4","5","6","7","8","9","0"];

  return (
    <div className="teclado-container">
      <div className="teclado-grid">
        {numeros.map((num) => (
          <button key={num} onClick={() => onClick(num)}>
            {num}
          </button>
        ))}
      </div>
      <button className="clear-btn" onClick={onClear}>
        Limpar
      </button>
    </div>
  );
}
