import React from "react";
import ReactLogo from "./logo.svg";

export default function Success() {
  return (
    <div className="success">
      <div className="header-success">
        <img src={ReactLogo}></img>
      </div>
      <p className="tebrik">TEBRIKLER!</p>
      <h1 className="alindi">SİPARİŞİNİZ ALINDI!</h1>
    </div>
  );
}
