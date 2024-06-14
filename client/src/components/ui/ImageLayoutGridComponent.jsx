import React from 'react';
import ImageLayoutGrid from './ImageLayoutGrid';
import { Button } from 'flowbite-react';

const Skeleton1 = ({ title, description }) => {
   return (
      <div>
         <p className="font-bold text-4xl text-white">{title}</p>
         <p className="font-normal text-base text-white"></p>
         <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {description}
         </p>
      </div>
   );
};

const Skeleton2 = ({ title, description }) => {
   return (
      <div>
         <p className="font-bold text-4xl text-white">{title}</p>
         <p className="font-normal text-base text-white"></p>
         <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {description}
         </p>
      </div>
   );
};

const Skeleton3 = ({ title, description }) => {
   return (
      <div>
         <p className="font-bold text-4xl text-white">{title}</p>
         <p className="font-normal text-base text-white"></p>
         <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {description}
         </p>
      </div>
   );
};

const Skeleton4 = ({ title, description }) => {
   return (
      <div>
         <p className="font-bold text-4xl text-white">{title}</p>
         <p className="font-normal text-base text-white"></p>
         <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
            {description}
         </p>
      </div>
   );
};

export default function ImageLayoutGridComponent({
   heading,
   context,
   image1,
   image2,
   image3,
   image4,
   title1,
   description1,
   title2,
   description2,
   title3,
   description3,
   title4,
   description4,
}) {
   const cards = [
      {
         id: 1,
         content: <Skeleton1 title={title1} description={description1} />,
         className: 'md:col-span-2',
         thumbnail: image1,
      },
      {
         id: 2,
         content: <Skeleton2 title={title2} description={description2} />,
         className: 'col-span-1',
         thumbnail: image2,
      },
      {
         id: 3,
         content: <Skeleton3 title={title3} description={description3} />,
         className: 'col-span-1',
         thumbnail: image3,
      },
      {
         id: 4,
         content: <Skeleton4 title={title4} description={description4} />,
         className: 'md:col-span-2',
         thumbnail: image4,
      },
   ];

   return (
      <div className="py-20 w-full min-h-screen">
         <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-gray-800 mb-4">{heading}</h2>
            <p className="text-xl text-gray-600">{context}.</p>
         </div>
         <ImageLayoutGrid cards={cards} />
         <div className="text-center mt-8 flex justify-center items-center">
            <Button href="/gallery" className="flex-1/2 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
               View More Projects
            </Button>
         </div>
      </div>
   );
}
