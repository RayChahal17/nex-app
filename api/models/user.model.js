import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      phone: {
         type: String,
         required: false,
      },
      interests: {
         type: [String],
         required: false,
      },
      profilePicture: {
         type: String,
         default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      },
      isAdmin: {
         type: Boolean,
         default: false,
      },
      appointments: [
         {
            date: { type: String, required: true },
            time: { type: String, required: true },
            service: { type: String, required: true },
            address: { type: String, required: true },
         },
      ],
   },
   { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
