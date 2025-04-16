import { useState, useEffect } from "react";
import "./ReviewSection.css";

const reviews = [
  {
    name: "Carlos Pinto",
    rating: 3.5,
    comment: "My ass broke the dildo, terrible printing quality",
  },
  {
    name: "Long Dong Zhong",
    rating: 4.2,
    comment: "Automated bee misery. Finally.",
  },
  {
    name: "Moe Lester",
    rating: 2.5,
    comment: "Bees are now data points. And they're judging me.",
  },
];

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="review-section">
      <div className={`review-content ${fade ? "fade-in" : "fade-out"}`}>
        <h3>{reviews[currentIndex].name}</h3>
        <p>{reviews[currentIndex].comment}</p>
        <div className="stars">{"⭐".repeat(reviews[currentIndex].rating)}</div>
      </div>
    </div>
  );
}
