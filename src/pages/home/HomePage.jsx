import { useEffect, useState } from "react";
import MasterLayout from "../../components/layouts/MasterLayout";
import Card from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { motion } from "framer-motion";

export default function HomePage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  if (!user || !user.username) {
    navigate("/auth/login");
  }

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(false);
      const res = await fetch("https://dummyjson.com/products");
      if (res) {
        setLoading(true);
      }

      const data = await res.json();

      setProduct(data.products);
      console.log(data.products);
    };

    fetchingData();
  }, []);

  const onAddToCard = (itemAddToCart) => {
    console.log(`item add to card : ${JSON.stringify(itemAddToCart)}`);

    navigate(`/product/${itemAddToCart}`);
  };

  const boxVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <h1>{user?.username}</h1>

      <button onClick={() => dispatch(logout())}>Logout</button>
      <p className="text-red-600">Home Page</p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Hello, Framer Motion!
      </motion.div>

      <motion.div variants={boxVariants} initial="hidden" animate="visible">
        Hello
      </motion.div>

      <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
        Hover & Click Me
      </motion.button>

      {/* <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {product.map((item, index) => {
          return (
            <Card
              key={index}
              loading={loading}
              price={item.price}
              description={item.description}
              rating={item.rating}
              images={item.images}
              availabilityStatus={item.availabilityStatus}
              title={item.title}
              stock={item.stock}
              onAddToCard={() => onAddToCard(index)}
            />
          );
        })}
      </div> */}
    </div>
  );
}
