import styles from "./Style.module.css";

const Card = ({
  loading,
  title,
  description,
  price,
  images,
  rating,
  availabilityStatus,
  stock,
  onAddToCard,
  onCardClick,
}) => {
  return (
    <div>
      <div className="">
        {loading ? (
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div onClick={onCardClick} className={styles.container}>
              {images && (
                <div className={styles.productImage}>
                  <img
                    className={styles.Image}
                    src={images}
                    alt={`pic ${title}`}
                  />
                </div>
              )}

              <h3 className={styles.title}>{title}</h3>
              <div className={styles.description}>
                <p className={""}>{description}</p>
              </div>

              <div className={styles.bodycard}>
                <p className={styles.price}>{price}</p>|
                <p className={styles.rating}>{rating}</p>|
                <p className={styles.availabilityStatus}>
                  {availabilityStatus}
                </p>
                |<p className={styles.stock}>{stock}</p>
              </div>
              <button className={styles.onAddToCard} onClick={onAddToCard}>
                Detail
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3>relaod data..........</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
