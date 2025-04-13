// app/auth/verify/page.jsx
import React, { Suspense } from "react";
import VerifyPage from "./VerifyPage"; // your actual VerifyPage component

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyPage />
    </Suspense>
  );
}
