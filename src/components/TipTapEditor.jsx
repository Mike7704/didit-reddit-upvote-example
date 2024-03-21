"use client";

import { EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Editor } from "@tiptap/core";
import { Markdown } from "tiptap-markdown";
import "@/styles/tiptap.css";

const Tiptap = () => {
  const editor = new Editor({
    extensions: [
      StarterKit,
      Markdown,
      Placeholder.configure({
        placeholder: "Post content",
      }),
    ],
    editorProps: {
      attributes: {
        name: "content",
      },
    },
  });

  return <EditorContent editor={editor} name="content" className="bg-white text-black px-3 py-2 rounded" />;
};

export default Tiptap;
