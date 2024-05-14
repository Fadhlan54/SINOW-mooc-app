import { useEffect, useState } from "react";
import PaymentHistoryCard from "../card/PaymentHistoryCard";
import Cookies from "js-cookie";
import { fetchUserTransactions } from "@/services/user.service";
import LoadingScreen from "../loading-animation/LoadingScreen";

export default function PaymentHistory() {
  const token = Cookies.get("token");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      setIsLoading(true);
      try {
        const res = await fetchUserTransactions(token);
        console.log(res);
        setTransactions(res.data.data.transactions);
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
      {isLoading && <LoadingScreen />}
      <h1 className="font-bold text-xl text-center mb-4">Payment History</h1>
      {transactions.length > 0 &&
        transactions.map((transaction) => (
          <>
            <PaymentHistoryCard transaction={transaction} />
          </>
        ))}
    </div>
  );
}
