import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import EditorExtensions from './EditorExtensions'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'

const TextEditor = ({ fileId, triggerSave, setTriggerSave }) => {
    const { user } = useUser()
    const notes = useQuery(api.notes.getNotes, {
        fileId: fileId
    })
    const saveNotes = useMutation(api.notes.AddNotes);

    const editor = useEditor({
        extensions: [StarterKit,
            Highlight,
            Placeholder.configure({
                placeholder: "Start taking Notes..."
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editorProps: {
            attributes: {
                class: "focus:outline-none h-screen pt-3"
            }
        },

    })

    const saveCurrentNotes = async () => {
        const content = editor.getHTML();
        await saveNotes({
            notes: content,
            fileId: fileId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        });
        toast("Document Saved.");
    };
    useEffect(() => {
        editor && editor.commands.setContent(notes)

    }, [notes && editor])

    useEffect(() => {
        if (triggerSave) {
            saveCurrentNotes();
            setTriggerSave(false);
        }
    }, [triggerSave]);
    return (
        <div className='p-4'>
            <EditorExtensions editor={editor} />
            <div className='overflow-scroll h-[87vh]'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}

export default TextEditor