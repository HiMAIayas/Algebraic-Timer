import Timer from "@/components/Timer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="py-24 px-10 md:px-24 flex flex-col">
      <Timer></Timer>
      <div className="flex justify-center">
        <div className="w-[800px]">
          Algebraic Timer is a countdown timer where you can provide time function f(t).
          The time at the input will be used as the real timing but the time displayed is depend on the function.
          Display time will be calculated by f(n) - f(t) where n is the countdown time (in seconds) and t is time elapsed (in seconds).
          This is to make sure the timer stops at 00:00:00.
          For example,
          <br></br><br></br>
          (1) The function is f(t) = 2t, countdown in 3 minutes, f(n) is equal to 2*180 seconds = 360 seconds
          and time is twice as fast. At t=60 seconds, it will display 360-2*60 = 240 seconds.
          <br></br><br></br>
          (2) f(t) = t^2, countdown in 3 minutes, f(n) will be equal to 180^2 seconds = 32400 seconds
          and time is faster exponentially. At t=60 seconds, it will display 32400-3600 = 28800 seconds.
          <br></br><br></br>
          This program can handle polynomial, trigonometric, logarithmic, and reciprocal functions.
          <br></br><br></br>
          Function keywords: sin, cos, tan, cosec, sec, cot
        </div>
      </div>
    </div>
  );
}
