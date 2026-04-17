import { Fragment, type ReactNode } from "react";

/**
 * Minimal inline markdown renderer for **bold** and *italic*.
 * Used for content.json copy where we want simple emphasis without a full markdown lib.
 */
export function renderInlineMarkdown(text: string): ReactNode {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return tokens.map((token, i) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return (
        <strong key={i} className="text-ink">
          {token.slice(2, -2)}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={i} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{token}</Fragment>;
  });
}
