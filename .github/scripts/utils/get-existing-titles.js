import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export async function getExistingTitles() {
    const titles = [];

    const directories = ['_posts', '_drafts'];
    for (const directory of directories) {
        const files = await fs.readdir(directory);
        for (const file of files) {
            if (file.endsWith('.md')) {
                const filePath = path.join(directory, file);
                const content = await fs.readFile(filePath, 'utf8');
                const { data } = matter(content);
                
                if (data.title) {
                    titles.push(data.title);
                }
            }
        }
    }

    return titles;
}
