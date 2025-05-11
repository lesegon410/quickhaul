
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Home } from "lucide-react";
import DriverProfileFormSection from "@/components/profile/DriverProfileFormSection";

const EditProfileForm = ({ profileData, handleChange, userType, handleNestedChange, handleSelectChange }) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            value={profileData.email}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="address"
            name="address"
            value={profileData.address}
            onChange={handleChange}
            className="pl-10"
          />
        </div>
      </div>
      {userType === 'driver' && (
        <DriverProfileFormSection 
          profileData={profileData} 
          handleChange={handleNestedChange} 
          handleSelectChange={handleSelectChange}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default EditProfileForm;
