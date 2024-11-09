import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function GET(req) {
  try {
    //obtain the request URL
    const { searchParams } = new URL(req.url);
    const pdfUrl = searchParams.get("pdfUrl");

    if (!pdfUrl) {
      return NextResponse.json(
        { error: "Missing 'pdfUrl' query parameter" },
        { status: 400 }
      );
    }

    // Loading PDF from URL
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent += doc.pageContent;
    });

    // Splitting
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 100,
      chunkOverlap: 20,
    });
    const output = await splitter.createDocuments([pdfTextContent]);

    // Collect split text content
    const splitterList = output.map((res) => res.pageContent);

    return NextResponse.json({ result: splitterList });
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "An error occurred processing the PDF." },
      { status: 500 }
    );
  }
}
