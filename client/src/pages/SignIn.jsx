import React, { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import LeftSideGlobeComponent from '../components/LeftSideGlobeComponent';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';

export default function SignIn() {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });
   const { loading, error: errorMessage } = useSelector(state => state.user);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.email || !formData.password) {
         return dispatch(signInFailure('Please fill all the fields'));
      }
      try {
         dispatch(signInStart());
         const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
         });
         if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
         }
         const data = await response.json();
         if (data.success === false) {
            dispatch(signInFailure(data.message));
            return;
         }
         if (response.ok) {
            dispatch(signInSuccess(data));
            navigate('/'); // Navigate to home page
         }
      } catch (error) {
         console.error('Signup Error: ', error);
         dispatch(signInFailure(error.message));
      }
   };

   const handleGoogleClick = async () => {
      const auth = getAuth(app);
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
      <div className="flex flex-col min-h-screen">
         <div className="flex flex-grow flex-wrap">
            {/* left side */}
            <LeftSideGlobeComponent />  {/* Use the memoized component */}
            {/* Right Side */}
            <div className="flex-1 flex basis-1/2 flex-col justify-center items-center p-10">
               <div className='w-full max-w-md'>
                  <form onSubmit={handleSubmit}>
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
                     <div className='flex flex-col items-center'>
                        <Button type='submit' gradientDuoTone="redToYellow" className='w-full mt-4' disabled={loading}>
                           {loading ? (
                              <>
                                 <Spinner size='sm' />
                                 <span className='pl-3'>Loading...</span>
                              </>
                           ) : 'Sign in'}
                        </Button>
                        <Button type='button' gradientDuoTone='tealToLime' className='w-full mt-4' outline onClick={handleGoogleClick}>
                           <AiFillGoogleCircle className='w-6 h-6 mr-2' />
                           Continue with Google
                        </Button>
                     </div>
                  </form>
                  <div className='flex justify-center items-center mt-4'>
                     <span>Don't have an account?</span>
                     <Link to='/sign-up' className='text-blue-500 ml-2'>Sign up</Link>
                  </div>
                  {errorMessage && (
                     <Alert className='mt-5' color='failure' sizing="sm" rounded>
                        {errorMessage}
                     </Alert>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
