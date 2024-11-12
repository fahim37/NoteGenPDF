"use node";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { TaskType } from "@google/generative-ai"
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText:v.any(),
    fileId: v.string()
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      {fileId:args.fileId},
      new GoogleGenerativeAIEmbeddings({
        apiKey:"AIzaSyB-5V1jbRF5WeIZMNK0GZmqcUEMy5JDFN0",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed.."
  },
});
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey:"AIzaSyB-5V1jbRF5WeIZMNK0GZmqcUEMy5JDFN0",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
       { ctx });

       const results = await vectorStore.similaritySearch(args.query, 3);
       const filteredResults = results
         .filter(doc => doc.metadata.fileId === args.fileId || doc.score > 0.85)
         .sort((a, b) => b.score - a.score); 
       console.log(filteredResults);
       return JSON.stringify(filteredResults);
       
  },
});