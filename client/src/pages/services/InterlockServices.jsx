import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';

import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';
// Import all images from the services folder
import interlock2 from '../../assets/services/interlock2.jpeg';
import interlock3 from '../../assets/services/interlock3.jpeg';
import interlock4 from '../../assets/services/interlock4.jpeg';
import interlock9 from '../../assets/services/interlock9.jpeg';

export default function InterlockServices() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Interlocks Driveways"
            Subheading="Enhancing Curb Appeal"
            SubServicesHeading="Professional Interlock Driveway Solutions"
            SubService1="Custom Driveway Designs"
            SubService1Context="Unique and personalized driveway designs to match your home’s aesthetics."
            SubService2="Durable Interlock Paving"
            SubService2Context="High-quality interlock paving that stands the test of time and weather."
            SubService3="Maintenance and Repairs"
            SubService3Context="Reliable maintenance and repair services to keep your driveway looking its best."
         />

         <ImageLayoutGridComponent
            heading="Exceptional Interlock Driveway Projects"
            context="Discover our portfolio of stunning interlock driveway projects that combine beauty and durability."
            image1={interlock4}
            image2={interlock2}
            image3={interlock3}
            image4={interlock9}
            title1="Custom Driveway Designs"
            description1="Unique and personalized driveway designs to match your home’s aesthetics."
            title2="Durable Interlock Paving"
            description2="High-quality interlock paving that stands the test of time and weather."
            title3="Maintenance and Repairs"
            description3="Reliable maintenance and repair services to keep your driveway looking its best."
            title4="Special Projects"
            description4="Specialized interlock projects tailored to meet your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
