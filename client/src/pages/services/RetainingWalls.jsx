import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import retaining1 from '../../assets/services/retaining1.jpeg';
import retaining2 from '../../assets/services/retaining2.jpeg';
import retaining3 from '../../assets/services/retaining3.jpeg';
import retaining4 from '../../assets/services/retaining4.jpeg';


import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function RetainingWalls() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Retaining Walls"
            Subheading="Strength and Beauty Combined"
            SubServicesHeading="Professional Retaining Wall Solutions"
            SubService1="Custom Wall Designs"
            SubService1Context="Tailored retaining wall designs to fit your landscape and preferences."
            SubService2="High-Quality Construction"
            SubService2Context="Durable construction using top-grade materials to ensure stability and longevity."
            SubService3="Repair and Maintenance"
            SubService3Context="Comprehensive repair and maintenance services to keep your retaining walls in perfect condition."
         />

         <ImageLayoutGridComponent
            heading="Impressive Retaining Wall Projects"
            context="View our range of retaining wall projects that combine functionality with aesthetic appeal."
            image1={retaining1}
            image2={retaining2}
            image3={retaining3}
            image4={retaining4}
            title1="Custom Wall Designs"
            description1="Tailored retaining wall designs to fit your landscape and preferences."
            title2="High-Quality Construction"
            description2="Durable construction using top-grade materials to ensure stability and longevity."
            title3="Repair and Maintenance"
            description3="Comprehensive repair and maintenance services to keep your retaining walls in perfect condition."
            title4="Special Projects"
            description4="Unique and specialized retaining wall solutions to enhance your property."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
