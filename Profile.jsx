
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeliveryCard from "@/components/DeliveryCard";
import ProfileInfoCard from "@/components/profile/ProfileInfoCard";
import EditProfileForm from "@/components/profile/EditProfileForm";
import DriverProfileSection from "@/components/profile/DriverProfileSection";
import { useAuth } from "@/context/AuthContext";
import { useDelivery } from "@/context/DeliveryContext";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { deliveries } = useDelivery();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicleDetails: { type: "", licensePlate: "", capacity: "" },
    availability: "available",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        vehicleDetails: user.vehicleDetails || { type: "", licensePlate: "", capacity: "" },
        availability: user.availability || "available",
      });
    }
  }, [user, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, name, value) => {
    setProfileData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      }
    }));
  };

  const handleSelectChange = (name, value) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const success = await updateProfile(profileData);
      if (success) {
        setIsEditing(false);
      } else {
        toast({
          title: "Update failed",
          description: "Failed to update profile",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Update failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const userDeliveries = deliveries.filter(delivery => user && (delivery.userId === user.id || (user.userType === 'driver' && delivery.driverId === user.id)));
  const completedDeliveries = userDeliveries.filter(delivery => delivery.status === "delivered");
  const activeDeliveries = userDeliveries.filter(delivery => delivery.status !== "delivered" && delivery.status !== "cancelled");
  
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
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account and view your delivery history</p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <ProfileInfoCard 
              user={user} 
              isEditing={isEditing} 
              setIsEditing={setIsEditing}
              handleSaveProfile={handleSaveProfile}
              isSaving={isSaving}
              profileData={profileData}
              handleChange={handleChange}
              handleNestedChange={handleNestedChange}
              handleSelectChange={handleSelectChange}
              userDeliveriesCount={userDeliveries.length}
              completedDeliveriesCount={completedDeliveries.length}
              activeDeliveriesCount={activeDeliveries.length}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {user.userType === 'driver' && !isEditing && (
              <DriverProfileSection 
                user={user} 
                profileData={profileData} 
                isEditing={isEditing} 
                handleChange={handleNestedChange}
                handleSelectChange={handleSelectChange}
              />
            )}
            <Card className={user.userType === 'driver' && !isEditing ? "mt-8" : ""}>
              <CardHeader>
                <CardTitle>Delivery History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-6">
                    <TabsTrigger value="active" className="flex-1">Active Deliveries</TabsTrigger>
                    <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
                    <TabsTrigger value="all" className="flex-1">All Deliveries</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="active" className="mt-0">
                    {activeDeliveries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeDeliveries.map(delivery => (
                          <DeliveryCard key={delivery.id} delivery={delivery} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">You have no active deliveries</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="completed" className="mt-0">
                    {completedDeliveries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {completedDeliveries.map(delivery => (
                          <DeliveryCard key={delivery.id} delivery={delivery} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">You have no completed deliveries</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="all" className="mt-0">
                    {userDeliveries.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {userDeliveries.map(delivery => (
                          <DeliveryCard key={delivery.id} delivery={delivery} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <p className="text-gray-500">You haven't made any delivery requests yet</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            <CardFooter className="mt-4">
              <Button 
                variant="destructive" 
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardFooter>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
