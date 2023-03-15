import { useState } from "react";

const AlbumCarousel = ({ albums }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    setActiveIndex((activeIndex - 1 + albums.length) % albums.length);
  };

  const scrollRight = () => {
    setActiveIndex((activeIndex + 1) % albums.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-items">
        {albums.map((album, index) => (
          <div
            key={album.id}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <img src={album.image} alt={album.title} />
            <div className="carousel-title">{album.title}</div>
          </div>
        ))}
      </div>
      <button className="carousel-prev" onClick={scrollLeft}>
        {"<"}
      </button>
      <button className="carousel-next" onClick={scrollRight}>
        {">"}
      </button>
    </div>
  );
};

export default AlbumCarousel;
