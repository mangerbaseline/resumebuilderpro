"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { 
    Bold, 
    Italic, 
    Underline as UnderlineIcon, 
    Heading1, 
    Heading2, 
    List, 
    ListOrdered, 
    AlignLeft, 
    AlignCenter, 
    AlignRight,
    Highlighter,
    Eraser
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const Toolbar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30 dark:bg-slate-900/50">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("bold") ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <Bold size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("italic") ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <Italic size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("underline") ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <UnderlineIcon size={16} />
            </Button>
            
            <div className="w-[1px] h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <Heading1 size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <Heading2 size={16} />
            </Button>

            <div className="w-[1px] h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("bulletList") ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <List size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive("orderedList") ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <ListOrdered size={16} />
            </Button>

            <div className="w-[1px] h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive({ textAlign: "left" }) ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <AlignLeft size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive({ textAlign: "center" }) ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <AlignCenter size={16} />
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                className={`h-8 w-8 p-0 rounded-md transition-colors ${editor.isActive({ textAlign: "right" }) ? "bg-primary/20 text-primary" : "hover:bg-accent"}`}
            >
                <AlignRight size={16} />
            </Button>

            <div className="w-[1px] h-6 bg-border mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
                className="h-8 w-8 p-0 rounded-md hover:bg-accent"
                title="Clear format"
            >
                <Eraser size={16} />
            </Button>
        </div>
    );
};

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Placeholder.configure({
                placeholder: placeholder || "Write your cover letter...",
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "flex-1 p-8 text-base leading-[1.8] font-medium bg-transparent outline-none prose dark:prose-invert max-w-none focus:outline-none min-h-[400px]",
            },
        },
    });

    // Update content if it changes from outside (e.g. after generation)
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
        // use a timeout to avoid editor state conflicts
        setTimeout(() => {
            editor.commands.setContent(content);
        }, 0);
    }

    return (
        <div className="flex flex-col h-full">
            <Toolbar editor={editor} />
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};
