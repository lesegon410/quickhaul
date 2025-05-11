
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Save, User as UserIcon, Mail, Phone } from "lucide-react";
import EditProfileForm from "@/components/profile/EditProfileForm";
import DriverProfileFormSection from "@/components/profile/DriverProfileFormSection";

const ProfileInfoCard = ({ 
  user, 
  isEditing, 
  setIsEditing, 
  handleSaveProfile, 
  isSaving, 
  profileData, 
  handleChange,
  handleNestedChange,
  handleSelectChange,
  userDeliveriesCount,
  completedDeliveriesCount,
  activeDeliveriesCount
}) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-blue-500 text-white text-2xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 cursor-pointer">
                <Camera className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </div>
        <CardTitle>{user.name}</CardTitle>
        <p className="text-gray-500 mt-1">{user.email}</p>
        <p className="text-sm text-blue-600 font-medium mt-1">
          {user.userType === 'driver' ? 'Driver Account' : 'Requester Account'}
        </p>
      </CardHeader>
      
      <CardContent>
        {isEditing ? (
          <EditProfileForm 
            profileData={profileData} 
            handleChange={handleChange} 
            userType={user.userType}
            handleNestedChange={handleNestedChange}
            handleSelectChange={handleSelectChange}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Phone Number</p>
                <p className="text-sm text-gray-600">{user.phone || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Email Address</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <UserIcon className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-gray-600">{user.address || "Not provided"}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Total Deliveries</p>
                <p className="text-sm font-semibold">{userDeliveriesCount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-medium">Completed</p>
                <p className="text-sm font-semibold">{completedDeliveriesCount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm font-medium">Active</p>
                <p className="text-sm font-semibold">{activeDeliveriesCount}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        {isEditing ? (
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 flex items-center justify-center"
              onClick={handleSaveProfile}
              disabled={isSaving}
            >
              {isSaving ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-opacity-50 border-t-transparent rounded-full" />
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProfileInfoCard;
