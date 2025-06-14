import { useEffect, useState } from "react";
import Image from "next/image";

const CustomLoader = () => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="animate-pulse">
        <Image src="/image/logo.webp" alt="Logo" width={100} height={100} />
      </div>
      <div className="mt-4 text-lg font-medium text-gray-700">
        Loading{dots}
      </div>
    </div>
  );
};

export default CustomLoader;
