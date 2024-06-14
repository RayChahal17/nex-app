import React from "react";
import InfiniteCards from "./InfiniteCards";

const testimonials = [
   {
      quote: 
         "The team did an incredible job transforming our backyard with a stunning new patio. Their attention to detail and commitment to quality is evident in every aspect of the project. Highly recommended!",
      name: "John Mitchell",
      title: "Burlington",
   },
   {
      quote: 
         "Our driveway renovation was seamless from start to finish. The crew was professional, efficient, and the final result exceeded our expectations. We couldn't be happier!",
      name: "Sarah Thompson",
      title: "Oakville",
   },
   {
      quote: 
         "From the initial consultation to the completed project, the experience was outstanding. The team provided excellent recommendations and executed the plan flawlessly. Our new concrete steps look amazing!",
      name: "Emily Davis",
      title: "St. Catharines",
   },
   {
      quote: 
         "The quality of work and level of service provided were top-notch. The team was punctual, courteous, and ensured that every detail was perfect. Our new patio is the highlight of our home.",
      name: "Michael Smith",
      title: "Brantford",
   },
   {
      quote: 
         "We were impressed with the professionalism and expertise of the team. They delivered a high-quality product on time and within budget. Our backyard has been completely transformed!",
      name: "Amanda Lee",
      title: "Grimsby",
   },
   {
      quote: 
         "The team went above and beyond to ensure our satisfaction. The craftsmanship is superb, and the new concrete walkway has greatly improved the curb appeal of our home. Highly recommend their services!",
      name: "Chris Brown",
      title: "Dundas",
   },
   {
      quote: 
         "Our experience with the company was fantastic. They were attentive to our needs and provided valuable insights throughout the project. The end result is a beautiful and functional patio that we love.",
      name: "Natalie White",
      title: "Ancaster",
   },
   {
      quote: 
         "Exceptional service and workmanship! The team was friendly, professional, and completed the project ahead of schedule. Our new driveway looks fantastic and has greatly enhanced our property's value.",
      name: "David Johnson",
      title: "Caledonia",
   },
   {
      quote: 
         "We couldn't be happier with the outcome of our patio project. The team demonstrated great skill and precision, and the final product is both beautiful and durable. We highly recommend their services!",
      name: "Laura Martinez",
      title: "Cayuga",
   },
   {
      quote: 
         "The entire process was smooth and stress-free. The team was professional, knowledgeable, and delivered exceptional results. Our new concrete steps are both functional and visually appealing.",
      name: "Jason Wilson",
      title: "Dunnville",
   },
   {
      quote: 
         "Fantastic job on our driveway! The team was efficient, professional, and their attention to detail was impressive. We are thrilled with the results and would highly recommend them to others.",
      name: "Mike Taylor",
      title: "Fort Erie",
   },
   {
      quote: 
         "Our experience was nothing short of excellent. The team was responsive, attentive, and ensured that our vision was brought to life. The new patio is perfect for entertaining and has added value to our home.",
      name: "Karen King",
      title: "Port Colborne",
   },
   {
      quote: 
         "We were impressed with the level of professionalism and quality of work provided. The team was courteous, efficient, and delivered a beautiful new walkway that has greatly improved our outdoor space.",
      name: "Lisa Parker",
      title: "Niagara Falls",
   },
   {
      quote: 
         "The team did an outstanding job on our patio. Their expertise and attention to detail were evident throughout the project. We couldn't be happier with the final result and highly recommend their services.",
      name: "Tom Harris",
      title: "Welland",
   },
   {
      quote: 
         "Our new concrete steps are a work of art! The team was professional, meticulous, and delivered a product that exceeded our expectations. We are extremely satisfied and would recommend them to anyone.",
      name: "Megan Hall",
      title: "Vineland",
   },
   {
      quote: 
         "We were blown away by the quality and craftsmanship of the team. They were attentive, professional, and ensured that every detail was perfect. Our new patio has become our favorite spot in the house.",
      name: "Alex Turner",
      title: "Burlington",
   },
   {
      quote: 
         "The team was fantastic to work with from start to finish. They provided excellent recommendations and executed the project flawlessly. Our driveway has never looked better, and we couldn't be more pleased.",
      name: "Olivia Scott",
      title: "Oakville",
   },
   {
      quote: 
         "Professional, efficient, and highly skilled. The team delivered a top-quality product that has transformed our outdoor space. We highly recommend their services to anyone in need of concrete work.",
      name: "Jake Lopez",
      title: "St. Catharines",
   },
   {
      quote: 
         "The craftsmanship and attention to detail were exceptional. The team was professional, courteous, and completed the project on time. Our new concrete walkway is beautiful and functional.",
      name: "Sophie Green",
      title: "Brantford",
   },
   {
      quote: 
         "We couldn't be happier with the service and quality of work provided. The team was responsive, professional, and delivered a product that exceeded our expectations. Our new patio is simply stunning!",
      name: "Daniel Adams",
      title: "Grimsby",
   },
];


const InfiniteCardsComponent = () => {
   return (
      <div className="min-h-[25rem] h-auto  rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] pb-20 md:w-full items-center justify-center relative overflow-hidden">
         <InfiniteCards
            items={testimonials}
            direction="right"
            speed="slow"
         />
      </div>
   );
};

export default InfiniteCardsComponent;
