import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import html from "remark-html";

const contentDirectory = path.join(process.cwd(), "content");

export async function getMarkdownData(fileName: string) {
  const fullPath = path.join(contentDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();

  // Extract headings for Table of Contents
  const headings = matterResult.content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 0;
      const text = line.replace(/^#+\s*/, "");
      const id = text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      return { level, text, id };
    })
    .filter(h => h.level > 1 && h.level < 4);

  return {
    contentHtml,
    headings,
    ...(matterResult.data as any),
  };
}

export async function getAllContentFromFolder(folderName: string) {
  const folderPath = path.join(contentDirectory, folderName);
  if (!fs.existsSync(folderPath)) return [];
  
  const fileNames = fs.readdirSync(folderPath);
  
  const allData = await Promise.all(fileNames.map(async (fileName) => {
    const fullPath = path.join(folderPath, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    return {
      id: fileName.replace(/\.md$/, ""),
      contentHtml,
      ...(matterResult.data as any),
    };
  }));
  
  return allData.sort((a, b) => (a.date < b.date ? 1 : -1));
}