import { useState } from "react";
import "./Homepage.css";
import ReviewSection from "../components/ReviewSection";
import { useTranslation } from "react-i18next";

export default function Homepage() {
  const [selected, setSelected] = useState("1");
  const { t } = useTranslation();

  return (
    <div className="homepage">
      <div className="intro">
        <div className="intro-text">
          <h1>{t("homepage.title")}</h1>
          <h3>{t("homepage.description")}</h3>
        </div>
        <div className="separator" />
        <img src="./src/assets/intro-img.jpg" className="intro-img" />
      </div>

      <div className="material-types">
        <h1
          className={`type ${selected === "1" ? "active" : ""}`}
          onMouseEnter={() => setSelected("1")}
        >
          {t("homepage.material1")}
        </h1>
        <h1
          className={`type ${selected === "2" ? "active" : ""}`}
          onMouseEnter={() => setSelected("2")}
        >
          {t("homepage.material2")}
        </h1>
        <h1
          className={`type ${selected === "3" ? "active" : ""}`}
          onMouseEnter={() => setSelected("3")}
        >
          {t("homepage.material3")}
        </h1>
      </div>
      <div className="material-descriptions">
        {selected === "1" && (
          <div className="description">
            <p>{t("homepage.materialDescription1")}</p>
          </div>
        )}
        {selected === "2" && (
          <div className="description">
            <p>{t("homepage.materialDescription2")}</p>
          </div>
        )}
        {selected === "3" && (
          <div className="description">
            <p>{t("homepage.materialDescription3")}</p>
          </div>
        )}
      </div>

      <ReviewSection />
    </div>
  );
}
