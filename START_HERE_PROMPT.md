# Prompt to paste into Claude Code

Read `CLAUDE.md` and every file in `docs/` before making changes.

Then inspect the repository structure and the local `Info from MPack/` source folder. Do not publish sensitive information from those files.

First, give me a concise implementation plan that includes:

1. the stack you found or propose,
2. the routes/components you will create,
3. the content/assets that are verified,
4. the content/assets that still require placeholders,
5. the order in which you will build the MVP.

After that, begin implementation.

The goal is a polished, modern, presentation-ready M-Pack website that supports four user actions:

- understand M-Pack's work,
- join or learn about the monthly Donors' Club,
- browse/purchase crafts and M-Pack merch,
- subscribe to updates or explore corporate partnership.

Treat the M-Pack presentation deck and local source documents as the content source of truth. Do not invent impact data.

Prioritize privacy and safeguarding for minors. Do not create child profiles or identify children on product pages. Use activity-level storytelling.

Build the prototype so it looks complete even if we do not yet have approved photography. Use the brand/design guidance in `docs/06-design-system.md`.

For payment/newsletter functionality, create clean adapters and demo-safe behavior first. Do not collect card data directly.

Keep the code simple, polished, and easy to continue vibe-coding after the first pass.
