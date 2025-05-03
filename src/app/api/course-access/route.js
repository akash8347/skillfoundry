// /app/api/user-materials/route.js
import { NextResponse } from "next/server";
import User from "@/models/User";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
export async function GET(req) {
    const cookieStore = await  cookies()
    const token = cookieStore.get('authToken')?.value
  
    if (!token) return  NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

       const decoded= verifyToken(token)
       const userEmail=decoded.email
  

  const dbUser = await User.findOne({ email: userEmail });

  if (!dbUser || !dbUser.courses) {
    return NextResponse.json({ materials: [] });
  }
  // 🔥 Map each course name to materials
  const courseMaterialMap = {
    python: [
      "30_DAYS_OF_PYTHON.pdf",
      "50_PYTHON_GAME_PROJECTS.pdf",
      "100_PYTHON_PROJECTS.pdf",
      "ARTIFICIAL_INTELLIGENCE_WITH_PYTHON.pdf",
      "AUTOMATION_USING_PYTHON.pdf",
      "WEB_DEVELOPMENT_USING_PYTHON.pdf",
    ],
    javascript: [
      "30_DAYS_OF_JAVASCRIPT.pdf",
      "JS-100-INTERVIEW-QUESTIONS.pdf",
      "JS-100-QUIZ.pdf",
      "CSS.pdf", 
      "HTML.pdf"
    ],
    
  };

  let allowedMaterials = [];

  for (const course of dbUser.courses) {
    if (courseMaterialMap[course.name]) {
      allowedMaterials.push(...courseMaterialMap[course.name]);
    }
  }

  return NextResponse.json({ materials: allowedMaterials });

}
