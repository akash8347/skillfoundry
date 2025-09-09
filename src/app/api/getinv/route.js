import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import JSZip from "jszip";
import Invoice from "../../../models/Invoice";
import { connectDB } from '@/lib/mongodb'

export async function POST(req) {
  try {

    console.log("Connecting to DB...");

    await connectDB();

    const { startDate, endDate } = await req.json();
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); // start of day

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // end of day

    console.log("start: " + start + "end: " + end)
    const invoices = await Invoice.find({
      date: { $gte: start, $lte: end },
    });
    if (!invoices || invoices.length === 0) {
      return Response.json({ message: "No invoiffkjhkbhkhces found" }, { status: 404 });
    }

    // Load template

    // const templatePath = path.join(process.cwd(), "src", "app", "api", "getInvoice", "invoice-final.docx");
    //loop
    // const templatePath = path.join(process.cwd(), "src", "app", "api", "getInvoice", "invoice-final-loop.docx");
    //no-loop
    const templatePath = path.join(process.cwd(), "src", "app", "api", "getinv", "invoice-final-no-loop.docx");



    const templateBuffer = fs.readFileSync(templatePath);

    const files = [];

    for (const inv of invoices) {
      const zip = new PizZip(templateBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        delimiters: { start: "{{", end: "}}" },
      });
              console.log("First item:", inv.items[0]?.sr || "");



      // Map placeholders
      const data = {
        NAME: inv.name,
        EMAIL: inv.email,
        PHONE: inv.phone,
        COUNTRY: inv.country,
        INVOICE: inv.invoiceNumber,
        DATE: inv.date.toLocaleDateString(),

        //for loop
        // i: inv.items.map((item, index) => ({
        //   sr: index + 1,
        //   description: item.description,
        //   hsn: item.hsn,
        //   qty: item.qty,
        //   rate: item.rate,
        //   amount: item.amount,
        // })),

        //no-loop --------------------------
        // First item
        SR1: inv.items[0]?.sr || "",
        DESC1: inv.items[0]?.description || "",
        HSN1: inv.items[0]?.hsn || "",
        QTY1: inv.items[0]?.qty || "",
        RATE1: inv.items[0]?.rate || "",
        AMT1: inv.items[0]?.amount || "",

        // Second item
        SR2: inv.items[1]?.sr || "",
        DESC2: inv.items[1]?.description || "",
        HSN2: inv.items[1]?.hsn || "",
        QTY2: inv.items[1]?.qty || "",
        RATE2: inv.items[1]?.rate || "",
        AMT2: inv.items[1]?.amount || "",

        SUBTOTAL: inv.subTotal,
        TOTAL: inv.total,
        TOTAL_TEXT: inv.totalText,
        CRNC: inv.currency,
      };


      doc.setData(data);
      doc.render();

      const buf = doc.getZip().generate({ type: "nodebuffer" });
      files.push({ name: `${inv.invoiceNumber}.docx`, buffer: buf });
    }

    // Single invoice → return docx directly
    if (files.length === 1) {
      const f = files[0];
      return new Response(f.buffer, {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "Content-Disposition": `attachment; filename="${f.name}"`,
        },
      });
    }

    // Multiple invoices → zip them
    const zip = new JSZip();
    for (const f of files) {
      zip.file(f.name, f.buffer);
    }
    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

    return new Response(zipBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="invoices.zip"',
      },
    });
  } catch (err) {
    console.error("Invoice generation error:", err);
    return Response.json({ error: "Failed to generate invoices" }, { status: 500 });
  }
} 