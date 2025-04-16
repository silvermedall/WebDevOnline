import { Outlet, Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function Navlink() {
  const { t } = useTranslation();

  return (
    <div className="navlink">
      <Link to="/" className="link">
        {t("nav.homePage")}
      </Link>
      <Link to="/shop" className="link">
        {t("nav.shop")}
      </Link>
      <Link to="/custom" className="link">
        {t("nav.customOrders")}
      </Link>

      <Outlet />
    </div>
  );
}
