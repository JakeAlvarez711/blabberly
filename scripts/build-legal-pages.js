#!/usr/bin/env node
// Builds the static legal pages under public/ from their Markdown sources in
// docs/legal/. The Markdown files are the source of record; edit those, run
// `node scripts/build-legal-pages.js`, and commit both.
//
// Supported Markdown: one `# Title`, a following `Effective:` line (rendered
// as the grey "updated" line), `## ` and `### ` headings, paragraphs, `- `
// bullets, `1. ` numbered lists, `> ` blockquotes (rendered as the orange
// summary box), pipe tables, `---` rules, and inline **bold**, `code`, and
// [links](url). No dependencies.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const PAGES = [
  { md: "docs/legal/privacy-policy.md", html: "public/privacy/index.html", title: "Privacy Policy - Blabberly" },
  { md: "docs/legal/terms-of-service.md", html: "public/terms/index.html", title: "Terms of Service - Blabberly" },
  { md: "docs/legal/community-guidelines.md", html: "public/guidelines/index.html", title: "Community Guidelines - Blabberly" },
  { md: "docs/legal/disclosures.md", html: "public/disclosures/index.html", title: "Disclosures - Blabberly" },
];

const NAV = [
  ["/terms", "Terms of Service"],
  ["/privacy", "Privacy Policy"],
  ["/guidelines", "Community Guidelines"],
  ["/disclosures", "Disclosures"],
  ["/support", "Support"],
];

const STYLE = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background: #fff; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1 { font-size: 2rem; margin-bottom: 8px; color: #1a1a1a; }
    h2 { font-size: 1.3rem; margin-top: 32px; margin-bottom: 12px; color: #1a1a1a; }
    h3 { font-size: 1.1rem; margin-top: 20px; margin-bottom: 8px; color: #1a1a1a; }
    p, li { margin-bottom: 12px; }
    ul, ol { padding-left: 24px; }
    .updated { color: #666; font-size: 0.9rem; margin-bottom: 32px; }
    a { color: #FF6B35; }
    .highlight { background: #FFF3ED; border-left: 4px solid #FF6B35; padding: 16px; border-radius: 4px; margin: 16px 0; }
    .highlight p:last-child { margin-bottom: 0; }
    .nav { font-size: 0.9rem; color: #666; margin-bottom: 24px; }
    .nav a { margin-right: 4px; }
    .footer { border-top: 1px solid #eee; margin-top: 40px; padding-top: 16px; font-size: 0.9rem; color: #666; }
    .table-wrap { overflow-x: auto; margin: 16px 0; }
    table { border-collapse: collapse; width: 100%; font-size: 0.95rem; }
    th, td { border: 1px solid #e5e5e5; padding: 8px 10px; text-align: left; vertical-align: top; }
    th { background: #fafafa; }
    code { font-family: SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9em; background: #f4f4f4; padding: 1px 4px; border-radius: 3px; }
    hr { border: 0; border-top: 1px solid #eee; margin: 32px 0; }
    .placeholder { background: #FFF8C5; border: 1px dashed #d4a72c; padding: 0 4px; border-radius: 3px; }
`;

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function inline(text) {
  let out = escapeHtml(text);
  // Placeholders for counsel: [PLACEHOLDER: ...] gets a visible yellow mark.
  out = out.replace(/\[PLACEHOLDER:([^\]]*)\]/g, (_, body) => `<mark class="placeholder">[PLACEHOLDER:${body}]</mark>`);
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => `<a href="${href}">${label}</a>`);
  return out;
}

function renderTable(lines) {
  const rows = lines
    .filter((l) => !/^\|\s*:?-{2,}/.test(l))
    .map((l) => l.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim()));
  if (rows.length === 0) return "";
  const [head, ...body] = rows;
  let html = '<div class="table-wrap"><table><thead><tr>';
  html += head.map((c) => `<th>${inline(c)}</th>`).join("");
  html += "</tr></thead><tbody>";
  for (const r of body) {
    html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
  }
  html += "</tbody></table></div>";
  return html;
}

function markdownToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let i = 0;
  let sawTitle = false;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") { i++; continue; }

    if (/^# /.test(line)) {
      out.push(`<h1>${inline(line.slice(2).trim())}</h1>`);
      sawTitle = true;
      i++;
      continue;
    }
    if (sawTitle && /^Effective:/.test(line) && out.length === 1) {
      out.push(`<p class="updated">${inline(line.trim())}</p>`);
      i++;
      continue;
    }
    if (/^## /.test(line)) { out.push(`<h2>${inline(line.slice(3).trim())}</h2>`); i++; continue; }
    if (/^### /.test(line)) { out.push(`<h3>${inline(line.slice(4).trim())}</h3>`); i++; continue; }
    if (/^---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }

    if (/^> ?/.test(line)) {
      const block = [];
      while (i < lines.length && /^> ?/.test(lines[i])) { block.push(lines[i].replace(/^> ?/, "")); i++; }
      const paras = block.join("\n").split(/\n\s*\n/).map((p) => `<p>${inline(p.replace(/\n/g, " ").trim())}</p>`);
      out.push(`<div class="highlight">${paras.join("")}</div>`);
      continue;
    }

    if (/^\|/.test(line)) {
      const block = [];
      while (i < lines.length && /^\|/.test(lines[i])) { block.push(lines[i]); i++; }
      out.push(renderTable(block));
      continue;
    }

    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && (/^- /.test(lines[i]) || /^  \S/.test(lines[i]))) {
        if (/^- /.test(lines[i])) items.push(lines[i].slice(2).trim());
        else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      out.push("<ul>" + items.map((t) => `<li>${inline(t)}</li>`).join("") + "</ul>");
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && (/^\d+\. /.test(lines[i]) || /^   \S/.test(lines[i]))) {
        if (/^\d+\. /.test(lines[i])) items.push(lines[i].replace(/^\d+\. /, "").trim());
        else items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      out.push("<ol>" + items.map((t) => `<li>${inline(t)}</li>`).join("") + "</ol>");
      continue;
    }

    // Paragraph: consecutive non-empty, non-block lines.
    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,3} |- |\d+\. |> ?|\||---)/.test(lines[i])
    ) { para.push(lines[i].trim()); i++; }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }
  return out.join("\n  ");
}

function wrap(title, bodyHtml, selfPath) {
  const navLinks = NAV.filter(([href]) => href !== selfPath)
    .map(([href, label]) => `<a href="${href}">${label}</a>`)
    .join(" · ");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>${STYLE}  </style>
</head>
<body>
  <p class="nav">Blabberly policies: ${navLinks}</p>
  ${bodyHtml}
  <div class="footer">
    <p>Blabberly policies: ${navLinks}</p>
    <p>Questions: <a href="mailto:support@blabberly.com">support@blabberly.com</a></p>
  </div>
</body>
</html>
`;
}

function build() {
  for (const page of PAGES) {
    const mdPath = path.join(ROOT, page.md);
    const htmlPath = path.join(ROOT, page.html);
    const md = fs.readFileSync(mdPath, "utf8");
    const selfPath = "/" + path.basename(path.dirname(htmlPath));
    const html = wrap(page.title, markdownToHtml(md), selfPath);
    fs.mkdirSync(path.dirname(htmlPath), { recursive: true });
    fs.writeFileSync(htmlPath, html);
    console.log(`built ${page.html} from ${page.md} (${html.length} bytes)`);
  }
}

if (require.main === module) build();

module.exports = { markdownToHtml, wrap };
