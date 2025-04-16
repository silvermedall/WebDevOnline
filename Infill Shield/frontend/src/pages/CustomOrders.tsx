import "./CustomOrders.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function CustomOrders() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [description, setDescription] = useState("");
  const [materialType, setMaterialType] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !contactInfo || quantity <= 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("contactInfo", contactInfo);
    formData.append("description", description);
    formData.append("materialType", materialType);
    formData.append("quantity", quantity.toString());
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch(
        "https://backend-e8fd.onrender.com/submit-order",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Order ID:", result.id);
      alert(result.message || "Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting the order.");
    }
  };
  return (
    <div className="custom-orders">
      <h1>{t("customOrders.title")}</h1>
      <form className="custom-order-form" onSubmit={handleSubmit}>
        <label htmlFor="Name">{t("customOrders.name")}</label>
        <input
          type="text"
          id="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>

        <label htmlFor="ContactInfo">{t("customOrders.contactInfo")}</label>
        <input
          type="text"
          id="ContactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        ></input>

        <label htmlFor="OptionalDescription">
          {t("customOrders.description")}
        </label>
        <textarea
          id="OptionalDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="side-by-side">
          <div className="form-group">
            <label htmlFor="MaterialType">
              {t("customOrders.materialType")}
            </label>
            <select
              id="MaterialType"
              value={materialType}
              onChange={(e) => setMaterialType(e.target.value)}
            >
              <option value="PLA">{t("customOrders.material1")}</option>
              <option value="ABS">{t("customOrders.material2")}</option>
              <option value="Resin">{t("customOrders.material3")}</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Quantity">{t("customOrders.quantity")}</label>
            <input
              type="number"
              id="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              required
            ></input>
          </div>
        </div>

        <label htmlFor="ProductFile">{t("customOrders.file")}</label>
        <input
          type="file"
          id="ProductFile"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        ></input>

        <button type="submit" onClick={handleSubmit}>
          {t("customOrders.submit")}
        </button>
      </form>
    </div>
  );
}
