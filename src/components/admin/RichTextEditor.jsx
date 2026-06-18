"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import LinkExtension from '@tiptap/extension-link';
import { Bold, Italic, Underline as UnderlineIcon, AlignLeft, AlignCenter, List, Quote, Link as LinkIcon } from 'lucide-react';

const extensions = [
  StarterKit,
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  LinkExtension.configure({
    openOnClick: false,
  }),
];

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions,
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] outline-none ring-0 p-4 text-sm',
      },
    },
  });

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <div className="border border-border rounded-md overflow-hidden bg-white [&_.ProseMirror_p]:my-1 [&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-4 [&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:border-slate-300 [&_.ProseMirror_blockquote]:italic [&_.ProseMirror_a]:text-blue-600 [&_.ProseMirror_a]:underline">
      <div className="flex items-center gap-1 border-b border-border p-2 bg-slate-50 rounded-t-md flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bold') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('italic') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('underline') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <UnderlineIcon className="w-4 h-4" />
        </button>
        
        <div className="w-px h-4 bg-border mx-1" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive({ textAlign: 'left' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive({ textAlign: 'center' }) ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        
        <div className="w-px h-4 bg-border mx-1" />
        
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('bulletList') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('blockquote') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={toggleLink}
          className={`p-1.5 rounded transition-colors ${
            editor.isActive('link') ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-100'
          }`}
        >
          <LinkIcon className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} className="bg-transparent" />
    </div>
  );
}
