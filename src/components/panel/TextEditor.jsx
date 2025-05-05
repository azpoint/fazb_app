"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

//Styles
import "@mdxeditor/editor/style.css"; //Styles for the editor UI
import "@/src/styles/components/inEditor-styles.css" //Essential styles for the editor to work properly

// Dynamically import the editor to avoid SSR issues
const MDXEditor = dynamic(
    () => import("@mdxeditor/editor").then((mod) => mod.MDXEditor),
    {
        ssr: false,
    }
);

import {
    headingsPlugin,
	BlockTypeSelect,
    quotePlugin,
    listsPlugin,
    thematicBreakPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    toolbarPlugin,
    CreateLink,
    linkDialogPlugin,
    imagePlugin,
    InsertImage,
    InsertThematicBreak,
	markdownShortcutPlugin,
	Separator,
	ListsToggle,
	linkPlugin,
} from "@mdxeditor/editor";


export default function MDXEditorWrapper({ onChange }) {
    const [markdown, setMarkdown] = useState("Escribe aquí las **descripciones o notas** de tu obra...");

    return (
        <div
            style={{ padding: "1rem", background: "oklch(97% 0.001 106.424)", borderRadius: '0.5rem' }}
        >
            <MDXEditor
                markdown={markdown}
                plugins={[
                    headingsPlugin(),
                    quotePlugin(),
                    listsPlugin(),
                    thematicBreakPlugin(),
                    linkDialogPlugin(),
                    imagePlugin(),
					markdownShortcutPlugin(),
					linkPlugin(),
                    toolbarPlugin({
                        toolbarClassName: "mdx-toolbar",
                        toolbarContents: () => (
                            <>
                                <UndoRedo />
								<Separator />
								<BlockTypeSelect />
								<Separator />
                                <BoldItalicUnderlineToggles />
								<Separator />
								<ListsToggle />
								<Separator />
                                <CreateLink />
                                <InsertImage />
                                <InsertThematicBreak />
                            </>
                        ),
                    }),
                ]}
                onChange={(newMarkdown) => {
                    setMarkdown(newMarkdown);
                    if (onChange) onChange(newMarkdown);
                }}
            />
        </div>
    );
}


// Use it with:

// "@mdxeditor/editor": "^3.31.0"