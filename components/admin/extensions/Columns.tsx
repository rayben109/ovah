"use client"

import { Node, mergeAttributes, NodeViewWrapper, NodeViewContent, ReactNodeViewRenderer } from "@tiptap/react"
import type { NodeViewProps } from "@tiptap/react"
import { Trash2 } from "lucide-react"

// ── Column child node ─────────────────────────────────────────────────────────
// No NodeView — ProseMirror renders it directly via renderHTML.

export const Column = Node.create({
  name: "column",
  group: "column",
  content: "block+",
  isolating: true,

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "column", class: "column-item" }),
      0,
    ]
  },
})

// ── Columns wrapper NodeView ──────────────────────────────────────────────────

function ColumnsNodeView({ node, deleteNode }: NodeViewProps) {
  const cols = node.attrs.cols as number

  return (
    <NodeViewWrapper className="relative my-6 group">
      {/* Hover toolbar */}
      <div className="absolute -top-7 left-0 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <span className="text-[10px] uppercase tracking-wide text-gray-400 bg-white border border-gray-200 rounded px-2 py-0.5 select-none">
          {cols}-column layout
        </span>
        <button
          type="button"
          onClick={deleteNode}
          className="flex items-center gap-1 text-[10px] text-red-400 hover:text-red-600 bg-white border border-red-200 rounded px-2 py-0.5 transition-colors"
        >
          <Trash2 className="h-2.5 w-2.5" />
          Remove
        </button>
      </div>

      {/* Column content area — dashed outline visible only in editor */}
      <NodeViewContent
        className={`columns-layout columns-${cols} rounded-lg border border-dashed border-gray-200 p-3 gap-3`}
      />
    </NodeViewWrapper>
  )
}

// ── Columns wrapper extension ─────────────────────────────────────────────────

export const Columns = Node.create({
  name: "columns",
  group: "block",
  content: "column+",
  isolating: true,

  addAttributes() {
    return {
      cols: {
        default: 2,
        parseHTML: (el) => parseInt((el as HTMLElement).getAttribute("data-cols") ?? "2"),
        renderHTML: (attrs) => ({ "data-cols": attrs.cols }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="columns"]' }]
  },

  renderHTML({ HTMLAttributes, node }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "columns",
        class: `columns-layout columns-${node.attrs.cols}`,
      }),
      0,
    ]
  },

  addNodeView() {
    return ReactNodeViewRenderer(ColumnsNodeView)
  },
})
