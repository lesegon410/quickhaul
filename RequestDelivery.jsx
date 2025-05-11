
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Truck, Package, MapPin, DollarSign, Info, 
  ArrowRight, Loader2, CheckCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { useAuth } from "@/context/AuthContext";
import { useDelivery } from "@/context/DeliveryContext";
import { useToast } from "@/components/ui/use-toast";

const RequestDelivery = () => {
  const { user } = useAuth();
  const { createDelivery } = useDelivery();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    pickupLocation: "",
    deliveryLocation: "",
    itemDescription: "",
    itemWeight: "",
    vehicleType: "",
    scheduledDate: "",
    scheduledTime: "",
    additionalNotes: ""
  });
  
  // Calculated price (in a real app, this would come from an API)
  const [price, setPrice] = useState(0);
  const [distance, setDistance] = useState(0);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // Calculate price based on form data
  useEffect(() => {
    if (formData.vehicleType && formData.itemWeight) {
      // Mock distance calculation
      const mockDistance = Math.floor(Math.random() * 20) + 5; // 5-25km
      setDistance(mockDistance);
      
      // Mock price calculation based on vehicle type and distance
      let basePrice = 0;
      switch (formData.vehicleType) {
        case "bakkie":
          basePrice = 150;
          break;
        case "truck":
          basePrice = 300;
          break;
        case "lorry":
          basePrice = 500;
          break;
        default:
          basePrice = 100;
      }
      
      // Add weight factor
      const weightFactor = parseFloat(formData.itemWeight) * 0.5;
      
      // Calculate total
      const total = basePrice + (mockDistance * 10) + weightFactor;
      setPrice(Math.round(total));
    }
  }, [formData.vehicleType, formData.itemWeight]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNextStep = () => {
    // Validate current step
    if (currentStep === 1) {
      if (!formData.pickupLocation || !formData.deliveryLocation || !formData.itemDescription) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.vehicleType || !formData.itemWeight || !formData.scheduledDate || !formData.scheduledTime) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create delivery request
      const deliveryData = {
        ...formData,
        userId: user.id,
        price,
        distance,
        status: "pending",
      };
      
      const newDelivery = await createDelivery(deliveryData);
      
      if (newDelivery) {
        setIsSuccess(true);
        
        // Redirect after a delay
        setTimeout(() => {
          navigate(`/track/${newDelivery.id}`);
        }, 2000);
      } else {
        toast({
          title: "Error",
          description: "Failed to create delivery request",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-3xl font-bold text-gray-900">Request a Delivery</h1>
          <p className="text-gray-600 mt-2">Fill in the details to get connected with nearby vehicles</p>
        </motion.div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center w-full max-w-3xl">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                1
              </div>
              <div className={`flex-1 h-1 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                2
              </div>
              <div className={`flex-1 h-1 ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex w-full max-w-3xl">
              <div className="flex-1 text-center text-sm font-medium">
                <span className={currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'}>Location Details</span>
              </div>
              <div className="flex-1 text-center text-sm font-medium">
                <span className={currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'}>Delivery Options</span>
              </div>
              <div className="flex-1 text-center text-sm font-medium">
                <span className={currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'}>Review & Confirm</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Steps */}
        <div className="max-w-3xl mx-auto">
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Location Details</CardTitle>
                  <CardDescription>Enter pickup and delivery locations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="pickupLocation"
                        name="pickupLocation"
                        placeholder="Enter pickup address"
                        className="pl-10"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="deliveryLocation"
                        name="deliveryLocation"
                        placeholder="Enter delivery address"
                        className="pl-10"
                        value={formData.deliveryLocation}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="itemDescription">Item Description</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="itemDescription"
                        name="itemDescription"
                        placeholder="Describe the items to be delivered"
                        className="pl-10"
                        value={formData.itemDescription}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Map height="250px" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                  <CardDescription>Select vehicle type and scheduling details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicleType">Vehicle Type</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("vehicleType", value)}
                      value={formData.vehicleType}
                    >
                      <SelectTrigger id="vehicleType">
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bakkie">Bakkie (Small Pickup)</SelectItem>
                        <SelectItem value="truck">Truck (Medium Size)</SelectItem>
                        <SelectItem value="lorry">Lorry (Large Truck)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="itemWeight">Approximate Weight (kg)</Label>
                    <Input
                      id="itemWeight"
                      name="itemWeight"
                      type="number"
                      placeholder="Enter weight in kg"
                      value={formData.itemWeight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Scheduled Date</Label>
                      <Input
                        id="scheduledDate"
                        name="scheduledDate"
                        type="date"
                        value={formData.scheduledDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">Scheduled Time</Label>
                      <Input
                        id="scheduledTime"
                        name="scheduledTime"
                        type="time"
                        value={formData.scheduledTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
                    <Input
                      id="additionalNotes"
                      name="additionalNotes"
                      placeholder="Any special instructions or requirements"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>
                    Review Request
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Review & Confirm</CardTitle>
                  <CardDescription>Verify your delivery request details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Pickup Location</h3>
                        <p className="mt-1 flex items-start">
                          <MapPin className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0" />
                          <span>{formData.pickupLocation}</span>
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Delivery Location</h3>
                        <p className="mt-1 flex items-start">
                          <MapPin className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0" />
                          <span>{formData.deliveryLocation}</span>
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Item Description</h3>
                        <p className="mt-1 flex items-start">
                          <Package className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0" />
                          <span>{formData.itemDescription}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Vehicle Type</h3>
                        <p className="mt-1 flex items-center">
                          <Truck className="h-5 w-5 text-blue-500 mr-1" />
                          <span>
                            {formData.vehicleType === "bakkie" && "Bakkie (Small Pickup)"}
                            {formData.vehicleType === "truck" && "Truck (Medium Size)"}
                            {formData.vehicleType === "lorry" && "Lorry (Large Truck)"}
                          </span>
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Weight</h3>
                        <p className="mt-1">{formData.itemWeight} kg</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Scheduled Pickup</h3>
                        <p className="mt-1">
                          {formData.scheduledDate} at {formData.scheduledTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Estimated Price</h3>
                          <p className="text-sm text-gray-500">Based on {distance} km distance</p>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          ${price.toFixed(2)}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500 flex items-start">
                        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>Final price may vary based on actual distance and time.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep} disabled={isSubmitting || isSuccess}>
                    Back
                  </Button>
                  
                  {isSuccess ? (
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Request Submitted
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Request
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RequestDelivery;
