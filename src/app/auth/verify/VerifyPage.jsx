// app/auth/verify/VerifyPage.jsx
"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) return;

    fetch("/api/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).then(async (res) => {
      if (res.ok) {
        window.location.href = "/download/python-download";
      } else {
        alert("Invalid or expired token.");
        window.location.href = "/login";
      }
    });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
      Verifying...
    </div>
  );
}
