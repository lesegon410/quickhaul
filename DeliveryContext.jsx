
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const DeliveryContext = createContext();

export const useDelivery = () => useContext(DeliveryContext);

export const DeliveryProvider = ({ children }) => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Load deliveries from localStorage
    const storedDeliveries = localStorage.getItem("quickhaul_deliveries");
    if (storedDeliveries) {
      setDeliveries(JSON.parse(storedDeliveries));
    }
    setLoading(false);
  }, []);

  // Save deliveries to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("quickhaul_deliveries", JSON.stringify(deliveries));
    }
  }, [deliveries, loading]);

  const createDelivery = (deliveryData) => {
    try {
      const newDelivery = {
        id: "del_" + Math.random().toString(36).substr(2, 9),
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...deliveryData
      };
      
      setDeliveries(prev => [newDelivery, ...prev]);
      
      toast({
        title: "Delivery request created",
        description: `Your delivery request has been created with ID: ${newDelivery.id}`,
      });
      
      return newDelivery;
    } catch (error) {
      toast({
        title: "Failed to create delivery request",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return null;
    }
  };

  const updateDeliveryStatus = (id, status) => {
    try {
      setDeliveries(prev => 
        prev.map(delivery => 
          delivery.id === id 
            ? { 
                ...delivery, 
                status, 
                updatedAt: new Date().toISOString() 
              } 
            : delivery
        )
      );
      
      toast({
        title: "Delivery status updated",
        description: `Delivery ${id} status changed to ${status}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Failed to update delivery status",
        description: error.message || "Please try again",
        variant: "destructive",
      });
      return false;
    }
  };

  const getDeliveryById = (id) => {
    return deliveries.find(delivery => delivery.id === id) || null;
  };

  const getUserDeliveries = (userId) => {
    return deliveries.filter(delivery => delivery.userId === userId);
  };

  const value = {
    deliveries,
    loading,
    createDelivery,
    updateDeliveryStatus,
    getDeliveryById,
    getUserDeliveries,
  };

  return <DeliveryContext.Provider value={value}>{children}</DeliveryContext.Provider>;
};
