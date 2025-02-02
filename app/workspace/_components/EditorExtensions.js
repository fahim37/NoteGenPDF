import Link from "next/link";
import { chatSession } from "@/app/configs/AIModel";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    Heading1,
    Heading2,
    Heading3,
    Highlighter,
    Italic,
    Sparkles,
    Strikethrough
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const EditorExtensions = ({ editor }) => {
    const { fileId } = useParams();
    const SearchAI = useAction(api.myActions.search);
    const saveNotes = useMutation(api.notes.AddNotes);
    const { user } = useUser();
    const [loading, setLoading] = useState(false);

    const onAiClick = async () => {
        setLoading(true);
        let selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
        );

        if (!selectedText) {
            toast("Please select a text to generate AI answer.");
            setLoading(false);
            return;
        }

        selectedText = selectedText.toLowerCase();
        const result = await SearchAI({
            query: selectedText,
            fileId: fileId
        });

        const allUnformattedAns = JSON.parse(result);
        console.log(allUnformattedAns);
        let allUnformattedAnswer = "";
        allUnformattedAns &&
            allUnformattedAns.forEach(item => {
                allUnformattedAnswer += item.pageContent;
            });

        const PROMPT = `Answer the following question based on the provided content. Question: "${selectedText}". Content: ${allUnformattedAnswer}. Format the response in HTML.`;
        console.log(PROMPT);

        try {
            const AiModelResult = await chatSession.sendMessage(PROMPT);
            let responseText = await AiModelResult.response.text();

            responseText = responseText.replace(/```html|```/g, "").trim();
            const allText = editor.getHTML();
            editor.commands.setContent(allText + "<p><strong>Answer: </strong></p>" + responseText);

            await saveNotes({
                notes: editor.getHTML(),
                fileId: fileId,
                createdBy: user?.primaryEmailAddress?.emailAddress
            });

            toast("Document Saved.");
        } catch (error) {
            console.log('Error fetching AI model response:', error);

            if (error.message.includes('503')) {
                toast.error("The model is overloaded. Please try again later.");
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };


    return editor && (
        <div className="p-2">
            <div className="control-group">
                <div className="button-group flex gap-2 flex-wrap">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`p-2 rounded-md ${editor.isActive('heading', { level: 1 }) ? 'text-blue-600' : ''}`}
                    >
                        <Heading1 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={`p-2 rounded-md ${editor.isActive('heading', { level: 2 }) ? 'text-blue-600' : ''}`}
                    >
                        <Heading2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={`p-2 rounded-md ${editor.isActive('heading', { level: 3 }) ? 'text-blue-600' : ''}`}
                    >
                        <Heading3 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded-md ${editor.isActive('bold') ? 'text-blue-600' : ''}`}
                    >
                        <Bold className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded-md ${editor.isActive('italic') ? 'text-blue-600' : ''}`}
                    >
                        <Italic className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 rounded-md ${editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''}`}
                    >
                        <AlignLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 rounded-md ${editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''}`}
                    >
                        <AlignCenter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-2 rounded-md ${editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''}`}
                    >
                        <AlignRight className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`p-2 rounded-md ${editor.isActive('strike') ? 'text-blue-600' : ''}`}
                    >
                        <Strikethrough className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={`p-2 rounded-md ${editor.isActive('highlight') ? 'text-blue-600' : ''}`}
                    >
                        <Highlighter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => onAiClick()}
                        disabled={loading}
                        className="p-2 rounded-md flex items-center gap-1 border hover:text-blue-600"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="hidden sm:inline">{loading ? "GENERATING..." : "GENERATE"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditorExtensions;
