import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import fences1 from '../../assets/services/fences1.jpeg';
import fences4 from '../../assets/services/fences4.jpeg';
import fences7 from '../../assets/services/fences7.jpeg';
import fences11 from '../../assets/services/fences11.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function Fences() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Fences"
            Subheading="Security and Privacy Redefined"
            SubServicesHeading="Comprehensive Fencing Services"
            SubService1="Custom Fence Designs"
            SubService1Context="Bespoke fence designs tailored to your property and style."
            SubService2="Durable Materials"
            SubService2Context="Using high-quality materials to ensure long-lasting fences."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services for secure and reliable fencing."
         />

         <ImageLayoutGridComponent
            heading="Outstanding Fencing Projects"
            context="Discover our range of fencing projects that provide security, privacy, and aesthetic appeal."
            image1={fences1}
            image2={fences7}
            image3={fences11}
            image4={fences4}
            title1="Custom Fence Designs"
            description1="Bespoke fence designs tailored to your property and style."
            title2="Durable Materials"
            description2="Using high-quality materials to ensure long-lasting fences."
            title3="Professional Installation"
            description3="Expert installation services for secure and reliable fencing."
            title4="Special Projects"
            description4="Unique fencing solutions customized to meet your specific requirements."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
