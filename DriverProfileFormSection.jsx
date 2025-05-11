
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, ShieldCheck, CalendarDays, PackagePlus } from "lucide-react";

const DriverProfileFormSection = ({ profileData, handleChange, handleSelectChange }) => {
  return (
    <div className="space-y-4 pt-4 border-t mt-4">
      <h3 className="text-md font-semibold text-gray-700">Driver Specific Information</h3>
      <div className="space-y-2">
        <Label htmlFor="vehicleType">Vehicle Type</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Truck className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="vehicleType"
            name="type"
            value={profileData.vehicleDetails.type}
            onChange={(e) => handleChange("vehicleDetails", e.target.name, e.target.value)}
            className="pl-10"
            placeholder="e.g., Bakkie, Van, Truck"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="licensePlate">License Plate</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ShieldCheck className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="licensePlate"
            name="licensePlate"
            value={profileData.vehicleDetails.licensePlate}
            onChange={(e) => handleChange("vehicleDetails", e.target.name, e.target.value)}
            className="pl-10"
            placeholder="e.g., ABC 123 GP"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="vehicleCapacity">Vehicle Capacity (kg)</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <PackagePlus className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            id="vehicleCapacity"
            name="capacity"
            type="number"
            value={profileData.vehicleDetails.capacity}
            onChange={(e) => handleChange("vehicleDetails", e.target.name, e.target.value)}
            className="pl-10"
            placeholder="e.g., 1000 for 1 ton"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="availability">Availability Status</Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarDays className="h-5 w-5 text-gray-400" />
          </div>
          <Select 
            onValueChange={(value) => handleSelectChange("availability", value)} 
            value={profileData.availability}
          >
            <SelectTrigger id="availability" className="pl-10">
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="offline">Offline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DriverProfileFormSection;
