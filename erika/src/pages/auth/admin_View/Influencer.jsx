import { useToast } from "@/hooks/use-toast";
import { addInfluencer } from "@/store/admin/influencer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Influencer = () => {
  const initialFormState = {
    name: "",
    email: "",
    socialMediaHandle: "",
    plateform: "",
    discount: "",
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    socialMediaHandle: "",
    plateform: "",
    discount: "",
  });
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Convert discount to a number if the field is 'discount'
    const newValue = name === "discount" ? Number(value) : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Simple validation function
  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.socialMediaHandle)
      errors.socialMediaHandle = "Social Media Handle is required";
    if (!formData.plateform) errors.platform = "Platform is required";
    if (!formData.discount) errors.discount = "Discount is required";
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(addInfluencer(formData)).then((data) => {
        if (data.payload.success) {
          toast({
            title: "Influencer Added Successfully.",
          });
          setFormData(initialFormState);
        }
        else{
          toast ({
            title: "Email Id already exist."
          })
        }
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md w-1/2">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Add Influencer
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {/* Name */}
        <div>

          
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter influencer's name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter influencer's email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Social Media Handle */}
        <div>
          <label
            htmlFor="socialMediaHandle"
            className="block text-sm font-medium text-gray-700"
          >
            Social Media Handle
          </label>
          <input
            type="text"
            id="socialMediaHandle"
            name="socialMediaHandle"
            value={formData.socialMediaHandle}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.socialMediaHandle ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter influencer's social media handle"
          />
          {errors.socialMediaHandle && (
            <p className="text-red-500 text-xs mt-1">
              {errors.socialMediaHandle}
            </p>
          )}
        </div>

        {/* Platform */}
        <div>
          <label
            htmlFor="plateform"
            className="block text-sm font-medium text-gray-700"
          >
            Platform
          </label>
          <select
            id="plateform"
            name="plateform"
            value={formData.plateform}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.platform ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Platform</option>
            <option value="Instagram">Instagram</option>
            <option value="YouTube">YouTube</option>

            <option value="Twitter">Twitter</option>
          </select>
          {errors.platform && (
            <p className="text-red-500 text-xs mt-1">{errors.platform}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700"
          >
            Discount
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter influencer's discount"
          />
          {errors.discount && (
            <p className="text-red-500 text-xs mt-1">{errors.discount}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-md hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Influencer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Influencer;
