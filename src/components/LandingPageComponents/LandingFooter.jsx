import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const LandingFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-6 mt-auto">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
      <div>
        <Image
          src="/logo.jpg"
          alt="Skill Foundry Logo"
          width={153}
          height={38}
          className="mb-4"
        />
        <p className="text-sm text-gray-600">
          Master coding with hands-on courses and certifications from Skill Foundry.
        </p>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Quick Links</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/download/js-download">Dashboard</Link></li>
          <li><Link href="#courses">Courses</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2 text-gray-800">Legal</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
          <li><Link href="/privacy-policy">Privacy Policy</Link></li>
          <li><Link href="/refund-policy">Refund Policy</Link></li>
          <li><Link href="/about-us">About us</Link></li>
          <li><Link href="/operational-address">Operational Address</Link></li>
          <li><Link href="/Contact-us">Contact us</Link></li>
        </ul>
      </div>
    </div>
    <div className="mt-8 text-center text-xs text-gray-400">
      &copy; {new Date().getFullYear()} Skill Foundry. All rights reserved.
    </div>
  </footer>

  )
}

export default LandingFooter