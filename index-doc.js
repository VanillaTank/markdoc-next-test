import 'dotenv/config'
import fs from "fs";
import matter from "gray-matter";
import algoliasearch from 'algoliasearch';
import MarkdownIt from 'markdown-it';
import plainText from 'markdown-it-plain-text';
import {globby} from 'globby';


const md = new MarkdownIt();
md.use(plainText);

async function getData() {

    const paths = await globby(['pages/docs']);
    return paths.map((filename) => {
        const slug = filename
            .replace('pages/', '')
            .replace('.md', '')
        const markdownWithMeta = fs.readFileSync(filename, 'utf-8');
        const {data: frontmatter, content} = matter(markdownWithMeta);
        md.render(content.replace(/{%\s.+\s%}/g, ''))

        return {
            frontmatter,
            slug,
            content: md.plainText
        }
    })
}
const client = algoliasearch(
    process.env.NEXT_PUBLIC_SEARCH_APP_ID,
    process.env.NEXT_PUBLIC_SEARCH_ADMIN_API_KEY
);
const index = client.initIndex(process.env.NEXT_PUBLIC_SEARCH_INDEX_NAME);
const data = await getData();
index.saveObjects(data, {
    autoGenerateObjectIDIfNotExist: true
});

console.log('Done')