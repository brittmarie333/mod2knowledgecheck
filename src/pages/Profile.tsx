// src/pages/Profile.tsx
import { useAuth } from '../context/AuthContext';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  UserProfileData,
} from '../services/userService';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const data = await getUserProfile(user.uid);
        if (data) {
          setProfile(data);
          setName(data.name || '');
          setAddress(data.address || '');
        }
      }
    };
    loadProfile();
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      await updateUserProfile(user.uid, { name, address });
      alert('Profile updated!');
    }
  };

  const handleDelete = async () => {
    if (user) {
      const confirm = window.confirm('Are you sure you want to delete your account?');
      if (confirm) {
        await deleteUserProfile(user.uid);
        await user.delete(); // Deletes from Firebase Auth
        alert('Account deleted.');
      }
    }
  };

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
      <div className="profile-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <button onClick={handleUpdate}>Update Profile</button>
        <button onClick={handleDelete} className="delete-button">
          Delete Account
        </button>
      </div>
    </div>
  );
}
