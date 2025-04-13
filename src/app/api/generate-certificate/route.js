

// /api/generate-certificate/route.js

import { NextResponse } from 'next/server'
import { PDFDocument, rgb } from 'pdf-lib'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import fontkit from '@pdf-lib/fontkit'
import User from '@/models/User'
import { connectDB } from '@/lib/mongodb'

function generateCertificateId() {
  const now = new Date()
  return `WD-${now.getFullYear()}${(now.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${now
    .getDate()
    .toString()
    .padStart(2, '0')}-${Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, '0')}`
}

export async function POST(req) {
  try {
    await connectDB()

    const cookies = req.headers.get('cookie') || ''
    const token = cookies
      .split(';')
      .find((c) => c.trim().startsWith('authToken='))?.split('=')[1]

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET)
    const email = decoded.email

    const user = await User.findOne({ email })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    let name

    // If not generated before, get name from body and store
    if (!user.certificateGenerated) {
      const body = await req.json()
      name = body.name?.trim()

      if (!name) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 })
      }

      user.certificateName = name
      user.certificateGenerated = true
      user.certificateNumber = user.certificateNumber || generateCertificateId()
      await user.save()
    } else {
      // If already generated, use stored name
      name = user.certificateName
    }

    const certificateId = user.certificateNumber

    // const templatePath = path.join(process.cwd(), 'public', 'certificate-template.pdf')
    const templatePath = path.join(process.cwd(), 'private-pdfs', 'certificate-template.pdf');

    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'Vollkorn-Regular.ttf')

    const existingPdfBytes = fs.readFileSync(templatePath)
    const fontBytes = fs.readFileSync(fontPath)

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)

    const customFont = await pdfDoc.embedFont(fontBytes)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    const nameText = name.toUpperCase()
    const fontSize = 50
    const textWidth = customFont.widthOfTextAtSize(nameText, fontSize)
    const x = (firstPage.getWidth() - textWidth) / 2
    const y = 315

    firstPage.drawText(nameText, {
      x,
      y,
      size: fontSize,
      font: customFont,
      color: rgb(0.1, 0.1, 0.1),
    })

    // Certificate ID
    firstPage.drawText(certificateId, {
      x: firstPage.getWidth() - 180,
      y: firstPage.getHeight() - 60,
      size: 12,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    })

    // Date
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    firstPage.drawText(currentDate, {
      x: firstPage.getWidth() - 180,
      y: firstPage.getHeight() - 75,
      size: 10,
      font: customFont,
      color: rgb(0.4, 0.4, 0.4),
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${nameText}-certificate.pdf"`,
      },
    })
  } catch (error) {
    console.error('PDF Generation Error:', error)
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 })
  }
}
