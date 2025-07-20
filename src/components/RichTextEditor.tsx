'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Link as LinkIcon,
  Unlink
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null
  }

  const setLink = () => {
    const url = window.prompt('URL')
    if (url) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }
  }

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
  }

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-gray-50">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('bold') ? 'bg-gray-700' : ''}`}
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('italic') ? 'bg-gray-700' : ''}`}
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('underline') ? 'bg-gray-700' : ''}`}
        title="Underline"
      >
        <UnderlineIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('bulletList') ? 'bg-gray-700' : ''}`}
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('orderedList') ? 'bg-gray-700' : ''}`}
        title="Numbered List"
      >
        <ListOrdered className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700' : ''}`}
        title="Align Left"
      >
        <AlignLeft className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700' : ''}`}
        title="Align Center"
      >
        <AlignCenter className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700' : ''}`}
        title="Align Right"
      >
        <AlignRight className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1"></div>

      <button
        onClick={setLink}
        className={`p-2 rounded bg-black text-white hover:bg-gray-800 ${editor.isActive('link') ? 'bg-gray-700' : ''}`}
        title="Add Link"
      >
        <LinkIcon className="w-4 h-4" />
      </button>
      
      <button
        onClick={removeLink}
        disabled={!editor.isActive('link')}
        className="p-2 rounded bg-black text-white hover:bg-gray-800 disabled:opacity-50 disabled:hover:bg-black"
        title="Remove Link"
      >
        <Unlink className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function RichTextEditor({ value, onChange, placeholder, className = '' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: placeholder || 'Start typing...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'p-3 min-h-[200px] focus:outline-none',
        style: 'color: #1f2937; background-color: white;',
      },
    },
    immediatelyRender: false,
  })

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden bg-white ${className}`}>
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="prose prose-sm max-w-none"
        style={{
          color: '#1f2937',
          backgroundColor: 'white',
        }}
      />
    </div>
  )
} 