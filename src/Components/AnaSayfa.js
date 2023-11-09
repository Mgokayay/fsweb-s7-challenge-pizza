import React from "react";
import "../App.css" 
import ReactLogo from "./logo.svg"


export default function Anasayfa() {
    return (
        <div className="anasayfa">
            <div className="topDiv">
                <div className="description">
                <div className="header-anasayfa">
                <img src={ReactLogo}></img>
            </div>
            <p className="firsat"> fırsatı kaçırma</p>
                    <p className="slogan">KOD ACIKTIRIR <br></br> PIZZA DOYURUR</p>
                    
                    <div className="mt">
                        <a className="order-button" type="button" href="/pizza">
                            ACIKTIM
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
} 

