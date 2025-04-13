import React from 'react'
import { Button } from '../ui/button'

const StickyBuyNow = ({ setCheckoutOpen }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full md:hidden bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-50">
      <div>
        <div className="text-lg font-bold text-black">
          ₹499
          <span className="text-sm line-through text-gray-500 ml-2">₹4999</span>
        </div>
        <div className="text-green-600 text-sm font-medium">90% off</div>
      </div>
      <Button
        className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-6 rounded"
        onClick={() => setCheckoutOpen(true)}
      >
        Buy Now
      </Button>
    </div>
  )
}

export default StickyBuyNow
