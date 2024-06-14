import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import bath2 from '../../assets/services/bath2.jpeg';
import bath3 from '../../assets/services/bath3.jpeg';
import bath4 from '../../assets/services/bath4.jpeg';
import bath5 from '../../assets/services/bath5.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function BathroomRenovations() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Bathroom Renovations"
            Subheading="Luxury and Comfort Redefined"
            SubServicesHeading="Expert Bathroom Renovation Services"
            SubService1="Custom Bathroom Designs"
            SubService1Context="Personalized bathroom designs to create your ideal sanctuary."
            SubService2="High-Quality Materials"
            SubService2Context="Using premium materials for a luxurious and durable bathroom."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to ensure your bathroom renovation is flawless."
         />

         <ImageLayoutGridComponent
            heading="Beautiful Bathroom Renovation Projects"
            context="Explore our portfolio of stunning bathroom renovation projects that combine luxury and comfort."
            image1={bath5}
            image2={bath2}
            image3={bath3}
            image4={bath4}
            title1="Custom Bathroom Designs"
            description1="Personalized bathroom designs to create your ideal sanctuary."
            title2="High-Quality Materials"
            description2="Using premium materials for a luxurious and durable bathroom."
            title3="Professional Installation"
            description3="Expert installation services to ensure your bathroom renovation is flawless."
            title4="Special Projects"
            description4="Unique bathroom renovation solutions tailored to your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
