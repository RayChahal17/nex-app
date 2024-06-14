import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import basement1 from '../../assets/services/basement1.jpeg';
import basement2 from '../../assets/services/basement2.jpeg';
import basement3 from '../../assets/services/basement3.jpeg';
import basement4 from '../../assets/services/basement4.jpeg';
import basement5 from '../../assets/services/basement5.jpeg';
import basement6 from '../../assets/services/basement6.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function BasementRenovations() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Basement Renovations"
            Subheading="Maximizing Your Home's Potential"
            SubServicesHeading="Comprehensive Basement Renovation Services"
            SubService1="Custom Basement Designs"
            SubService1Context="Personalized basement designs to transform your space into a functional and stylish area."
            SubService2="High-Quality Materials"
            SubService2Context="Using premium materials to ensure a beautiful and durable basement renovation."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to bring your dream basement to life."
         />

         <ImageLayoutGridComponent
            heading="Impressive Basement Renovation Projects"
            context="Explore our range of basement renovation projects that maximize your home's potential and value."
            image1={basement1}
            image2={basement2}
            image3={basement3}
            image4={basement4}
            title1="Custom Basement Designs"
            description1="Personalized basement designs to transform your space into a functional and stylish area."
            title2="High-Quality Materials"
            description2="Using premium materials to ensure a beautiful and durable basement renovation."
            title3="Professional Installation"
            description3="Expert installation services to bring your dream basement to life."
            title4="Special Projects"
            description4="Unique basement renovation solutions tailored to meet your specific needs and preferences."
         />
         <BookEstimateAppointment/>
      </>
   );
}
