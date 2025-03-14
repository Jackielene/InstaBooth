import React from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const LegalSection = ({ className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`w-full py-12 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-purple-100/60 to-blue-100/60 backdrop-blur-md ${className}`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-gray-800">
          Legal Information
        </h2>

        <div className="space-y-4 sm:space-y-6">
          <Accordion type="multiple" collapsible className="w-full">
            {/* Terms & Conditions */}
            <AccordionItem 
              value="terms" 
              className="border border-gray-300 rounded-xl overflow-hidden bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="px-5 sm:px-6 py-3 sm:py-4 text-gray-800 font-medium hover:text-purple-600 transition-all">
                Terms & Conditions
              </AccordionTrigger>
              <AccordionContent 
                className="px-6 sm:px-8 pb-5 text-gray-700 leading-relaxed"
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="mb-6">
                  By accessing and using our photo booth services, you agree to abide by the following terms and conditions:
                </p>

                <h3 className="font-semibold text-gray-800 mb-3">1. Usage of Service</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>The service is provided for entertainment purposes only.</li>
                  <li>Users must not upload, share, or distribute illegal, harmful, or offensive content.</li>
                  <li>We reserve the right to refuse service to anyone violating these terms.</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mb-3">2. Intellectual Property</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>All images generated using our service remain the property of the user.</li>
                  <li>By using our service, you grant us permission to temporarily store and process the images.</li>
                </ul>

                <p className="text-gray-600">
                  We reserve the right to modify these terms at any time. Continued use of the service after changes indicates acceptance of the new terms.
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Privacy Policy */}
            <AccordionItem 
              value="privacy" 
              className="border border-gray-300 rounded-xl overflow-hidden bg-white/80 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300"
            >
              <AccordionTrigger className="px-5 sm:px-6 py-3 sm:py-4 text-gray-800 font-medium hover:text-purple-600 transition-all">
                Privacy Policy
              </AccordionTrigger>
              <AccordionContent 
                className="px-6 sm:px-8 pb-5 text-gray-700 leading-relaxed"
                as={motion.div}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <p className="mb-6">Your privacy is important to us. Below is an outline of how we handle your data.</p>

                <h3 className="font-semibold text-gray-800 mb-3">1. Data Collection</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>We collect minimal personal data, such as photos and session metadata, for service functionality.</li>
                  <li>Cookies may be used to enhance user experience on our platform.</li>
                  <li>We do not collect sensitive personal data without explicit consent.</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mb-3">2. Data Storage & Security</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>Photos are stored temporarily and automatically deleted after a predefined period.</li>
                  <li>We implement security measures to protect user data, but we cannot guarantee absolute security.</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mb-3">3. Sharing of Data</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>We do not sell, trade, or rent user data to third parties.</li>
                  <li>We may share limited data with service providers only for operational purposes.</li>
                  <li>Legal requirements may compel us to disclose certain data if necessary.</li>
                </ul>

                <h3 className="font-semibold text-gray-800 mb-3">4. User Rights</h3>
                <ul className="list-disc pl-6 space-y-2 mb-6 text-gray-600">
                  <li>Users have the right to request access to their data.</li>
                  <li>Users may request data deletion at any time by contacting support.</li>
                  <li>Opt-out options are available for tracking cookies and analytics.</li>
                </ul>

                <p>For any privacy concerns or data requests, please contact our support team.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="mt-6 sm:mt-8 text-center text-sm text-gray-500">
          <p>For more information about our legal policies, please contact us.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default LegalSection;
