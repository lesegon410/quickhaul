
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Package, Clock, MapPin, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeliveryCard from "@/components/DeliveryCard";
import { useAuth } from "@/context/AuthContext";
import { useDelivery } from "@/context/DeliveryContext";

const Dashboard = () => {
  const { user } = useAuth();
  const { deliveries, loading } = useDelivery();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDeliveries, setFilteredDeliveries] = useState([]);
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Filter deliveries based on search term and status
  useEffect(() => {
    if (!deliveries) return;
    
    const filtered = deliveries.filter(delivery => {
      const matchesSearch = 
        delivery.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.itemDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
    
    setFilteredDeliveries(filtered);
  }, [deliveries, searchTerm]);

  const getDeliveriesByStatus = (status) => {
    if (status === "all") return filteredDeliveries;
    return filteredDeliveries.filter(delivery => delivery.status === status);
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your delivery requests</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 md:mt-0"
          >
            <Button asChild>
              <Link to="/request" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                New Delivery Request
              </Link>
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search deliveries by location or description..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6 bg-white shadow-sm">
              <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
              <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
              <TabsTrigger value="accepted" className="flex-1">Accepted</TabsTrigger>
              <TabsTrigger value="transit" className="flex-1">In Transit</TabsTrigger>
              <TabsTrigger value="delivered" className="flex-1">Delivered</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <DeliveryList deliveries={getDeliveriesByStatus("all")} />
            </TabsContent>
            
            <TabsContent value="pending" className="mt-0">
              <DeliveryList deliveries={getDeliveriesByStatus("pending")} />
            </TabsContent>
            
            <TabsContent value="accepted" className="mt-0">
              <DeliveryList deliveries={getDeliveriesByStatus("accepted")} />
            </TabsContent>
            
            <TabsContent value="transit" className="mt-0">
              <DeliveryList deliveries={getDeliveriesByStatus("transit")} />
            </TabsContent>
            
            <TabsContent value="delivered" className="mt-0">
              <DeliveryList deliveries={getDeliveriesByStatus("delivered")} />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {filteredDeliveries.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No deliveries found</h3>
            <p className="text-gray-600 mb-6">You haven't made any delivery requests yet.</p>
            <Button asChild>
              <Link to="/request">Create Your First Delivery Request</Link>
            </Button>
          </motion.div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

const DeliveryList = ({ deliveries }) => {
  if (deliveries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No deliveries in this category</h3>
        <p className="text-gray-500 mt-1">Try a different filter or create a new delivery request</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deliveries.map((delivery, index) => (
        <DeliveryCard key={delivery.id} delivery={delivery} />
      ))}
    </div>
  );
};

export default Dashboard;
