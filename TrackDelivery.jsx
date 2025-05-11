
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Truck, Package, MapPin, Clock, Phone, MessageSquare, 
  CheckCircle, AlertTriangle, ArrowLeft, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { useAuth } from "@/context/AuthContext";
import { useDelivery } from "@/context/DeliveryContext";
import { useToast } from "@/components/ui/use-toast";

const TrackDelivery = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { getDeliveryById, updateDeliveryStatus } = useDelivery();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [driverInfo, setDriverInfo] = useState(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  // Fetch delivery data
  useEffect(() => {
    if (id) {
      const deliveryData = getDeliveryById(id);
      
      if (deliveryData) {
        setDelivery(deliveryData);
        
        // If delivery is accepted or in transit, show mock driver info
        if (deliveryData.status === "accepted" || deliveryData.status === "transit" || deliveryData.status === "pickup") {
          setDriverInfo({
            name: "John Driver",
            phone: "+27 71 234 5678",
            vehicle: "Toyota Hilux",
            licensePlate: "GP 123-456",
            rating: 4.8,
            avatar: null
          });
        }
      } else {
        toast({
          title: "Delivery not found",
          description: "The requested delivery could not be found",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
      
      setLoading(false);
    }
  }, [id, getDeliveryById, navigate, toast]);
  
  // Mock function to cancel delivery
  const handleCancelDelivery = () => {
    if (delivery && delivery.status === "pending") {
      const success = updateDeliveryStatus(id, "cancelled");
      
      if (success) {
        setDelivery(prev => ({ ...prev, status: "cancelled" }));
        
        toast({
          title: "Delivery cancelled",
          description: "Your delivery request has been cancelled",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel delivery",
          variant: "destructive",
        });
      }
    }
  };
  
  // Mock function to simulate delivery progress
  const handleSimulateProgress = () => {
    if (!delivery) return;
    
    let newStatus;
    switch (delivery.status) {
      case "pending":
        newStatus = "accepted";
        break;
      case "accepted":
        newStatus = "pickup";
        break;
      case "pickup":
        newStatus = "transit";
        break;
      case "transit":
        newStatus = "delivered";
        break;
      default:
        return;
    }
    
    const success = updateDeliveryStatus(id, newStatus);
    
    if (success) {
      setDelivery(prev => ({ ...prev, status: newStatus }));
      
      if (newStatus === "accepted" && !driverInfo) {
        setDriverInfo({
          name: "John Driver",
          phone: "+27 71 234 5678",
          vehicle: "Toyota Hilux",
          licensePlate: "GP 123-456",
          rating: 4.8,
          avatar: null
        });
      }
      
      toast({
        title: "Status updated",
        description: `Delivery status updated to ${newStatus}`,
      });
    }
  };
  
  if (loading || !delivery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Determine progress percentage based on status
  const getProgressPercentage = () => {
    switch (delivery.status) {
      case "pending": return 0;
      case "accepted": return 25;
      case "pickup": return 50;
      case "transit": return 75;
      case "delivered": return 100;
      case "cancelled": return 0;
      default: return 0;
    }
  };
  
  // Get map markers based on delivery status
  const getMapMarkers = () => {
    const markers = [
      {
        position: [-26.2041, 28.0473], // Pickup (mock coordinates)
        title: "Pickup Location",
        description: delivery.pickupLocation
      },
      {
        position: [-26.1052, 28.0560], // Delivery (mock coordinates)
        title: "Delivery Location",
        description: delivery.deliveryLocation
      }
    ];
    
    // Add driver marker if in transit
    if (delivery.status === "transit" || delivery.status === "pickup") {
      markers.push({
        position: [-26.1546, 28.0517], // Driver (mock coordinates)
        title: "Driver Location",
        description: `${driverInfo?.name} is on the way`,
        type: "truck"
      });
    }
    
    return markers;
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/dashboard" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Track Delivery</h1>
            <p className="text-gray-600 mt-1">
              Delivery ID: <span className="font-medium">{delivery.id}</span>
            </p>
          </motion.div>
        </div>
        
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className={`
            border-l-4 
            ${delivery.status === "delivered" ? "border-l-green-500" : ""} 
            ${delivery.status === "cancelled" ? "border-l-red-500" : ""} 
            ${delivery.status === "pending" || delivery.status === "accepted" || delivery.status === "pickup" || delivery.status === "transit" ? "border-l-blue-500" : ""}
          `}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span>Delivery Status</span>
                {delivery.status === "delivered" && (
                  <span className="text-sm bg-green-100 text-green-800 py-1 px-3 rounded-full flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Completed
                  </span>
                )}
                {delivery.status === "cancelled" && (
                  <span className="text-sm bg-red-100 text-red-800 py-1 px-3 rounded-full flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Cancelled
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {delivery.status !== "cancelled" && (
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${delivery.status === "delivered" ? "bg-green-500" : "bg-blue-500"}`}
                    ></motion.div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-sm">
                    <div className={`${delivery.status === "pending" || delivery.status === "accepted" || delivery.status === "pickup" || delivery.status === "transit" || delivery.status === "delivered" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                      Pending
                    </div>
                    <div className={`${delivery.status === "accepted" || delivery.status === "pickup" || delivery.status === "transit" || delivery.status === "delivered" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                      Accepted
                    </div>
                    <div className={`${delivery.status === "pickup" || delivery.status === "transit" || delivery.status === "delivered" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                      Pickup
                    </div>
                    <div className={`${delivery.status === "transit" || delivery.status === "delivered" ? "text-blue-600 font-medium" : "text-gray-500"}`}>
                      In Transit
                    </div>
                    <div className={`${delivery.status === "delivered" ? "text-green-600 font-medium" : "text-gray-500"}`}>
                      Delivered
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Package className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Item Description</p>
                    <p className="text-sm text-gray-600">{delivery.itemDescription}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Pickup Location</p>
                    <p className="text-sm text-gray-600">{delivery.pickupLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Delivery Location</p>
                    <p className="text-sm text-gray-600">{delivery.deliveryLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Vehicle Type</p>
                    <p className="text-sm text-gray-600">
                      {delivery.vehicleType === "bakkie" && "Bakkie (Small Pickup)"}
                      {delivery.vehicleType === "truck" && "Truck (Medium Size)"}
                      {delivery.vehicleType === "lorry" && "Lorry (Large Truck)"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="text-sm font-medium">Scheduled Pickup</p>
                    <p className="text-sm text-gray-600">
                      {delivery.scheduledDate} at {delivery.scheduledTime}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {delivery.status === "pending" && (
                <Button variant="destructive" onClick={handleCancelDelivery}>
                  Cancel Request
                </Button>
              )}
              
              {/* This button is for demo purposes only */}
              {delivery.status !== "delivered" && delivery.status !== "cancelled" && (
                <Button onClick={handleSimulateProgress}>
                  Simulate Next Status (Demo)
                </Button>
              )}
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Driver Info (if assigned) */}
        {driverInfo && (delivery.status === "accepted" || delivery.status === "pickup" || delivery.status === "transit") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <div className="mr-4">
                    {driverInfo.avatar ? (
                      <img 
                        src={driverInfo.avatar} 
                        alt={driverInfo.name} 
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg">{driverInfo.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {driverInfo.rating} • {driverInfo.vehicle} • {driverInfo.licensePlate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button className="flex-1 flex items-center justify-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Driver
                  </Button>
                  <Button variant="outline" className="flex-1 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Delivery Route</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Map 
                  markers={getMapMarkers()}
                  height="100%"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                If you have any issues with your delivery, our support team is here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Report an Issue</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report an Issue</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <p className="text-gray-600 mb-4">
                        Please describe the issue you're experiencing with your delivery:
                      </p>
                      <textarea 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder="Describe your issue here..."
                      ></textarea>
                      <div className="mt-4 flex justify-end">
                        <Button>Submit Report</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline">Contact Support</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TrackDelivery;
