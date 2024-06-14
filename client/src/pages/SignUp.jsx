import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput, Modal } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillGoogleCircle } from 'react-icons/ai';
import LeftSideGlobeComponent from '../components/LeftSideGlobeComponent';
import SignUpOAuth from '../components/SignUpOAuth';

const interestsOptions = [
   "Basement Renovations",
   "Concrete",
   "Pavers",
   "Decks",
   "Fencing",
   "Landscaping",
   "Other"
];

export default function SignUp() {
   const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      phone: '',
      interests: []
   });
   const [showModal, setShowModal] = useState(false); // State to control the modal visibility
   const [errorMessage, setErrorMessage] = useState(null);
   const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

   const handleChange = (e) => {
      const { id, value, selectedOptions } = e.target;
      if (id === 'interests') {
         const selectedValues = Array.from(selectedOptions, option => option.value);
         setFormData({ ...formData, interests: selectedValues });
      } else {
         setFormData({ ...formData, [id]: value.trim() });
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Form Validation (unchanged)
      if (!formData.username || !formData.email || !formData.password || !formData.phone) {
         setErrorMessage('Please fill out all fields.');
         return;
      }

      try {
         setLoading(true);
         setErrorMessage(null);

         // Fetch Call with Proxy
         const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });

         // Check for Network Errors
         if (!response.ok) {
            try {
               const errorData = await response.json();
               if (errorData.message) {
                  throw new Error(errorData.message); // Use the server's error message
               }
            } catch (parseError) {
               throw new Error(`Server Error: ${response.status} - ${response.statusText}`);
            }
         }

         const data = await response.json();
         if (data.success === false) {
            setErrorMessage(data.message || 'An error occurred during signup.');
            setLoading(false);
            return;
         }

         // Handle Successful Signup (navigate to signin)
         setLoading(false);
         navigate('/sign-in');
      } catch (error) {
         console.error('Signup Error:', error);
         setErrorMessage(error.message); // Display the specific error message
         setLoading(false);
      }
   };

   return (
      <div className="flex flex-col min-h-screen">
         <div className="flex flex-grow flex-wrap">
            {/* left side */}
            <LeftSideGlobeComponent />  {/* Use the memoized component */}
            {/* right side */}
            <div className="flex-1 flex basis-1/2 flex-col justify-center items-center p-10">
               <div className="w-full max-w-md">
                  <form onSubmit={handleSubmit}>
                     <div className="mb-4">
                        <Label value='Your username' />
                        <TextInput
                           sizing="sm"
                           type='text'
                           placeholder='Username'
                           id='username'
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <Label value='Your email' />
                        <TextInput
                           sizing="sm"
                           type='email'
                           placeholder='name@company.com'
                           id='email'
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <Label value='Your password' />
                        <TextInput
                           sizing="sm"
                           type='password'
                           placeholder='Password'
                           id='password'
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mb-4">
                        <Label value='Your phone number' />
                        <TextInput
                           sizing="sm"
                           type='text'
                           placeholder='Phone Number'
                           id='phone'
                           onChange={handleChange}
                           required
                        />
                     </div>
                     <div className="mb-10">
                        <Label htmlFor="interests" value="Select your interests" />
                        <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                           {interestsOptions.map((interest, index) => (
                              <label key={index} className="block">
                                 <input
                                    type="checkbox"
                                    value={interest}
                                    onChange={(e) => {
                                       const { checked, value } = e.target;
                                       if (checked) {
                                          setFormData((prevData) => ({
                                             ...prevData,
                                             interests: [...prevData.interests, value]
                                          }));
                                       } else {
                                          setFormData((prevData) => ({
                                             ...prevData,
                                             interests: prevData.interests.filter((i) => i !== value)
                                          }));
                                       }
                                    }}
                                    className="mr-2"
                                 />
                                 {interest}
                              </label>
                           ))}
                        </div>
                     </div>
                     <div className='flex flex-col items-center'>
                        <Button type='submit' gradientDuoTone="tealToLime" className='w-full mt-4' disabled={loading}>
                           {
                              loading ? (
                                 <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                 </>
                              ) : 'Sign up'
                           }
                        </Button>
                        <Button type='button' gradientDuoTone='tealToLime' className='w-full mt-4' outline onClick={() => setShowModal(true)}>
                           <AiFillGoogleCircle className='w-6 h-6 mr-2' />
                           Continue with Google
                        </Button>
                     </div>
                  </form>
                  <div className='flex flex-row justify-center items-center mt-4'>
                     <span>Have an account?</span><Link to='/signin' className='text-lime-700 ml-2'>Sign in</Link>
                  </div>
                  {
                     errorMessage && (
                        <Alert className='mt-5' color='failure' sizing="sm" rounded>
                           {errorMessage}
                        </Alert>
                     )
                  }
               </div>
            </div>
         </div>
         <Modal show={showModal} onClose={() => setShowModal(false)}>
            <Modal.Header>Google Sign Up</Modal.Header>
            <Modal.Body>
               <SignUpOAuth />
            </Modal.Body>
         </Modal>
      </div>
   );
}
