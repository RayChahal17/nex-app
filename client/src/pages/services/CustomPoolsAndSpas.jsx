import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import a from '../../assets/images/a.jpeg';
import b from '../../assets/images/b.jpeg';
import c from '../../assets/images/c.jpeg';
import d from '../../assets/images/d.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function CustomPoolsAndSpas() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Custom Pools & Spas"
            Subheading="Luxury and Relaxation Combined"
            SubServicesHeading="Expert Pool and Spa Design Services"
            SubService1="Custom Pool Designs"
            SubService1Context="Tailored pool designs to create your perfect backyard oasis."
            SubService2="High-Quality Materials"
            SubService2Context="Using top-grade materials for durable and beautiful pools and spas."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to ensure your pool and spa are built to last."
         />

         <ImageLayoutGridComponent
            heading="Stunning Pool and Spa Projects"
            context="Explore our portfolio of custom pool and spa projects that blend luxury and relaxation."
            image1={a}
            image2={b}
            image3={c}
            image4={d}
            title1="Custom Pool Designs"
            description1="Tailored pool designs to create your perfect backyard oasis."
            title2="High-Quality Materials"
            description2="Using top-grade materials for durable and beautiful pools and spas."
            title3="Professional Installation"
            description3="Expert installation services to ensure your pool and spa are built to last."
            title4="Special Projects"
            description4="Unique pool and spa solutions customized to meet your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
