import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import concrete2 from '../../assets/services/concrete2.jpeg';
import concrete3 from '../../assets/services/concrete3.jpeg';
import concrete5 from '../../assets/services/concrete5.jpeg';
import concrete7 from '../../assets/services/concrete7.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function Concrete() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Concrete Builds"
            Subheading="Transforming Spaces with Excellence"
            SubServicesHeading="Expert Concrete Solutions for Every Need"
            SubService1="Residential Concrete Solutions"
            SubService1Context="High-quality concrete services for residential projects, including driveways, patios, and walkways."
            SubService2="Commercial Concrete Services"
            SubService2Context="Reliable concrete solutions for commercial buildings, parking lots, and other structures."
            SubService3="Industrial Concrete Applications"
            SubService3Context="Durable and efficient concrete services for industrial facilities, warehouses, and more."
         />

         <ImageLayoutGridComponent
            heading="Stunning Concrete Projects"
            context="Explore our diverse range of concrete projects that showcase our commitment to quality and innovation."
            image1={concrete3}
            image2={concrete7}
            image3={concrete5}
            image4={concrete2}
            title1="Residential Concrete Solutions"
            description1="High-quality concrete services for residential projects, including driveways, patios, and walkways."
            title2="Commercial Concrete Services"
            description2="Reliable concrete solutions for commercial buildings, parking lots, and other structures."
            title3="Industrial Concrete Applications"
            description3="Durable and efficient concrete services for industrial facilities, warehouses, and more."
            title4="Specialty Concrete Projects"
            description4="Innovative and custom concrete solutions for unique projects that require specialized techniques and materials."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
