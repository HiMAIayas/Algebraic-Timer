import Timer from "@/components/Timer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-24 px-10 md:px-24 flex flex-col">
      <Timer></Timer>
    </div>
  );
}
