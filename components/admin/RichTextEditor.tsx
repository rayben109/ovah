"use client"

import { useRef, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Image from "@tiptap/extension-image"
import {
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, Quote, Minus,
  Link as LinkIcon, Unlink,
  Undo, Redo, CornerDownLeft,
  ImagePlus, Upload, X,
} from "lucide-react"

type Props = {
  content: string
  onChange: (html: string) => void
}

type BtnProps = {
  label: string
  onClick: () => void
  active?: boolean
  children: React.ReactNode
}

function ToolbarBtn({ label, onClick, active, children }: BtnProps) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`p-1.5 rounded text-sm transition ${
        active
          ? "bg-[#182858] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-gray-200 mx-0.5" />
}

export default function RichTextEditor({ content, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imgPanel, setImgPanel] = useState(false)
  const [imgSrc, setImgSrc] = useState("")
  const [imgAlt, setImgAlt] = useState("")
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: "Start writing your post here…" }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "rich-editor-content" },
    },
  })

  if (!editor) return null

  function insertImage() {
    if (!imgSrc.trim()) return
    editor!.chain().focus().setImage({ src: imgSrc.trim(), alt: imgAlt.trim() }).run()
    setImgSrc("")
    setImgAlt("")
    setImgPanel(false)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
      const data = await res.json()
      if (data.url) {
        editor!.chain().focus().setImage({ src: data.url, alt: file.name.replace(/\.[^.]+$/, "") }).run()
        setImgPanel(false)
      }
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  function handleLink() {
    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run()
    } else {
      const url = window.prompt("Enter URL (include https://):")
      if (url) editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const h = (level: 1 | 2 | 3) => ({
    onClick: () => editor.chain().focus().toggleHeading({ level }).run(),
    active: editor.isActive("heading", { level }),
  })

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#29A9DF]">
      {/* ── Toolbar ── */}
      <div className="flex items-center flex-wrap gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50">
        <ToolbarBtn label="Bold" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
          <Bold className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
          <Italic className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}>
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn label="Heading 1" {...h(1)}>
          <span className="text-xs font-bold">H1</span>
        </ToolbarBtn>
        <ToolbarBtn label="Heading 2" {...h(2)}>
          <span className="text-xs font-bold">H2</span>
        </ToolbarBtn>
        <ToolbarBtn label="Heading 3" {...h(3)}>
          <span className="text-xs font-bold">H3</span>
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn label="Bullet list" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
          <List className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
          <Quote className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Horizontal rule" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Line break" onClick={() => editor.chain().focus().setHardBreak().run()}>
          <CornerDownLeft className="h-4 w-4" />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn
          label="Insert image"
          onClick={() => setImgPanel((v) => !v)}
          active={imgPanel}
        >
          <ImagePlus className="h-4 w-4" />
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn label={editor.isActive("link") ? "Remove link" : "Add link"} onClick={handleLink} active={editor.isActive("link")}>
          {editor.isActive("link") ? <Unlink className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
        </ToolbarBtn>

        <Divider />

        <ToolbarBtn label="Undo" onClick={() => editor.chain().focus().undo().run()}>
          <Undo className="h-4 w-4" />
        </ToolbarBtn>
        <ToolbarBtn label="Redo" onClick={() => editor.chain().focus().redo().run()}>
          <Redo className="h-4 w-4" />
        </ToolbarBtn>
      </div>

      {/* ── Image insert panel ── */}
      {imgPanel && (
        <div className="border-b border-gray-200 bg-gray-50 px-3 py-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Insert Image</span>
            <button type="button" onClick={() => setImgPanel(false)} className="text-gray-400 hover:text-gray-600">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Upload from device */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              type="button"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-xs px-3 py-2 bg-[#29A9DF] hover:bg-[#29A9DF]/90 text-white rounded-md transition disabled:opacity-60 w-full justify-center"
            >
              <Upload className="h-3.5 w-3.5" />
              {uploading ? "Uploading…" : "Upload from device"}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="flex-1 h-px bg-gray-200" />
            or enter path
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Manual path */}
          <input
            type="text"
            value={imgSrc}
            onChange={(e) => setImgSrc(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertImage()}
            placeholder="/your-image.jpg"
            className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#29A9DF] bg-white"
          />
          <input
            type="text"
            value={imgAlt}
            onChange={(e) => setImgAlt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertImage()}
            placeholder="Alt text (describe the image)"
            className="text-xs border border-gray-200 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#29A9DF] bg-white"
          />
          <button
            type="button"
            onClick={insertImage}
            disabled={!imgSrc.trim()}
            className="text-xs px-3 py-1.5 bg-[#182858] hover:bg-[#182858]/90 text-white rounded-md transition disabled:opacity-40"
          >
            Insert
          </button>
        </div>
      )}

      {/* Hidden file input handled above */}

      {/* ── Editor area ── */}
      <EditorContent editor={editor} className="bg-white" />
    </div>
  )
}
