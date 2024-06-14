import React from "react";
import CardStack from "./CardStack";

const Highlight = ({ children, className }) => {
   return (
      <span
         className={`font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5 ${className}`}
      >
         {children}
      </span>
   );
};

const CARDS = [
   {
      id: 0,
      name: "John Mitchell",
      designation: "Burlington",
      content: (
         <p>
            Exceptional service and quality craftsmanship! <Highlight>Our patio has never looked better.</Highlight> 🌟
         </p>
      ),
   },
   {
      id: 1,
      name: "Sarah Thompson",
      designation: "Oakville",
      content: (
         <p>
            The precision and attention to detail in their work are <Highlight>truly unmatched.</Highlight> 👌
         </p>
      ),
   },
   {
      id: 2,
      name: "Emily Davis",
      designation: "St. Catharines",
      content: (
         <p>
            A seamless blend of innovation and reliability. <Highlight>Highly recommend for any concrete project.</Highlight> 👍
         </p>
      ),
   },
   {
      id: 3,
      name: "Michael Smith",
      designation: "Brantford",
      content: (
         <p>
            Their expertise transformed our backyard into a <Highlight>beautiful outdoor space.</Highlight> 🌳
         </p>
      ),
   },
   {
      id: 4,
      name: "Amanda Lee",
      designation: "Grimsby",
      content: (
         <p>
            Professional and efficient. <Highlight>The team exceeded our expectations.</Highlight> 🚀
         </p>
      ),
   },
   {
      id: 5,
      name: "Chris Brown",
      designation: "Dundas",
      content: (
         <p>
            Great job on the new driveway! <Highlight>Looks fantastic and was done on time.</Highlight> ⏰
         </p>
      ),
   },
   {
      id: 6,
      name: "Natalie White",
      designation: "Ancaster",
      content: (
         <p>
            Impressed with their innovative approach and <Highlight>excellent customer service.</Highlight> 🤝
         </p>
      ),
   },
   {
      id: 7,
      name: "David Johnson",
      designation: "Caledonia",
      content: (
         <p>
            The crew was friendly and did a <Highlight>wonderful job on our patio.</Highlight> 😃
         </p>
      ),
   },
   {
      id: 8,
      name: "Laura Martinez",
      designation: "Cayuga",
      content: (
         <p>
            Top-notch service and quality. <Highlight>Our walkway turned out perfect!</Highlight> 👏
         </p>
      ),
   },
   {
      id: 9,
      name: "Jason Wilson",
      designation: "Dunnville",
      content: (
         <p>
            Very satisfied with their work. <Highlight>Our new concrete steps are sturdy and stylish.</Highlight> 💪
         </p>
      ),
   },
   {
      id: 10,
      name: "Mike Taylor",
      designation: "Fort Erie",
      content: (
         <p>
            These guys rock! <Highlight>Our new patio is the talk of the neighborhood.</Highlight> 🎉
         </p>
      ),
   },
   {
      id: 11,
      name: "Karen King",
      designation: "Port Colborne",
      content: (
         <p>
            Super happy with the job they did on our driveway. <Highlight>Totally recommend them!</Highlight> 🙌
         </p>
      ),
   },
   {
      id: 12,
      name: "Lisa Parker",
      designation: "Niagara Falls",
      content: (
         <p>
            Fast, friendly, and fantastic results. <Highlight>Love our new walkway!</Highlight> 🚶‍♂️
         </p>
      ),
   },
   {
      id: 13,
      name: "Tom Harris",
      designation: "Welland",
      content: (
         <p>
            Great work and awesome team. <Highlight>Patio looks amazing!</Highlight> 🌺
         </p>
      ),
   },
   {
      id: 14,
      name: "Megan Hall",
      designation: "Vineland",
      content: (
         <p>
            Couldn't be happier with the job they did. <Highlight>Highly recommend!</Highlight> 😍
         </p>
      ),
   },
   {
      id: 15,
      name: "Alex Turner",
      designation: "Burlington",
      content: (
         <p>
            Concrete has never been so cool! <Highlight>These folks know their stuff.</Highlight> 😎
         </p>
      ),
   },
   {
      id: 16,
      name: "Olivia Scott",
      designation: "Oakville",
      content: (
         <p>
            Our patio parties just got a major upgrade <Highlight>thanks to these pros!</Highlight> 🍔🎉
         </p>
      ),
   },
   {
      id: 17,
      name: "Jake Lopez",
      designation: "St. Catharines",
      content: (
         <p>
            From dull to dazzling! <Highlight>They transformed our backyard into an oasis.</Highlight> 🏝️
         </p>
      ),
   },
   {
      id: 18,
      name: "Sophie Green",
      designation: "Brantford",
      content: (
         <p>
            Concrete magic! <Highlight>Our driveway is now a work of art.</Highlight> 🎨
         </p>
      ),
   },
   {
      id: 19,
      name: "Daniel Adams",
      designation: "Grimsby",
      content: (
         <p>
            Not just concrete, it's an experience! <Highlight>Love the new patio.</Highlight> 🏡
         </p>
      ),
   },
];


const CardStackComponent = () => {
   return (
      <div className=" flex self-center items-center justify-center ">
         <CardStack items={CARDS} />
      </div>
   );
};

export default CardStackComponent;
