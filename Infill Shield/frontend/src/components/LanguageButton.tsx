import { useTranslation } from "react-i18next";

export default function LanguageButton() {
  const { i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="language-button">
      <select onChange={changeLanguage} value={i18n.language}>
        <option value="en">EN</option>
        <option value="pt">PT</option>
      </select>
    </div>
  );
}
