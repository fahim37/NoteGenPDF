import { chatSession } from '@/app/configs/AIModel'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useAction, useMutation } from 'convex/react'
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Heading3Icon, Highlighter, Italic, Sparkles, Strikethrough } from 'lucide-react'
import { useParams } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

const EditorExtensions = ({ editor }) => {
    const { fileId } = useParams();
    const SearchAI = useAction(api.myActions.search)
    const saveNotes = useMutation(api.notes.AddNotes)
    const { user } = useUser();
    const onAiClick = async () => {
        toast("Ai is generating answer...")
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
        )
        const result = await SearchAI({
            query: selectedText,
            fileId: fileId
        })
        const allUnformattedAns = JSON.parse(result);
        let allUnformattedAnswer = ""
        allUnformattedAns && allUnformattedAns.forEach(item => {
            allUnformattedAnswer = allUnformattedAnswer + item.pageContent
        });
        const PROMPT = "For question:" + selectedText + " give appropriate answer only in HTML format. The answer content is:" + allUnformattedAnswer;
        console.log(PROMPT)

        const AiModelResult = await chatSession.sendMessage(PROMPT);
        const responseText = await AiModelResult.response.text().replace("```", "").replace("html", "").replace("```", "");

        const allText = editor.getHTML();
        editor.commands.setContent(allText + "<p><strong>Answer: </strong></p>" + responseText)
        saveNotes({
            notes: editor.getHTML(),
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })
        toast("Document Saved.")

    }
    return editor && (
        <div>
            <div className="control-group">
                <div className="button-group flex gap-2 flex-wrap">
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'text-blue-600' : ''}
                    >
                        <Heading1 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'text-blue-600' : ''}
                    >
                        <Heading2 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'text-blue-600' : ''}
                    >
                        <Heading3 />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-blue-600' : ''}
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-600' : ''}
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={editor.isActive({ textAlign: 'left' }) ? 'text-blue-600' : ''}
                    >
                        <AlignLeft />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={editor.isActive({ textAlign: 'center' }) ? 'text-blue-600' : ''}
                    >
                        <AlignCenter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={editor.isActive({ textAlign: 'right' }) ? 'text-blue-600' : ''}
                    >
                        <AlignRight />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-blue-600' : ''}
                    >
                        <Strikethrough />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'text-blue-600' : ''}
                    >
                        <Highlighter />
                    </button>
                    <button
                        onClick={() => onAiClick()}
                        className={"hover:text-blue-600 flex items-center gap-2 border p-1 rounded-lg"}
                    >
                        <Sparkles /> <p>GENERATE</p>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default EditorExtensions