
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, ShieldCheck, CalendarDays } from "lucide-react";

const DriverProfileSection = ({ user, profileData, isEditing, handleChange, handleSelectChange }) => {
  const vehicleDetails = isEditing ? profileData.vehicleDetails : user.vehicleDetails;
  const availability = isEditing ? profileData.availability : user.availability;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start">
          <Truck className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Vehicle Type</p>
            <p className="text-sm text-gray-600">{vehicleDetails?.type || "Not specified"}</p>
          </div>
        </div>
        <div className="flex items-start">
          <ShieldCheck className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">License Plate</p>
            <p className="text-sm text-gray-600">{vehicleDetails?.licensePlate || "Not specified"}</p>
          </div>
        </div>
        <div className="flex items-start">
          <CalendarDays className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium">Availability</p>
            <p className="text-sm text-gray-600 capitalize">{availability || "Not specified"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverProfileSection;
