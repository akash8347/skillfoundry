"use client"
import JSnavbar from '@/lib/myComponents/JSnavbar'
import Materials from '@/lib/myComponents/Materials'
import React from 'react'
import { useEffect } from 'react';

const page = () => {
   useEffect(() => {
    if (typeof window !== 'undefined' && window.qp) {
      window.qp('track', 'Purchase'); // or 'Purchase' if this is confirmation page
  
    }
        
  }, []);
  return (
    <div>
        <JSnavbar/>
        
        <Materials/>
    </div>
  )
}

export default page