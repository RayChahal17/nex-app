import React from 'react';
import StickyScrollComponent from '../components/ui/StickyScrollComponenet';
import a from '../assets/images/a.jpeg';
import b from '../assets/images/b.jpeg';
import c from '../assets/images/c.jpeg';
import d from '../assets/images/d.jpeg';
import TextContentLarge1 from '../components/ui/TextContentLarge1';
import BackgroundBeamsComponent from '../components/ui/BackgroundBeamsComponenet';

export default function OurProcess() {
   return (
      <div>
         <TextContentLarge1
            h2Text1='Our Process: From Consultation to Completion'
            h2MidSpan='Collaborative Planning and Execution for Your Dream Renovation'
            h2Text2=''
            pText="At NexRenovations, we believe in a meticulous and collaborative approach to ensure your vision becomes a reality. Our process is designed to be comprehensive, transparent, and efficient, involving you at every step to achieve the best results."
            textButton=''
         />

         <StickyScrollComponent
            stImg1={a}
            stImg2={b}
            stImg3={c}
            stImg4={d}
            t1="Initial Consultation"
            t2="Design Phase"
            t3="Construction Phase"
            t4="Completion and Follow-Up"
            t5="Customer Satisfaction"
            d1="We offer a detailed free estimate based on your project requirements. We take the time to understand your goals, preferences, and budget, ensuring we capture your vision accurately. Our initial discussions cover design ideas and budget considerations to align with your expectations."
            d2="Our designers create detailed architectural plans and 3D renderings to visualize the project, ensuring you have a clear picture of the final result. We guide you through selecting the best materials, focusing on quality, durability, and aesthetics. Your feedback is crucial. We refine the designs based on your input until you are fully satisfied with the plan."
            d3="Our project managers oversee every aspect of the construction, ensuring timelines and budgets are strictly adhered to. Our team of skilled craftsmen brings the design to life with precision and care, maintaining high standards of workmanship. Rigorous quality checks at every stage ensure that our work meets and exceeds industry standards."
            d4="We conduct a thorough inspection with you to ensure every detail is perfect and meets your expectations. Any concerns or adjustments needed are promptly addressed to guarantee your satisfaction. We provide maintenance tips and ongoing support to keep your project looking its best for years to come."
            d5="We prioritize your satisfaction above all else. Our team is dedicated to providing exceptional customer service, ensuring that your renovation experience is smooth and stress-free. From the initial consultation to the final follow-up, we are here to support you every step of the way."
         />

         <BackgroundBeamsComponent />
      </div>
   );
}
