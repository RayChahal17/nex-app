import React from 'react';
import StickyScrollComponent from '../components/ui/StickyScrollComponenet';
import a from '../assets/images/a.jpeg';
import b from '../assets/images/b.jpeg';
import c from '../assets/images/c.jpeg';
import d from '../assets/images/d.jpeg';
import TextContentLarge1 from '../components/ui/TextContentLarge1';
import BackgroundBeamsComponent from '../components/ui/BackgroundBeamsComponenet';

export default function OurCraftsmanship() {
   return (
      <div>
         <TextContentLarge1
            h2Text1='Our Craftsmanship'
            h2MidSpan='Exceptional Quality and Attention to Detail'
            h2Text2=''
            pText="NexRenovations is synonymous with unparalleled craftsmanship. Our dedication to excellence is evident in every project we undertake. Discover what sets us apart:"
            textButton=''
         />

         <StickyScrollComponent
            stImg1={a}
            stImg2={b}
            stImg3={c}
            stImg4={d}
            t1="Quality Assurance"
            t2="Materials and Techniques"
            t3="Skilled Workforce"
            t4="Projects that Define Us"
            t5="Customer Commitment"
            d1="We use only the highest quality materials to ensure lasting durability and aesthetic appeal. Our stringent quality checks at every phase guarantee that our work meets the highest industry standards."
            d2="We employ the latest construction techniques and sustainable practices to enhance your living spaces. Each project is tailored to your specific needs and preferences, ensuring a unique and personalized outcome."
            d3="Our team consists of seasoned professionals who are passionate about their craft. We invest in continuous training and development to keep our team at the forefront of industry trends."
            d4="From patios and driveways to decorative concrete features, our concrete projects are built to last and impress. We create elegant and functional stone walkways and retaining walls that enhance your outdoor space. Our custom wood decks and fences are designed for beauty, durability, and longevity."
            d5="We prioritize our customers' needs and satisfaction in every project. Our commitment to excellence and attention to detail ensures that we not only meet but exceed your expectations."
         />

         <BackgroundBeamsComponent />
      </div>
   );
}
