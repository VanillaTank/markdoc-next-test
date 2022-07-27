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
        const markdownWithMeta = fs.readFileSync(filename, 'utf-8');
        const slug = filename.replace('.md', '')
        const {data: frontmatter, content} = matter(markdownWithMeta);
        md.render(content.replace(/{%\s.+\s%}/g, ''))

        return {
            frontmatter,
            slug,
            content: md.plainText
        }
    })

}

console.log(await getData())

// const client = algoliasearch(
//     '',
//     ''
// );
// const index = client.initIndex("test")
// index.saveObjects(getData(), {
//     autoGenerateObjectIDIfNotExist: true
// });
//
// console.log('Done')