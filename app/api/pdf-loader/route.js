import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

function preprocessText(text) {
  let processedText = text.toLowerCase();
  processedText = processedText.replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width characters
  processedText = processedText.replace(/[^a-z0-9\s,.?!-]/gi, ''); // Keep alphanumeric and common punctuation
  processedText = processedText.replace(/\s{2,}/g, ' ').trim(); // Collapse multiple spaces into one


  const stopwords = ["and", "the", "is", "in", "at", "of", "a", "to", "for", "with", "on"];
  processedText = processedText.split(" ")
    .filter(word => !stopwords.includes(word))
    .join(" ");

  return processedText;
}


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const pdfUrl = searchParams.get("pdfUrl");

    if (!pdfUrl) {
      return NextResponse.json(
        { error: "Missing 'pdfUrl' query parameter" },
        { status: 400 }
      );
    }

    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const loader = new WebPDFLoader(blob);
    const docs = await loader.load();

    let pdfTextContent = "";
    docs.forEach((doc) => {
      pdfTextContent += preprocessText(doc.pageContent);
    });

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 300,
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([pdfTextContent]);

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
