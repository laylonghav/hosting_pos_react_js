import { useEffect, useState } from "react";
import { request } from "@/util/request/request";
import PuchaseChart from "@/components/chart/PuchaseChart";
import SaleChart from "@/components/chart/SaleChart";
import SaleThisMonthChart from "@/components/chart/SaleThisMonthChart";

export default function HomeAdminPage() {
  const [purchase, setPurchase] = useState([]);
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchingData = async () => {
    setLoading(false);
    const res = await request("purchase", "get");
    const sale = await request("order/getsale", "get");
    if (sale) {
      setSale(sale);
      setLoading(true);
    }
    if (res) {
      setLoading(true);
      setPurchase(res?.data);
      console.log(res?.data);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div>
      <PuchaseChart data={purchase} />
      <SaleChart data={sale} />
      <SaleThisMonthChart data={sale.sale_this_month} />
    </div>
  );
}
