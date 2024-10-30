import Home from "@/components/layout/home/Home";
import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/secure-data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen flex-center bg-neutral-700 text-white flex-col gap-10">
      <h1 className="font-bold text-4xl">Secure Data</h1>
      <pre className="text-2xl">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default function HomePage() {
  return <Test />;
}
