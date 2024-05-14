import { useEffect, useState } from "react";
import PaymentHistoryCard from "../card/PaymentHistoryCard";
import Cookies from "js-cookie";
import { fetchUserTransactions } from "@/services/user.service";

export default function PaymentHistory() {
  const token = Cookies.get("token");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetchUserTransactions(token);
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getCourses();
  }, []);
  return (
    <div>
      <h1 className="font-bold text-xl">Payment History</h1>
      <PaymentHistoryCard />
    </div>
  );
}
