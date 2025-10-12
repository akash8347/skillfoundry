"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import PYCheckoutForm from "@/components/PYCheckoutForm";
import { Suspense } from "react"; // 👈 Import Suspense

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

/**
 * The main component that uses useSearchParams and Framer Motion.
 * Note: This component is wrapped by a Suspense boundary below.
 */
function CheckoutModalContent() {
  const router = useRouter();
  // 🚨 useSearchParams is used here, making this component prone to Suspense errors
  const searchParams = useSearchParams();
  const encryptedCode = searchParams.get("c");

  const returningFromUpsell = searchParams.get("fromUpsell") === "true";

  const closeModal = () => {
    // router.back() is the correct way to dismiss the parallel route
    router.back();
  };

  const initialAnimationState = returningFromUpsell ? "visible" : "hidden";

  return (
    // 1. Backdrop (for the fade-in effect)
    <motion.div
      variants={backdropVariants}
      initial={initialAnimationState}
      animate="visible"
      exit="hidden" // Note: exit property on the parent is often best
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      {/* 2. Modal Content (for the slide-up/scale effect) */}
      <motion.div
        variants={modalVariants} // Apply modal specific variants
        initial={initialAnimationState}
        animate="visible"
        exit="exit" // Specify the exit state
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <PYCheckoutForm showCloseButton={true} />
      </motion.div>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// 🏆 Suspense Wrapper for Vercel/Next.js Deployment
// ----------------------------------------------------------------------

/**
 * Exported component that wraps CheckoutModalContent in a Suspense boundary.
 * This prevents the 'useSearchParams' error during server-side rendering/initial load.
 */
export default function CheckoutModal() {
    // 💡 Minimal Loader/Fallback: A full-screen semi-transparent black
    // overlay is a good default fallback for a modal.
    const fallback = (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            {/* You can add a spinner or simple text here if needed */}
        </div>
    );

    return (
        <Suspense fallback={fallback}>
            <CheckoutModalContent />
        </Suspense>
    );
}