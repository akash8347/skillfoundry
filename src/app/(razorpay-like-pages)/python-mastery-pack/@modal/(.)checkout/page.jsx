// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { Suspense, useState, useEffect } from "react";
// import PYCheckoutForm from "@/components/PYCheckoutForm";

// // -------------------------
// // Framer Motion Variants
// // -------------------------
// const backdropVariants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1 },
// };

// const modalVariants = {
//   hidden: {
//     y: 50,
//     opacity: 0,
//     scale: 0.95,
//   },
//   visible: {
//     y: 0,
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       ease: "easeOut",
//     },
//   },
//   exit: {
//     y: 50,
//     opacity: 0,
//     scale: 0.95,
//     transition: { duration: 0.25 },
//   },
// };

// // -------------------------
// // Modal Component
// // -------------------------
// function CheckoutModalContent() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [skipAnim, setSkipAnim] = useState(false);

//   // 🚨 When returning from upsell, skip open animation
//   useEffect(() => {
//     if (sessionStorage.getItem("returningFromUpsell") === "true") {
//       setSkipAnim(true);
//       sessionStorage.removeItem("returningFromUpsell");
//     }
//   }, []);

//   const closeModal = () => {
//     router.back(); // ✅ Correctly dismisses this modal layer
//   };

//   const initialAnimationState = skipAnim ? "visible" : "hidden";

//   return (
//     <motion.div
//       variants={backdropVariants}
//       initial={initialAnimationState}
//       animate="visible"
//       exit="hidden"
//       className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
//       onClick={closeModal}
//     >
//       <motion.div
//         variants={modalVariants}
//         initial={initialAnimationState}
//         animate="visible"
//         exit="exit"
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] relative overflow-y-auto"
//         onClick={(e) => e.stopPropagation()} // prevent backdrop close
//       >
//         <PYCheckoutForm showCloseButton={true} />
//       </motion.div>
//     </motion.div>
//   );
// }

// // -------------------------
// // Suspense Wrapper
// // -------------------------
// export default function CheckoutModal() {
//   const fallback = (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" />
//   );

//   return (
//     <Suspense fallback={fallback}>
//       <CheckoutModalContent />
//     </Suspense>
//   );
// }


"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Suspense, useState, useEffect } from "react";
import PYCheckoutForm from "@/components/PYCheckoutForm";

// -------------------------
// Framer Motion Variants
// -------------------------
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: {
    y: 50,
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25 },
  },
};

// -------------------------
// Modal Component
// -------------------------
function CheckoutModalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 💡 Read sessionStorage *before* first render (not inside useEffect)
  const initialSkip = typeof window !== "undefined" && sessionStorage.getItem("returningFromUpsell") === "true";
  if (typeof window !== "undefined" && initialSkip) {
    sessionStorage.removeItem("returningFromUpsell");
  }

  const [skipAnim] = useState(initialSkip); // stable from the start

  const closeModal = () => {
    router.back(); // ✅ closes modal
  };

  const initialAnimationState = skipAnim ? "visible" : "hidden";

  return (
    <motion.div
      variants={backdropVariants}
      initial={initialAnimationState}
      animate="visible"
      exit="hidden"
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <motion.div
        variants={modalVariants}
        initial={initialAnimationState}
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] relative overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <PYCheckoutForm showCloseButton={true} />
      </motion.div>
    </motion.div>
  );
}

// -------------------------
// Suspense Wrapper
// -------------------------
export default function CheckoutModal() {
  const fallback = (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" />
  );

  return (
    <Suspense fallback={fallback}>
      <CheckoutModalContent />
    </Suspense>
  );
}
