import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import {
   updateStart,
   updateSuccess,
   updateFailure,
   deleteUserStart,
   deleteUserSuccess,
   deleteUserFailure,
   signoutSuccess,
} from '../redux/user/userSlice';

export default function DashProfile() {
   const { currentUser, error, loading } = useSelector(state => state.user);
   const [formData, setFormData] = useState({});
   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
   const [updateUserError, setUpdateUserError] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const dispatch = useDispatch();

   // Ensure avatarLabel is only set if currentUser is defined
   const avatarLabel = currentUser?.username?.charAt(0).toUpperCase() || 'U';

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
         setUpdateUserError('No changes made');
         return;
      }
      try {
         dispatch(updateStart());
         const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (!res.ok) {
            dispatch(updateFailure(data.message));
            console.error('1) Server error:', data.message);
            setUpdateUserError(data.message);
         } else {
            dispatch(updateSuccess(data));
            setUpdateUserSuccess("User's profile updated successfully");
         }
      } catch (error) {
         dispatch(updateFailure(error.message));
         setUpdateUserError(error.message);
      }
   };

   const handleDeleteUser = async () => {
      setShowModal(false);
      try {
         dispatch(deleteUserStart());
         const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
         const data = await res.json();
         if (!res.ok) {
            dispatch(deleteUserFailure(data.message));
         } else {
            dispatch(deleteUserSuccess(data));
         }
      } catch (error) {
         dispatch(deleteUserFailure(error.message));
      }
   };

   const handleSignOut = async () => {
      try {
         const res = await fetch('/api/user/signout', {
            method: 'POST',
         });
         const data = await res.json();
         if (!res.ok) {
            console.log(data.message);
         } else {
            dispatch(signoutSuccess());
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   return (
      <div className="h-full w-full mx-12">
         <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
         <form onSubmit={handleSubmit} className="flex flex-col h-full gap-4">
            <div className="w-36 h-36 bg-gradient-to-r from-green-500 to-lime-400 text-white flex justify-center items-center rounded-full font-bold text-7xl shadow-md shadow-amber-100 mx-auto mb-5">
               {avatarLabel}
            </div>
            <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username} onChange={handleChange} />
            <TextInput type="text" id="email" placeholder="Email" defaultValue={currentUser.email} onChange={handleChange} />
            <TextInput type="password" id="password" placeholder="Password" onChange={handleChange} />
            <Button type="submit" gradientDuoTone="pinkToOrange" outline>
               <span className="font-bold text-md antialiased tracking-wide" disabled={loading}>
                  {loading ? 'Loading...' : 'Update'}
               </span>
            </Button>
         </form>

         {currentUser.isAdmin && (
            <Link to="/create-post">
               <Button type="button" gradientDuoTone="pinkToOrange" className="w-full mt-2">
                  Create a Post
               </Button>
            </Link>
         )}

         {updateUserSuccess && (
            <Alert color="success" className="mt-5">
               {updateUserSuccess}
            </Alert>
         )}
         {updateUserError && (
            <Alert color="failure" className="mt-5">
               {updateUserError}
            </Alert>
         )}
         {error && (
            <Alert color="failure" className="mt-5">
               {error}
            </Alert>
         )}

         <div className="text-red-500 flex justify-between mt-5 mx-5 font-bold text-md antialiased tracking-wide">
            <span onClick={() => setShowModal(true)} className="cursor-pointer">
               Delete Account
            </span>
            <span onClick={handleSignOut} className="cursor-pointer">
               Sign Out
            </span>
         </div>

         <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 mb-4 mx-auto" />
                  <h3 className="mb-5 text-lg text-gray-500">Are you sure you want to delete your account?</h3>
                  <div className="flex justify-center gap-4">
                     <Button color="failure" onClick={handleDeleteUser}>
                        Yes, I'm sure
                     </Button>
                     <Button color="gray" onClick={() => setShowModal(false)}>
                        No, cancel
                     </Button>
                  </div>
               </div>
            </Modal.Body>
         </Modal>
      </div>
   );
}
