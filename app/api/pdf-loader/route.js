import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const pdfUrl =
  "https://uncommon-anteater-380.convex.cloud/api/storage/ab1b7d2f-a1f7-469f-a6d0-ef5493424046";
export async function GET(req) {
  //loading pdf
  const response = await fetch(pdfUrl);
  const blob = await response.blob();
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });
  //splitting the text into smaller chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });
  const output = await splitter.createDocuments([pdfTextContent]);
  let splitterList = [];
  output.forEach((res) => {
    splitterList.push(res.pageContent);
  });

  return NextResponse.json({ res: splitterList });
}
