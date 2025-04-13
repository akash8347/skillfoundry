"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar1 from "@/lib/myComponents/Navbar1";

export default function CertificationInstructionsPage() {
  const router = useRouter();

  const [allowed, setAllowed] = useState(null);
  const [alreadyGenerated, setAlreadyGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/check-certificate-access");
        const data = await res.json();

        if (!data.allowed) {
          setAllowed(false);
        } else {
          setAllowed(true);
          setAlreadyGenerated(data.alreadyGenerated);
          if (data.certificateName) {
            setName(data.certificateName);
          }
        }
      } catch (err) {
        console.error("Error checking access:", err);
        setAllowed(false);
      }
    };

    checkAccess();
  }, []);

  const handleDownload = async () => {
    if (!alreadyGenerated && !name) {
      return alert("Please enter your name");
    }

    setLoading(true);

    const res = await fetch("/api/generate-certificate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: alreadyGenerated ? null : JSON.stringify({ name }),
    });

    if (!res.ok) {
      setLoading(false);
      return alert("Something went wrong while generating certificate.");
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${alreadyGenerated ? "your" : name}-certificate.pdf`;
    a.click();
    setLoading(false);
  };

  const handleStartExam = () => {
    router.push("/certification/exam");
  };

  const handleCancelExam = () => {
    router.push("/Dashboard/welcome");
  };

  if (allowed === null) {
    return (
      <>
        <Navbar1 />
        <div className="p-6 text-center">Checking your certification status...</div>
      </>
    );
  }

  return (
    <>
      <Navbar1 />
      <div className="max-w-2xl mx-auto p-6">
        {allowed ? (
          <>
            <h2 className="text-2xl font-bold mb-4">You've already passed the exam! 🎉</h2>
            <p className="mb-4">You can download your certificate below.</p>

            {alreadyGenerated === null ? (
              <p>Loading certificate info...</p>
            ) : alreadyGenerated ? (
              <Button onClick={handleDownload} disabled={loading}>
                {loading ? "Preparing..." : "Download Certificate"}
              </Button>
            ) : (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name for certificate"
                  className="border p-2 w-full mb-4"
                />
                <Button onClick={handleDownload} disabled={loading}>
                  {loading ? "Generating..." : "Generate Certificate"}
                </Button>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">Certification Exam Instructions</h2>
            <ul className="list-disc ml-6 space-y-2 mb-6 text-gray-700">
              <li>This exam contains <strong>50 multiple choice questions</strong>.</li>
              <li>You must score at least <strong>25 correct answers</strong> (50%) to pass.</li>
              <li>Once started, <strong>do not leave or refresh</strong> the exam. Doing so will reset your progress.</li>
              <li>You can take the test only when you provide your <strong>full name</strong> below. This will be printed on your certificate and cannot be changed later.</li>
            </ul>

            <Button onClick={handleStartExam}>Start Exam</Button>
            <Button className="ml-5" variant="secondary" onClick={handleCancelExam}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </>
  );
}
