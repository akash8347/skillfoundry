'use client'

import Image from 'next/image'
import { FaLinkedin, FaGlobe,FaInstagram } from 'react-icons/fa'

export default function YourInstructor() {
  return (
    <section className=" py-10 sm:py-10 px-10 sm:px-6 lg:px-32">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 sm:mb-6">
          Your Instructor
        </h2>

        {/* Wrapper to control width */}
        <div className="w-full sm:w-[75%] mx-auto">
          <div className=" flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-12 border-2 border-dashed border-gray-500 rounded-xl p-8">
            {/* Profile Image */}
            <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
              <Image
                src="/instructor-4x4.jpg"
                alt="Akash Gohil – Instructor"
                width={400}
                height={400}
                className="object-cover w-full h-full"
                priority
              />
            </div>

            {/* Info */}
            <div className="text-center  sm:text-left max-w-md">
              <h3 className="text-2xl font-semibold text-gray-800">
                Akash Gohil
              </h3>
              <p className="text-base text-gray-500 mb-2">
                Software Engineer at NJ Group
              </p>
              <p className="text-gray-600 text-sm mb-4">
                He has completed his Master's in Computer Science and enjoys making web development simple and accessible.
              </p>

              {/* Social Icons */}
              <div className="flex justify-center sm:justify-start gap-5 mt-2">
                <a
                  href="https://www.linkedin.com/in/akash-gohil-196879229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0077b5] hover:scale-110 transition-transform"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://akashgohil.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4b6cb7] hover:scale-110 transition-transform"
                >
                  <FaGlobe className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/akash_gohil_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E1306C] hover:scale-110 transition-transform"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
