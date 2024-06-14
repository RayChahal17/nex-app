import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import kitchen1 from '../../assets/services/kitchen1.jpeg';
import kitchen2 from '../../assets/services/kitchen2.jpeg';
import kitchen3 from '../../assets/services/kitchen3.jpeg';
import kitchen7 from '../../assets/services/kitchen7.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function KitchenRenovations() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Kitchen Renovations"
            Subheading="Transforming Your Cooking Space"
            SubServicesHeading="Expert Kitchen Renovation Services"
            SubService1="Custom Kitchen Designs"
            SubService1Context="Personalized kitchen designs to suit your taste and functionality needs."
            SubService2="High-Quality Materials"
            SubService2Context="Using premium materials for a beautiful and durable kitchen."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to bring your dream kitchen to life."
         />

         <ImageLayoutGridComponent
            heading="Inspirational Kitchen Renovation Projects"
            context="Explore our portfolio of stunning kitchen renovation projects that combine style and practicality."
            image1={kitchen1}
            image2={kitchen2}
            image3={kitchen7}
            image4={kitchen3}
            title1="Custom Kitchen Designs"
            description1="Personalized kitchen designs to suit your taste and functionality needs."
            title2="High-Quality Materials"
            description2="Using premium materials for a beautiful and durable kitchen."
            title3="Professional Installation"
            description3="Expert installation services to bring your dream kitchen to life."
            title4="Special Projects"
            description4="Innovative kitchen renovation solutions tailored to your specific requirements."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
