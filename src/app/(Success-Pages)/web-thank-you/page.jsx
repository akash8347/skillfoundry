// components/SuccessCard.jsx

export default function SuccessCard() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
          {/* Logo */}
          <div className="mb-6">
            <img
              src="/logo.png" // replace with your actual path
              alt="Logo"
              className="mx-auto h-16"
            />
          </div>
  
          {/* Green Check Icon */}
          <div className="flex justify-center mb-4">
            <svg
              className="h-14 w-14 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
  
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Thank You for Your Purchase!
          </h2>
  
          {/* Subtext */}
          <p className="text-gray-600 mb-6">
            Your 30 days web design pack is now ready to download.
          </p>
  
          {/* Download Button */}
          <a
            href="/https://drive.google.com/drive/folders/1S5SjSt2jWIeWSTOCUT78k-kvo8maLle8?usp=sharing" // update this
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Download Now
          </a>
  
          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>
  
          {/* Footer */}
          <p className="text-sm text-gray-600">
            Need help? Contact us at{' '}
            <a
              href="mailto:coding.hub024@gmail.com"
              className="text-blue-600 hover:underline"
            >
              coding.hub024@gmail.com
            </a>
          </p>
  
          <p className="text-xs text-gray-400 mt-2">
            © 2025 Coding Hub. All rights reserved.
          </p>
        </div>
      </div>
    );
  }
  