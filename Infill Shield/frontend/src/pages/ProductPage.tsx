import "./ProductPage.css";
import { useParams } from "react-router-dom";
import productsData from "../assets/product-list.json";

export default function ProductPage() {
  const { productId } = useParams();

  const product = productsData.find(
    (p) => p.id === parseInt(productId as string)
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-page">
      <img src={product.image} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <button className="add-to-cart">Add to Cart</button>
        <p className="product-price">{product.price}€</p>
      </div>
    </div>
  );
}
