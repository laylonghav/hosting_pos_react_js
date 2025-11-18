import { useParams } from "react-router-dom";
import MasterLayout from "../../components/layouts/MasterLayout";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchingData = async () => {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/products");
      if (res) {
        setLoading(false);
      }

      const data = await res.json();

      setProduct(data.products);
      console.log(data.products);
    };

    fetchingData();
  }, []);

  const { id } = useParams();

  const findingData = product.find((_, index) => index === Number(id));

  if (loading) {
    return (
      <MasterLayout>
        <p>Data loading...............</p>
      </MasterLayout>
    );
  }
  return (
    <div>
      <p>Product Detail Page</p>
      <p>{findingData?.title}</p>
    </div>
  );
}
