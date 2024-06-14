import React from "react";
import Button from "./MovingBorder";

const MovingBorderComponent = ({ MovingBorderBoxText }) => {
   return (
      <div>
         <Button
            borderRadius="1rem"
            className="bg-slate-200 dark:bg-slate-900 md:text-lg text-xs font-bold text-gray-700 dark:text-white  dark:border-slate-800"
         >
            {MovingBorderBoxText}
         </Button>
      </div>
   );
};

export default MovingBorderComponent;
