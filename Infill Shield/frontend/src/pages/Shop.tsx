import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Shop.css";
import ProductCard from "../components/ProductCard";
import productsData from "../assets/product-list.json";
import ShopFilter from "../components/Shop-Filter";

export default function Shop() {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filterProducts = (filters: {
    searchTerm: string;
    materialFilter: string;
    sortBy: string;
  }) => {
    const { searchTerm, materialFilter, sortBy } = filters;

    const filtered = products
      .filter((product) => {
        const nameMatch = product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const materialMatch =
          materialFilter === "all" ||
          product.material?.toLowerCase() === materialFilter.toLowerCase();
        return nameMatch && materialMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.name.localeCompare(b.name);
          case "price":
            return a.price - b.price;
          default:
            return 0;
        }
      });

    setFilteredProducts(filtered);
  };

  return (
    <div className="shop-container">
      <h1>Shop</h1>
      <div className="shop-filter">
        <div className="shop">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className="link"
            >
              <ProductCard
                key={product.id}
                name={product.name}
                image={product.image}
                description={product.description}
                price={product.price}
              />
            </Link>
          ))}
        </div>
        <ShopFilter onFilterChange={filterProducts} />
      </div>
    </div>
  );
}
