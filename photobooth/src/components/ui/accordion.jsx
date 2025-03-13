import * as React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = ({ children, className }) => {
  return (
    <div className={cn("border rounded-xl overflow-hidden bg-white shadow-md", className)}>
      {children}
    </div>
  );
};

const AccordionItem = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-b last:border-none">
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, toggle: () => setIsOpen(!isOpen) })
      )}
    </div>
  );
};

const AccordionTrigger = ({ children, toggle, isOpen }) => {
  return (
    <button
      className="w-full flex justify-between items-center px-6 py-4 font-medium text-gray-800 hover:bg-gray-100 transition-all duration-300"
      onClick={toggle}
    >
      <span>{children}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-600 transition-transform duration-300" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-600 transition-transform duration-300" />
      )}
    </button>
  );
};

const AccordionContent = ({ children, isOpen }) => {
  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="overflow-hidden px-6 py-3 bg-gray-50 text-gray-700"
    >
      {children}
    </motion.div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
