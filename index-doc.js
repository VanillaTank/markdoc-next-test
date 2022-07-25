import fs from "fs";
import matter from "gray-matter";
import algoliasearch from 'algoliasearch';
import path from "path";
import MarkdownIt from 'markdown-it';
import plainText from 'markdown-it-plain-text';

const md = new MarkdownIt();
md.use(plainText);

function getData() {
    const files = fs.readdirSync(path.join('pages/flora-and-fauna'))
    return files.map((filename) => {
        const markdownWithMeta = fs.readFileSync(
            path.join('pages/flora-and-fauna', filename),
            'utf-8'
        )
        const {data: frontmatter, content} = matter(markdownWithMeta);
        md.render(content.replace(/{%\s.+\s%}/g, ''))

        return {
            frontmatter,
            content: md.plainText
        }
    })
}

const client = algoliasearch(
    '',
    ''
);
const index = client.initIndex("test")
index.saveObjects(getData(), {
    autoGenerateObjectIDIfNotExist: true
});

console.log('Done')