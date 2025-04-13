


'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar1 from '@/lib/myComponents/Navbar1'
import { Button } from '@/components/ui/button'

export default function CertificatePage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [alreadyGenerated, setAlreadyGenerated] = useState(null)
  const [allowed, setAllowed] = useState(null)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch('/api/check-certificate-access')
        const data = await res.json()

        if (!data.allowed) {
          setAllowed(false)
        } else {
          setAllowed(true)
          setAlreadyGenerated(data.alreadyGenerated)
          if (data.certificateName) {
            setName(data.certificateName)
          }
        }
      } catch (err) {
        console.error('Error checking access:', err)
        setAllowed(false)
      }
    }

    checkAccess()
  }, [])

  const handleDownload = async () => {
    if (!alreadyGenerated && !name) {
      return alert('Please enter your name')
    }

    setLoading(true)

    const res = await fetch('/api/generate-certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: alreadyGenerated ? null : JSON.stringify({ name }),
    })

    if (!res.ok) {
      setLoading(false)
      return alert('Something went wrong while generating certificate.')
    }

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${alreadyGenerated ? 'your' : name}-certificate.pdf`
    a.click()
    setLoading(false)
  }

  if (allowed === null) return <p className="p-6">Checking access...</p>

  if (allowed === false) {
    return (
      <>
        <Navbar1 />
        <div className="p-6 max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">No Certificates</h1>
          <p className="mb-4">You need to pass the certification exam first.</p>
          <button
            onClick={() => router.push('/certification/instruction')}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go to Exam
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar1 />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Get Your Certificate</h1>

        {alreadyGenerated === null ? (
          <p>Loading...</p>
        ) : alreadyGenerated ? (
          <Button
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? 'Preparing...' : 'Download Certificate'}
          </Button>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name for your certificate"
              className="border p-2 w-full mb-4"
            />
            <Button
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Certificate'}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
