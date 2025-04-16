import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <div className="footer">
      <div className="socials">
        <ul className="wrapper">
          <li className="icon facebook">
            <span className="tooltip">Facebook</span>
            <img src="./src/assets/facebook.svg" alt="Facebook" />
          </li>
          {/*           <li className="icon twitter">
            <span className="tooltip">Twitter</span>
            <img src="./src/assets/twitter.svg" alt="Twitter" />
          </li> */}
          <li className="icon instagram">
            <Link to="https://www.instagram.com/infill.shield/" target="_blank">
              <span className="tooltip">Instagram</span>
              <img src="./src/assets/instagram.svg" alt="Instagram" />
            </Link>
          </li>
        </ul>
      </div>
      <p className="copyright">
        &copy; 2025 Infill Shield. All rights reserved.
      </p>
      <p>
        {t("footer.contactInfo")}:
        <br />
        {t("footer.email")}: gaioleiro@gsexy.pt
        <br />
        {t("footer.phone")}: 9177tiratira
      </p>
    </div>
  );
}
