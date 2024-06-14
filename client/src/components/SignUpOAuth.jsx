import React, { useState } from 'react';
import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signInSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function SignUpOAuth() {
   const auth = getAuth(app);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      phone: '',    // Optional phone number
      interests: []
   });
   const [errorMessage, setErrorMessage] = useState(null);

   const handleChange = (e) => {
      const { id, value, selectedOptions } = e.target;
      if (id === 'interests') {
         const selectedValues = Array.from(selectedOptions, option => option.value);
         setFormData({ ...formData, interests: selectedValues });
      } else {
         setFormData({ ...formData, [id]: value.trim() });
      }
   };

   const handleGoogleClick = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      try {
         const resultsFromGoogle = await signInWithPopup(auth, provider);
         const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: resultsFromGoogle.user.displayName,
               email: resultsFromGoogle.user.email,
               googlePhotoUrl: resultsFromGoogle.user.photoURL,
               phone: formData.phone,
               interests: formData.interests,
            }),
         });
         const data = await res.json();
         if (res.ok) {
            dispatch(signInSuccess(data)); // Sign in the user by dispatching the action
            navigate('/'); // Navigate to the home page or dashboard
         } else {
            setErrorMessage(data.message || 'An error occurred during Google signup.');
         }
      } catch (error) {
         console.log(error);
         setErrorMessage("Server Error: " + error.message);
      }
   };

   return (
      <div className="flex flex-col justify-start items-center w-full mt-4">
         <div className="mb-4">
            <Label value='Your phone number (optional)' />
            <TextInput
               sizing="sm"
               type='text'
               placeholder='Phone Number'
               id='phone'
               onChange={handleChange}
            />
         </div>
         <div className="mb-10">
            <Label htmlFor="interests" value="Select your interests" />
            <div className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
               {["Basement Renovations", "Concrete", "Pavers", "Decks", "Fencing", "Landscaping", "Other"].map((interest, index) => (
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
         <Button type='button' gradientDuoTone='tealToLime' className='w-full mt-4' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Continue with Google
         </Button>
         {errorMessage && (
            <Alert className='mt-5' color='failure' sizing="sm" rounded>
               {errorMessage}
            </Alert>
         )}
      </div>
   );
}
