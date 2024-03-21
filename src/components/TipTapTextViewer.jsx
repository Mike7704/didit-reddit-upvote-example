"use client";

import { EditorContent } from "@tiptap/react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import "@/styles/tiptap.css";

const Tiptap = ({ content }) => {
  const editor = new Editor({
    content: content,
    editable: false,
    extensions: [StarterKit, Markdown],
  });

  return <EditorContent editor={editor} />;
};

export default Tiptap;
