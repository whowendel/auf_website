// Minimal Tiptap-JSON renderer for wireframe / read-only views.
// Handles the node types the wireframe editor emits: doc / paragraph / text /
// heading / bullet_list / list_item / hard_break.
import * as React from "react";

type Node = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: Node[];
  text?: string;
  marks?: { type: string }[];
};

function renderNode(node: Node, key: number): React.ReactNode {
  switch (node.type) {
    case "doc":
      return (
        <div key={key} className="prose prose-neutral max-w-none">
          {node.content?.map((c, i) => renderNode(c, i))}
        </div>
      );
    case "paragraph":
      return <p key={key}>{node.content?.map((c, i) => renderNode(c, i))}</p>;
    case "heading": {
      const level = Number(node.attrs?.level ?? 2);
      const Tag = (`h${Math.min(Math.max(level, 1), 6)}`) as keyof React.JSX.IntrinsicElements;
      return <Tag key={key}>{node.content?.map((c, i) => renderNode(c, i))}</Tag>;
    }
    case "bulletList":
      return <ul key={key}>{node.content?.map((c, i) => renderNode(c, i))}</ul>;
    case "orderedList":
      return <ol key={key}>{node.content?.map((c, i) => renderNode(c, i))}</ol>;
    case "listItem":
      return <li key={key}>{node.content?.map((c, i) => renderNode(c, i))}</li>;
    case "hardBreak":
      return <br key={key} />;
    case "text": {
      let node$ = (<>{node.text}</>) as React.ReactNode;
      for (const m of node.marks ?? []) {
        if (m.type === "bold") node$ = <strong>{node$}</strong>;
        if (m.type === "italic") node$ = <em>{node$}</em>;
        if (m.type === "code") node$ = <code>{node$}</code>;
      }
      return <React.Fragment key={key}>{node$}</React.Fragment>;
    }
    default:
      return null;
  }
}

export function PostContent({ doc }: { doc: unknown }) {
  if (!doc || typeof doc !== "object") return null;
  return <>{renderNode(doc as Node, 0)}</>;
}
