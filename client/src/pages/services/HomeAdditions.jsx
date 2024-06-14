import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import a from '../../assets/images/a.jpeg';
import b from '../../assets/images/b.jpeg';
import c from '../../assets/images/c.jpeg';
import d from '../../assets/images/d.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function HomeAdditions() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Home Additions"
            Subheading="Expanding Your Living Space"
            SubServicesHeading="Professional Home Addition Services"
            SubService1="Custom Room Additions"
            SubService1Context="Tailored room addition designs to enhance your home’s functionality and value."
            SubService2="High-Quality Construction"
            SubService2Context="Using top-grade materials for durable and aesthetically pleasing home additions."
            SubService3="Expert Installation"
            SubService3Context="Professional installation services to ensure seamless integration with your existing home."
         />

         <ImageLayoutGridComponent
            heading="Remarkable Home Addition Projects"
            context="Discover our portfolio of home addition projects that enhance living spaces and increase property value."
            image1={a}
            image2={b}
            image3={c}
            image4={d}
            title1="Custom Room Additions"
            description1="Tailored room addition designs to enhance your home’s functionality and value."
            title2="High-Quality Construction"
            description2="Using top-grade materials for durable and aesthetically pleasing home additions."
            title3="Expert Installation"
            description3="Professional installation services to ensure seamless integration with your existing home."
            title4="Special Projects"
            description4="Unique home addition solutions customized to meet your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
