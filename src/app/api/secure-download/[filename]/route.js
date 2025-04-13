import path from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

// Fake login check — replace this with real logic
function isUserLoggedIn(req) {
  // Use cookies, headers, session here
  return true; // Set to false to test unauthorized access
}

export async function GET(req, { params }) {
  const { filename } = await params;

  // const isAuthenticated = isUserLoggedIn(req);
  // if (!isAuthenticated) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

    const cookieStore = await  cookies()
    const token = cookieStore.get('authToken')?.value
  
    if (!token) return  NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const filePath = path.join(process.cwd(), "private-pdfs", filename);

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
