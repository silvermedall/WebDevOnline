import "./ProductCard.css";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
  price: number;
}

export default function ProductCard({
  name,
  image,
  description,
  price,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={image} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <button className="add-to-cart">Add to Cart</button>
      <p className="product-price">{price}€</p>
    </div>
  );
}
