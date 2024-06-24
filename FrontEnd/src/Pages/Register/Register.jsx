import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './Register.module.css';
import { useRegisterMutation } from "../../Redux/Slice/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/Slice/authSlice";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null); // State for profile photo

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation(); // Mutation hook for user registration

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigation('/dashboard'); // Redirect to dashboard if user is already logged in
    }
  }, [navigation, userInfo]);

  // Handle registration form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      let photoUrl = null;
      if (photo) {
        const uploadedPhoto = await uploadPhoto(photo); // Function to upload profile photo
        if (uploadedPhoto && uploadedPhoto.secure_url) {
          photoUrl = uploadedPhoto.secure_url; // Save the uploaded photo URL
        } else {
          toast.error('Error uploading photo');
          return;
        }
      }

      // Call register mutation to register the user
      const res = await register({ name, email, password, photo: photoUrl }).unwrap();
      dispatch(setCredentials({ ...res })); // Dispatch action to set user credentials
      navigation('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  // Function to handle file input for profile photo
  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Do nothing if no file selected
    setPhoto(file); // Save the selected photo file to state
  };

  // Function to clear uploaded profile photo
  const handleClearUploadPhoto = () => {
    setPhoto(null); // Clear the photo state
  };

  // Function to upload profile photo (example implementation)
  const uploadPhoto = async (photo) => {
    // Implement your photo upload logic here (e.g., using Axios, fetch API, or a library like Cloudinary)
    // Example: Upload photo to an API endpoint
    const formData = new FormData();
    formData.append('photo', photo);

    const response = await fetch('http://localhost:8000/api/upload-photo', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Failed to upload photo');
    }

    return response.json();
  };

  return (
    <section className={styles.container}>
      <div className={styles.auth}>
        <h1>REGISTER</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* Profile photo upload area */}
          <div className="flex flex-col gap-1">
            <label htmlFor="photo">Photo :</label>
            <div className="h-14 bg-gray-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer">
              <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                {photo ? photo.name : "Upload profile photo"}
              </p>
              {photo && (
                <button type="button" className="text-lg ml-2 hover:text-red-600" onClick={handleClearUploadPhoto}>
                  <IoClose />
                </button>
              )}
            </div>
            <input
              type="file"
              id="photo"
              name="photo"
              className="hidden"
              onChange={handleUploadPhoto}
              accept="image/*"
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating User' : 'Register'}
          </button>
        </form>
        <p className={styles.loginmessage} onClick={() => navigation('/login')}>
          <span>Login</span>
        </p>
      </div>
    </section>
  );
};

export default Register;
