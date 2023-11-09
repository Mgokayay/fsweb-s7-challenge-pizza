import { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import React from "react";
import { object, string } from "yup";
import ReactLogo from "./logo.svg";

export default function Pizza(props) {
  const [formData, setFormData] = useState({});
  const [hataMesaji, setHataMesaji] = useState("");
  const [pizzaAdet, setPizzaAdet] = useState(1);
  const [pizzaFiyati, setPizzaFiyati] = useState(110);
  const [malzemeFiyati, setMalzemeFiyati] = useState(0);

  const boyutFiyat = {
    small: 110,
    medium: 150,
    large: 190,
  };

  let userSchema = Yup.object({
    boyut: Yup.string().required("Boyut seçmelisiniz"),
    hamur: Yup.string().required("Hamur tipi seçmelisiniz"),
  });

  userSchema = userSchema.test(
    "malzemeSayisi",
    "En az 1 malzeme seçmelisiniz",
    (values) => {
      const selectedMalzemeler = Object.keys(values).filter(
        (key) => key.startsWith("malzeme") && values[key]
      );
      return selectedMalzemeler.length >= 1;
    }
  );

  userSchema = userSchema.test(
    "maxMalzemeSayisi",
    "En fazla 10 malzeme seçebilirsiniz",
    (values) => {
      const selectedMalzemeler = Object.keys(values).filter(
        (key) => key.startsWith("malzeme") && values[key]
      );
      return selectedMalzemeler.length <= 10;
    }
  );

  function changeHandler(e) {
    let { value, type, checked } = e.target;

    if (type === "checkbox") {
      value = checked;
      if (checked) {
        setMalzemeFiyati(malzemeFiyati + 5);
      } else {
        setMalzemeFiyati(malzemeFiyati - 5);
      }
    }

    if (type === "radio") {
      setPizzaFiyati(boyutFiyat[value]);
    }

    const newFormData = {
      ...formData,
      [e.target.name]: value,
    };
    setFormData(newFormData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await userSchema.validate(formData);
    } catch (err) {
      setHataMesaji(err.message);
      return;
    }

    setHataMesaji("");

    axios
      .post("https://reqres.in/api/users", formData)
      .then(function (response) {
        props.addSiparis(response.data);
        window.location.href = "/success";
      })
      .catch(function (error) {
        if (error.message === "Network Error") {
          alert("İnternet bağlantinizi kontrol edin");
        }
      });
  }

  return (
    <div className="pizzaDiv">
      <div className="header">
        <img src={ReactLogo}></img>
      </div>
      <div className="beginning">
        <a href="/">Anasayfa</a>
        <a href="/secenekler">Seçenekler</a>
        <a href="/pizza">Sipariş Oluştur</a>
      </div>

      <main className="main">
        <div className="content content-height">
          <h1 className="baslik">Position Absolute Acı Pizza</h1>
          <div className="top-fiyat">
            <p>{pizzaAdet * (pizzaFiyati + malzemeFiyati)} tl</p>
          </div>
          <p className="aciklama">
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı
            pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli
            diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun
            ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle
            yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan
            kökenli lezzetli bir yemektir.. Küçük bir pizzaya bazen pizzetta
            denir.
          </p>
          <p style={{ color: "#e84a5f" }}>{hataMesaji}</p>
          <form id="pizza-form" onSubmit={handleSubmit}>
            <div className="row first-row">
              <div className="column boyutSec">
                <h2>
                  Boyut Seç <span className="star1">*</span>
                </h2>
                <div className="boyutRow">
                  <div>
                    <input
                      type="radio"
                      id="small"
                      name="boyut"
                      value="small"
                      onChange={changeHandler}
                    />
                    <label htmlFor="small">Küçük</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="medium"
                      name="boyut"
                      value="medium"
                      onChange={changeHandler}
                    />
                    <label htmlFor="medium">Orta</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="large"
                      name="boyut"
                      value="large"
                      onChange={changeHandler}
                    />
                    <label htmlFor="large">Büyük</label>
                  </div>
                </div>
              </div>
              <div className="column">
                <h2>
                  Hamur Seç <span className="star1">*</span>
                </h2>
                <select
                  id="pizza"
                  name="hamur"
                  defaultValue="none"
                  onChange={changeHandler}
                >
                  <option value="none" disabled>
                    Hamur Kalınlığı
                  </option>
                  <option value="ince">İnce</option>
                  <option value="normal">Normal</option>
                  <option value="Kalın">Kalın</option>
                </select>
              </div>
            </div>

            <h2>Ek Malzemeler</h2>

            <h4>En Fazla 10 malzeme seçebilirsiniz. 5tl</h4>
            <div className="row malzemeler">
              {[
                "Pepperoni",
                "Sosis",
                "Kanada Jambonu",
                "Tavuk Izgara",
                "Soğan",
                "Domates",
                "Mısır",
                "Sucuk",
                "Jalepeno",
                "Sarımsak",
                "Biber",
                "Ananas",
                "Kabak",
              ].map((malzeme, index) => (
                <div className="mlzm" key={index}>
                  <input
                    type="checkbox"
                    id={`topping-${malzeme.toLowerCase().replace(" ", "-")}`}
                    name={`malzeme${index + 1}`}
                    value={malzeme.toLowerCase().replace(" ", "-")}
                    onChange={changeHandler}
                  />
                  <label
                    htmlFor={`topping-${malzeme
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {malzeme}
                  </label>
                </div>
              ))}
            </div>

            <label htmlFor="special-text" className="siparisNotu">
              Sipariş Notu
            </label>
            <input
              id="special-text"
              placeholder="Siparişine eklemek istediğin bir not var mı?"
              name="özel"
              onChange={changeHandler}
            />
            <hr className="cizgi" />
            <div className="row ucuncu-row">
              <div className="column">
                <div className="button-group">
                  <button
                    id="pizza-eksi"
                    type="button"
                    onClick={() => {
                      if (pizzaAdet > 1) {
                        setPizzaAdet(pizzaAdet - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    id="pizza-miktar"
                    type="number"
                    name="pizzaAdet"
                    value={pizzaAdet}
                    onChange={changeHandler}
                  />
                  <button
                    id="pizza-arti"
                    type="button"
                    onClick={() => {
                      setPizzaAdet(pizzaAdet + 1);
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="column bottom-column">
                <div>
                  <h1 className="baslik">Sipariş Toplamı</h1>
                  <div className="siparis-toplam">
                    <div className="fiyat-bottom">
                      <p className="secim">Seçimler</p>
                      <p>{malzemeFiyati} tl</p>
                    </div>
                    <div className="fiyat-bottom2">
                      <p className="total-p">Toplam</p>
                      <p className="total-p2">
                        {pizzaAdet * (pizzaFiyati + malzemeFiyati)} tl
                      </p>
                    </div>
                  </div>
                  <div className="siparisbuton">
                    <button id="order-button" type="submit">
                      SİPARİŞ VER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
