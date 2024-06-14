import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import a from '../../assets/images/a.jpeg';
import b from '../../assets/images/b.jpeg';
import c from '../../assets/images/c.jpeg';
import d from '../../assets/images/d.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function StoneWalkways() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Stone Walkways"
            Subheading="Pathways to Elegance"
            SubServicesHeading="Premium Stone Walkway Services"
            SubService1="Custom Stone Pathways"
            SubService1Context="Beautiful and functional stone pathways tailored to your landscape."
            SubService2="High-Quality Materials"
            SubService2Context="Using only the best stones to ensure longevity and aesthetic appeal."
            SubService3="Expert Installation"
            SubService3Context="Professional installation services to create perfect walkways."
         />

         <ImageLayoutGridComponent
            heading="Stunning Stone Walkway Projects"
            context="Explore our collection of elegant stone walkway projects that enhance your outdoor space."
            image1={a}
            image2={b}
            image3={c}
            image4={d}
            title1="Custom Stone Pathways"
            description1="Beautiful and functional stone pathways tailored to your landscape."
            title2="High-Quality Materials"
            description2="Using only the best stones to ensure longevity and aesthetic appeal."
            title3="Expert Installation"
            description3="Professional installation services to create perfect walkways."
            title4="Special Projects"
            description4="Unique stone walkway designs to complement your outdoor environment."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
