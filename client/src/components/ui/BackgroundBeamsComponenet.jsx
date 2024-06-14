import React, { useState } from 'react';
import { Modal, Button, TextInput, Select, Textarea } from 'flowbite-react';
import BackgroundBeams from './BackgroundBeams';

const ContactForm = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      city: '',
      service: '',
   });

   const [showModal, setShowModal] = useState(false);
   const [confirmationMessage, setConfirmationMessage] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);

   const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevFormData) => {
         const updatedFormData = { ...prevFormData, [id]: value };
         console.log(`Updated formData: ${JSON.stringify(updatedFormData)}`);
         return updatedFormData;
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      setShowModal(true);
   };

   const handleConfirm = async () => {
      setShowModal(false);

      try {
         const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const result = await response.json();

         if (result.success) {
            setIsSuccess(true);
            setConfirmationMessage('Your message has been sent successfully. We will get back to you shortly.');
         } else {
            setIsSuccess(false);
            setConfirmationMessage('Failed to send the message. Please try again later.');
         }
      } catch (error) {
         setIsSuccess(false);
         setConfirmationMessage('An error occurred. Please try again later.');
      }
   };

   const handleCancel = () => {
      setShowModal(false);
   };

   return (
      <div className="h-[40rem] w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
         <div className="max-w-2xl mx-auto p-4 md:w-1/2 w-full md:px-0 px-10">
            <h1 className="relative z-10 text-lg md:text-5xl bg-clip-text pb-10 text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
               Send us an email now!
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
               <TextInput
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 bg-opacity-50"
                  required
               />
               <TextInput
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 bg-opacity-50"
                  required
               />
               <Select
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 bg-opacity-50"
                  required
               >
                  <option value="" disabled>Select City</option>
                  <option value="Ancaster">Ancaster</option>
                  <option value="Brampton">Brampton</option>
                  <option value="Brantford">Brantford</option>
                  <option value="Burlington">Burlington</option>
                  <option value="Caledonia">Caledonia</option>
                  <option value="Cayuga">Cayuga</option>
                  <option value="Dundas">Dundas</option>
                  <option value="Dunnville">Dunnville</option>
                  <option value="Fort Erie">Fort Erie</option>
                  <option value="Grimsby">Grimsby</option>
                  <option value="Hamilton">Hamilton</option>
                  <option value="Kitchener">Kitchener</option>
                  <option value="Mississauga">Mississauga</option>
                  <option value="Newmarket">Newmarket</option>
                  <option value="Niagara Falls">Niagara Falls</option>
                  <option value="Oakville">Oakville</option>
                  <option value="Oshawa">Oshawa</option>
                  <option value="Pickering">Pickering</option>
                  <option value="Port Colborne">Port Colborne</option>
                  <option value="Richmond Hill">Richmond Hill</option>
                  <option value="St. Catharines">St. Catharines</option>
                  <option value="Stoney Creek">Stoney Creek</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Vaughan">Vaughan</option>
                  <option value="Vineland">Vineland</option>
                  <option value="Waterloo">Waterloo</option>
                  <option value="Welland">Welland</option>
                  <option value="Whitby">Whitby</option>
                  <option value="Woodbridge">Woodbridge</option>
                  <option value="Woodbridge">Other</option>

               </Select>
               <Select
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-700 bg-opacity-50"
                  required
               >
                  <option value="" disabled>Select the kind of service</option>
                  <option value="Concrete Builds">Concrete Services</option>
                  <option value="Interlocks Services">Interlocks Services</option>
                  {/* <option value="Stone Walkways">Stone Walkways</option> */}
                  <option value="Retaining Walls">Retaining Walls</option>
                  <option value="Wood Decks">Wood Decks</option>
                  <option value="Fences">Fences</option>
                  <option value="Kitchen Renovations">Kitchen Renovations</option>
                  {/* <option value="Home Additions">Home Additions</option> */}
                  <option value="Basement Renovations">Basement Renovations</option>
                  <option value="Bathroom Renovations">Bathroom Renovations</option>
                  <option value="Custom Landscapes">Custom Landscapes</option>
                  {/* <option value="Custom Pools & Spas">Custom Pools & Spas</option> */}
               </Select>
               <Textarea
                  id="message"
                  placeholder="Your Message"
                  maxLength="200"
                  value={formData.message}
                  onChange={handleChange}
                  className="rounded-lg border border-neutral-800 focus:ring-2 focus:ring-teal-500 w-full relative z-10 bg-neutral-950 placeholder:text-neutral-600 text-neutral-300 bg-opacity-50 resize-none"
                  required
               />
               <Button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white hover:scale-105 transition-transform duration-300 z-10 relative"
               >
                  Send Email
               </Button>
            </form>
         </div>
         <BackgroundBeams />

         <Modal show={showModal} onClose={handleCancel}>
            <Modal.Header>Confirm Email</Modal.Header>
            <Modal.Body>
               <div className="space-y-6 text-left">
                  <p className="text-lg font-semibold">Are you sure you want to send this email?</p>
                  <div className="border-t border-neutral-200 pt-4">
                     <p className="text-sm text-neutral-500">
                        <strong>Name:</strong> <span className="text-neutral-700">{formData.name}</span>
                     </p>
                     <p className="text-sm text-neutral-500">
                        <strong>Email:</strong> <span className="text-neutral-700">{formData.email}</span>
                     </p>
                     <p className="text-sm text-neutral-500">
                        <strong>City:</strong> <span className="text-neutral-700">{formData.city}</span>
                     </p>
                     <p className="text-sm text-neutral-500">
                        <strong>Service:</strong> <span className="text-neutral-700">{formData.service}</span>
                     </p>
                     <p className="text-sm text-neutral-500">
                        <strong>Message:</strong> <span className="text-neutral-700">{formData.message}</span>
                     </p>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={handleConfirm} className="bg-teal-500 hover:bg-teal-600 text-white">
                  Confirm
               </Button>
               <Button color="gray" onClick={handleCancel}>
                  Cancel
               </Button>
            </Modal.Footer>
         </Modal>

         <Modal show={!!confirmationMessage} onClose={() => setConfirmationMessage('')}>
            <Modal.Header>{isSuccess ? 'Success' : 'Failure'}</Modal.Header>
            <Modal.Body>
               <div className="text-center">
                  <p className={isSuccess ? 'text-green-600' : 'text-red-600'}>
                     {confirmationMessage}
                  </p>
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => setConfirmationMessage('')} className="bg-teal-500 hover:bg-teal-600 text-white">
                  OK
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   );
};

export default ContactForm;
