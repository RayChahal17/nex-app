import React from 'react';
import HeaderSubServicesAndContactUs from '../../components/services/HeaderSubServicesAndContactUs';
import ImageLayoutGridComponent from '../../components/ui/ImageLayoutGridComponent';
import deck1 from '../../assets/services/deck1.jpeg';
import deck2 from '../../assets/services/deck2.jpeg';
import deck3 from '../../assets/services/deck3.jpeg';
import deck7 from '../../assets/services/deck7.jpeg';
import BookEstimateAppointment from '../../components/services/BookEstimateAppointment';

export default function WoodDecks() {
   return (
      <>
         <HeaderSubServicesAndContactUs
            Heading="Wood Decks"
            Subheading="Outdoor Living at Its Best"
            SubServicesHeading="Expert Wood Deck Services"
            SubService1="Custom Deck Designs"
            SubService1Context="Personalized wood deck designs to match your home and lifestyle."
            SubService2="High-Quality Materials"
            SubService2Context="Using premium wood materials for durability and aesthetic appeal."
            SubService3="Professional Installation"
            SubService3Context="Expert installation services to ensure your deck is built to last."
         />

         <ImageLayoutGridComponent
            heading="Beautiful Wood Deck Projects"
            context="Explore our portfolio of stunning wood deck projects that enhance outdoor living spaces."
            image1={deck1}
            image2={deck2}
            image3={deck3}
            image4={deck7}
            title1="Custom Deck Designs"
            description1="Personalized wood deck designs to match your home and lifestyle."
            title2="High-Quality Materials"
            description2="Using premium wood materials for durability and aesthetic appeal."
            title3="Professional Installation"
            description3="Expert installation services to ensure your deck is built to last."
            title4="Special Projects"
            description4="Unique wood deck solutions tailored to your specific needs and preferences."
         />
                  <BookEstimateAppointment/>

      </>
   );
}
