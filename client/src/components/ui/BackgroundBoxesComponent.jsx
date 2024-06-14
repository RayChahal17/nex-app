import React from "react";
import { BackgroundBoxes } from "./BackgroundBoxes";

function cn(...classes) {
   return classes.filter(Boolean).join(' ');
}

export function BackgroundBoxesComponent() {
   return (
      <div className="h-[60vh] md:h-[80vh] relative w-full md:px-0 px-10  overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
         <div className="absolute inset-0 w-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
         <BackgroundBoxes />
         <h1 className={cn("md:text-7xl text-xl text-green-600 relative z-20")}>
         Innovate. Renovate. Elevate.
         </h1>
         <p className="text-center mt-2 relative z-20 md:text-2xl text-green-300">
         "Bringing Your Vision to Life with Expert Craftsmanship and Innovative Solutions"
         </p>
         <p className="text-center mt-2 relative z-20 md:text-1xl text-green-100">
            <a href="tel:+16478352021" className="hover:underline">
               Call Us Today at <span className="text-green-500 hover:underline"> (647) 835-2021</span>
            </a>
         </p>
      </div>
   );
}

// Export as default
export default BackgroundBoxesComponent;
