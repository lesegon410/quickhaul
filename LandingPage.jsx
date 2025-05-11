
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, Package, MapPin, Clock, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Quick & Reliable Delivery Services At Your Fingertips
              </h1>
              <p className="text-xl text-blue-100">
                Connect with nearby trucks, bakkies, and lorries for all your pickup and delivery needs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-blue-50">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-64 sm:h-80 lg:h-96">
                <img  alt="Delivery truck on the road" className="rounded-lg shadow-2xl object-cover w-full h-full" src="https://images.unsplash.com/photo-1655121894640-bdaf2b4c4a29" />
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-xl"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Real-time Tracking</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeIn}
              className="text-3xl font-bold text-gray-900"
            >
              How QuickHaul Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Get your items delivered in just a few simple steps
            </motion.p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Request a Pickup</h3>
              <p className="text-gray-600">Enter your pickup and delivery locations, along with details about your items.</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Connected</h3>
              <p className="text-gray-600">We'll match you with nearby available vehicles suitable for your delivery needs.</p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Track & Receive</h3>
              <p className="text-gray-600">Track your delivery in real-time and receive your items at your specified location.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Vehicle Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeIn}
              className="text-3xl font-bold text-gray-900"
            >
              Vehicle Types for Every Need
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              From small packages to large furniture, we've got you covered
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img  alt="Bakkie for small deliveries" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1655121894640-bdaf2b4c4a29" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bakkie</h3>
                <p className="text-gray-600 mb-4">Perfect for small to medium items, furniture, and appliances.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Up to 1 ton capacity
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Ideal for residential moves
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Cost-effective solution
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img  alt="Truck for medium deliveries" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1646996118289-89239fc41abe" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Truck</h3>
                <p className="text-gray-600 mb-4">Suitable for larger items and multiple furniture pieces.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> 2-5 ton capacity
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Great for office relocations
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Enclosed cargo area
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white rounded-xl overflow-hidden shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img  alt="Lorry for large deliveries" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1660619388248-baec8fd3f973" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lorry</h3>
                <p className="text-gray-600 mb-4">For heavy-duty and commercial transportation needs.</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> 5+ ton capacity
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Ideal for commercial goods
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <span className="mr-2 text-green-500">✓</span> Long-distance capability
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              {...fadeIn}
              className="text-3xl font-bold text-gray-900"
            >
              What Our Customers Say
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  alt="Customer testimonial" className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1684262855344-b9da453a7934" />
                </div>
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"QuickHaul made moving my furniture so easy! I found a bakkie within minutes and my items were delivered safely and on time."</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  alt="Customer testimonial" className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1523278669709-c05da80b6a65" />
                </div>
                <div>
                  <h4 className="font-semibold">Michael Patel</h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"As a small business owner, I rely on QuickHaul for all my product deliveries. Their service is consistently reliable and professional."</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img  alt="Customer testimonial" className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1684422286562-5dc6f3d0886a" />
                </div>
                <div>
                  <h4 className="font-semibold">Thandi Nkosi</h4>
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
              <p className="text-gray-600 italic">"I needed to transport building materials urgently, and QuickHaul connected me with a lorry in my area within an hour. Excellent service!"</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6"
          >
            Ready to Simplify Your Delivery Needs?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Join thousands of satisfied customers who trust QuickHaul for their transportation requirements.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button size="lg" asChild className="bg-white text-blue-700 hover:bg-blue-50">
              <Link to="/register">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
