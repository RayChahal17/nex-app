import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import landscaping1 from '../../assets/services/landscaping1.jpeg';
import landscaping2 from '../../assets/services/landscaping2.jpeg';
import landscaping3 from '../../assets/services/landscaping3.jpeg';
import landscaping5 from '../../assets/services/landscaping5.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function CustomLandscapes() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Custom Landscapes"
            Subheading="Creating Your Outdoor Oasis"
            SubServicesHeading="Comprehensive Landscape Design Services"
            SubService1="Custom Landscape Designs"
            SubService1Context="Personalized landscape designs to transform your outdoor space."
            SubService2="High-Quality Materials"
            SubService2Context="Using premium materials for durable and beautiful landscapes."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to bring your landscape vision to life."
         />

         <ImageLayoutGridComponent
            heading="Inspirational Landscape Projects"
            context="Discover our range of custom landscape projects that enhance your outdoor living experience."
            image1={landscaping1}
            image2={landscaping2}
            image3={landscaping3}
            image4={landscaping5}
            title1="Custom Landscape Designs"
            description1="Personalized landscape designs to transform your outdoor space."
            title2="High-Quality Materials"
            description2="Using premium materials for durable and beautiful landscapes."
            title3="Professional Installation"
            description3="Expert installation services to bring your landscape vision to life."
            title4="Special Projects"
            description4="Unique landscape solutions tailored to meet your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
