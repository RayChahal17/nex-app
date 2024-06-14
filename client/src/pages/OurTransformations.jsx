import React from 'react';
import a from '../assets/images/a.jpeg';
import b from '../assets/images/b.jpeg';
import c from '../assets/images/c.jpeg';
import d from '../assets/images/d.jpeg';
import e from '../assets/images/e.jpeg';
import TextContentLarge1 from '../components/ui/TextContentLarge1';
import BackgroundBeamsComponent from '../components/ui/BackgroundBeamsComponenet';
import StickyScrollComponent from '../components/ui/StickyScrollComponenet';

export default function OurTransformations() {
   return (
      <div>
         <TextContentLarge1
            h2Text1='Transformations'
            h2MidSpan='Dramatic Transformations That Elevate Spaces'
            h2Text2=''
            pText="Witness the transformative power of NexRenovations. Our gallery showcases stunning before-and-after images that highlight our ability to turn any space into a masterpiece. Here’s what you can expect:"
            textButton=''
         />

         <StickyScrollComponent
            stImg1={a}
            stImg2={b}
            stImg3={c}
            stImg4={d}
            stImg5={e}
            t1="Quality Assurance"
            t2="Client Testimonials"
            t3="Our Signature Projects"
            t4="Technologies and Frameworks"
            t5="Project Planning"
            d1="We use only the highest quality materials to ensure lasting durability and aesthetic appeal. Our stringent quality checks at every phase guarantee that our work meets the highest industry standards."
            d2="John Mitchell, Burlington: The team did an incredible job transforming our backyard with a stunning new patio. Sarah Thompson, Oakville: Our driveway renovation was seamless from start to finish."
            d3="Kitchen and Bathroom Renovations: Modern designs with luxurious finishes that elevate your home's interior. Basement Renovations: Customizable living spaces with waterproofing and insulation for comfort and functionality. Custom Landscapes and Pools: Personalized design plans and professional installation that turn your yard into a paradise."
            d4="Efficient CRM Tools: Enhanced customer communication and project management for a seamless experience. Customer Satisfaction: Regular updates and post-project support to ensure your complete satisfaction."
            d5="Effective Project Planning: Detailed planning and execution to ensure successful project completion. Timely Execution: Projects completed within the agreed timelines and budget."
         />

         <BackgroundBeamsComponent />
      </div>
   );
}
