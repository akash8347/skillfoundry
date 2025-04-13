"use client"
import LandingFooter from "@/components/LandingPageComponents/LandingFooter";
import Navbar from "@/lib/myComponents/Navbar";
import Link from "next/link";
export default function RefundPolicy() {
    return (
        <>
        <Navbar/>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
  
        <p className="mb-4">
          Thank you for choosing <strong>Skill Foundry</strong> and enrolling in our 30 Days of Web Design Mastery course at <strong>skill-foundry.in</strong>.
        </p>
  
        <h2 className="text-xl font-semibold mb-2">Digital Products</h2>
        <p className="mb-4">
          Please note that our course and associated resources are delivered as digital products. Once your payment is confirmed and access to the course content has been granted, we do not offer refunds under any circumstances.
        </p>
  
        <p className="mb-4">
          This policy is in place due to the non-tangible and irrevocable nature of digital goods. As soon as you receive access, the full value of the course is delivered.
        </p>
  
        <p className="mb-4">
          We encourage you to review the course curriculum and details before purchasing. If you have any doubts or questions, feel free to reach out to us prior to enrolling.
        </p>
  
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p>
          If you experience any technical issues accessing the course or need assistance, please contact us at{" "}
          <Link href="mailto:support@skill-foundry.in" className="text-blue-600 underline">
            support@skill-foundry.in
          </Link>
          . We're here to help!
        </p>
      </div>
      <LandingFooter/>
      </>
    );
  }
  