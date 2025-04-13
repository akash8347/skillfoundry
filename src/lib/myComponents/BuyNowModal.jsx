'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';

export default function BuyNowModal({ open, setOpen }) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 max-w-lg md:max-w-xl lg:max-w-2xl w-full md:right-0 md:top-0 md:fixed md:h-full md:overflow-y-auto md:shadow-lg md:border-l">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">Billing Details</h2>
          <button onClick={() => setOpen(false)} className="text-xl">×</button>
        </div>
        <img src="/book-0.png" alt="30 Days Web Design Mastery" className="w-full max-w-xs mx-auto mt-4" />
        <h3 className="text-2xl font-semibold mt-4">30 Days Web Design Mastery</h3>
        <p className="text-lg text-gray-700">₹499</p>
        <form className="mt-4 space-y-4">
          <input type="text" placeholder="Enter name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Enter email" className="w-full p-2 border rounded" />
          <input type="tel" placeholder="Enter phone number" className="w-full p-2 border rounded" />
          <button className="w-full text-lg font-medium p-3 bg-blue-600 text-white rounded">
            Buy Now
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
