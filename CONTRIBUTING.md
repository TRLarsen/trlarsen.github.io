# 📄 How to Update Your Portfolio

This site is built to be modular. You **never** need to touch the code in `src/` to update your content.

## 🏠 Updating the Homepage
Edit `content/bio.md`.
- Change the "Frontmatter" (the stuff between `---`) to update your name, role, location, or social links.
- Change the text below the `---` to update your bio. You can use **Markdown** (bold, italics, links).

## 📰 Adding News
To add a new news item (e.g., "Won an award" or "New Lab position"):
1. Create a new file in `content/news/` (e.g., `2026-award.md`).
2. Follow this template:
   ```markdown
   ---
   date: "2026"
   ---
   Your news text here.
   ```
3. The site will automatically sort it by date and display it.

## 🔬 Adding Research/Papers
Create a new file in `content/research/`.
1. Follow this template:
   ```markdown
   ---
   title: "Paper Title"
   venue: "Symposium Name"
   authors: ["Author 1", "Author 2"]
   link: "https://link-to-pdf.com"
   featured: true
   ---
   Optional description of the work.
   ```
- Set `featured: true` to make it appear on the homepage.

## 🚀 Deployment
Once you push your changes to GitHub, the site will automatically redeploy within 1-2 minutes.