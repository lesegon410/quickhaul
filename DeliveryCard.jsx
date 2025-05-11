
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Package, MapPin, Calendar, Clock, Truck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  accepted: "bg-blue-100 text-blue-800",
  pickup: "bg-purple-100 text-purple-800",
  transit: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const DeliveryCard = ({ delivery }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Card className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300">
        <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex justify-between items-center">
          <div className="flex items-center">
            <Truck className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-lg">{delivery.vehicleType}</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[delivery.status]}`}>
            {delivery.status.charAt(0).toUpperCase() + delivery.status.slice(1)}
          </span>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start space-x-2">
            <Package className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Item Description</p>
              <p className="text-sm text-gray-600">{delivery.itemDescription}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Pickup Location</p>
              <p className="text-sm text-gray-600">{delivery.pickupLocation}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Delivery Location</p>
              <p className="text-sm text-gray-600">{delivery.deliveryLocation}</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">{formatDate(delivery.createdAt)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-500">{formatTime(delivery.createdAt)}</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/track/${delivery.id}`}>Track Delivery</Link>
          </Button>
          <div className="text-right">
            <p className="text-sm font-semibold">${delivery.price.toFixed(2)}</p>
            <p className="text-xs text-gray-500">{delivery.distance} km</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DeliveryCard;
