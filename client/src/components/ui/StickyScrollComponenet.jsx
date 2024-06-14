import React from "react";
import { cn } from "../../utils/cn"; // Ensure this utility is correctly set up in your React project
import { StickyScroll } from "./StickyScroll";

export default function StickyScrollComponent({ stImg1, stImg2, stImg3, stImg4, t1, t2, t3, t4, t5, d1, d2, d3, d4, d5 }) {
   const content = [
      {
         title: t1,
         description: d1,
         content: (
            <div className={cn("h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white")}>
               <img
                  src={stImg1}
                  width={300}
                  height={300}
                  className={cn("h-full w-full object-cover")}
                  alt="linear board demo"
               />
            </div>
         ),
      },
      {
         title: t2,
         description: d2,
         content: (
            <div className={cn("h-full w-full flex items-center justify-center text-white")}>
               <img
                  src={stImg2}
                  width={300}
                  height={300}
                  className={cn("h-full w-full object-cover")}
                  alt="linear board demo"
               />
            </div>
         ),
      },
      {
         title: t3,
         description: d3,
         content: (
            <div className={cn("h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white")}>
               <img
                  src={stImg3}
                  width={300}
                  height={300}
                  className={cn("h-full w-full object-cover")}
                  alt="linear board demo"
               />
            </div>
         ),
      },
      {
         title: t4,
         description: d4,
         content: (
            <div className={cn("h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white")}>
               <img
                  src={stImg4}
                  width={300}
                  height={300}
                  className={cn("h-full w-full object-cover")}
                  alt="linear board demo"
               />
            </div>
         ),
      },
       {
         title: t5,
         description: d5,
         content: (
            <div className={cn("h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white")}>
               <img
                  src={stImg4}
                  width={300}
                  height={300}
                  className={cn("h-full w-full object-cover")}
                  alt="linear board demo"
               />
            </div>
         ),
      },
   ];

   return (
      <div>
         <StickyScroll content={content} />
      </div>
   );
}
