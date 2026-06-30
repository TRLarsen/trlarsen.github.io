# 🎓 Tyler R. Larsen | Academic Portfolio

This is the professional portfolio of Tyler R. Larsen, focusing on Computer Engineering and Robotics (UAV Autopilot Ecosystems).

## 🚀 Project Origins
**Note:** This website’s architecture, styling, and CI/CD pipeline were entirely **generated and configured by an LLM (Gemini CLI)** based on a professional design brief. The goal was to create a "set and forget" system that allows for high-end visual fidelity with zero-code maintenance.

## 🛠 Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Content:** Markdown-driven via `gray-matter` and `remark`.
- **Deployment:** GitHub Actions + GitHub Pages.

## ✍️ Maintenance
The content (Bio, News, Research) is maintained by Tyler R. Larsen. To update the site:
1. Navigate to the `/content` folder.
2. Edit or add `.md` files.
3. Commit and push to `main`.

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed content templates.

## 💻 Local Preview & Testing
To preview your changes locally before pushing:

1. **Development Server (Real-time updates):**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to preview changes in real-time.

2. **Production Export Preview:**
   To verify the exact static build that will deploy to GitHub Pages:
   ```bash
   npm run build
   npx serve out
   ```