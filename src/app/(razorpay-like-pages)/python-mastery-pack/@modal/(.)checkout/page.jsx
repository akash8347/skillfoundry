// "use client";
// import { useRouter, useSearchParams } from "next/navigation";
// import PYCheckoutForm from "@/components/PYCheckoutForm";

// export default function CheckoutModal() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const encryptedCode = searchParams.get("c");

//   const closeModal = () => {
//      router.back();
//   };

//   return (
//     <div
//       // Full screen overlay for backdrop
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
//       onClick={closeModal}
//     >
//       <div
//         // **KEY CHANGE**: Fixed width, max height, and auto overflow.
//         // max-w-lg (or sm/md/xl) makes it a floating box.
//         // We removed sm:h-[90vh] to stop it from taking up the whole screen height on small devices.
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] relative overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <PYCheckoutForm showCloseButton={true} /> {/* Let PYCheckoutForm handle the close button */}
//       </div>

//       {/* The separate close button is redundant if the component has one, 
//           but if you prefer this one for styling, keep it. 
//           I'll remove it since I've added one inside the form component below. */}
     
//     </div>
//   );
// }


"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion"; // 👈 Import motion
import PYCheckoutForm from "@/components/PYCheckoutForm";

// Define Framer Motion variants for the modal content
const backdropVariants = {
  // Initial state (hidden)
  hidden: { opacity: 0 },
  // Visible state
  visible: { opacity: 1 },
};

const modalVariants = {
  // Initial state: starts small and slightly below center
  hidden: { 
    y: "50px", 
    opacity: 0, 
    scale: 0.95 
  },
  // Visible state: snaps to final position
  visible: {
    y: "0", 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3, // Standard, not too fast, not too slow
      ease: "easeOut",
    },
  },
  // Exit state (for when the modal is dismissed)
  exit: { 
    y: "50px", 
    opacity: 0, 
    scale: 0.95,
    transition: { 
        duration: 0.25 
    }
  },
};

export default function CheckoutModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const encryptedCode = searchParams.get("c");

  const closeModal = () => {
    // router.back() is the correct way to dismiss the parallel route
    router.back();
  };

  return (
    // 1. Backdrop (for the fade-in effect)
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Note: exit property on the parent is often best
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" 
      onClick={closeModal}
    >
      {/* 2. Modal Content (for the slide-up/scale effect) */}
      <motion.div
        variants={modalVariants} // Apply modal specific variants
        initial="hidden"
        animate="visible"
        exit="exit" // Specify the exit state
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <PYCheckoutForm showCloseButton={true} /> 
      </motion.div>
    </motion.div>
  );
}