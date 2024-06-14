import React from 'react';
import GlobeComponent from '../components/ui/worldComponent';

const LeftSideGlobeComponent = () => {
   return (
      <div className="flex-1 basis-1/2 md:flex hidden bg-green-400 justify-center items-center">
         <div className="w-full h-full bg-red-400 bg-contain bg-no-repeat bg-center">
            <GlobeComponent />
         </div>
      </div>
   );
};

export default React.memo(LeftSideGlobeComponent);
