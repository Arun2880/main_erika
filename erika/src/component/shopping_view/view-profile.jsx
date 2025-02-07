import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile } from '@/store/shop/profile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ViewProfile = () => {
  const initialProfileData = {
    username: '',
    email: '',
    password: '',
  };

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const _id = user.id;
  const [profile, setProfile] = useState(initialProfileData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(initialProfileData);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await dispatch(getUserProfile(_id));
        setProfile(response.payload.data); 
        setFormData(response.payload.data); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, _id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateUserProfile({ _id, ...formData })); 
      if (response.meta.requestStatus === 'fulfilled') {
        alert('Profile updated successfully!');
       
        setProfile(formData); 
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>View Profile</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <Label>Username: {profile.username}</Label>
          <Label>Email: {profile.email}</Label>
        </CardContent>
      </Card>
      <div>
        <h2 className='text-center font-bold mt-5'>Edit Profile</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="username">Username: </Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input" // Add your input styles here
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email: </Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input" // Add your input styles here
              required
            />
          </div>
          <div className='flex align-items-center justify-center'>
          <Button type="submit" className="text-white bg-black w-1/4">Update Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewProfile;
