import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import EditorExtensions from './EditorExtensions'

const TextEditor = () => {
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
    return (
        <div className='p-4'>
            <EditorExtensions editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor