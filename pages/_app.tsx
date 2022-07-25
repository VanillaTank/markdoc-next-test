import algoliasearch from 'algoliasearch/lite';
import { connectStateResults, Hits, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import React from "react";

const searchClient = algoliasearch(
    '0SNY69OLGK',
    '8d4aec2d9afe6404e555ce51fd7838ee',
);

const Results = connectStateResults(({searchState, searchResults, searching}) => {
        const hasQuery = searchState && searchState.query;
        const hasResults = (searchResults?.hits ?? []).length > 0;
        const isSearching = searching;
        if (hasQuery && hasResults) {
            return <Hits hitComponent={Hit}/>;
        }
        if (hasQuery && !hasResults && !isSearching) {
            return <div>No results</div>
        }
        return null;
    }
);

function Hit(props: any) {
    const rawContent = props?.hit?._highlightResult.content.value;
    const matchPosition = rawContent.indexOf('<ais-highlight-0000000000>');


    let content = rawContent
        .slice(matchPosition, 100)
        .replace(/<ais-highlight-0000000000>/g, '<mark>')
        .replace(/<\/ais-highlight-0000000000>/g, '</mark>') ?? "";
    return (<a href={props.hit.slug}>
        <div>
            <h3>{props?.hit?.frontmatter?.title ?? "no title"}</h3>
            <div dangerouslySetInnerHTML={{__html: content}} />
        </div>
        <p>{props?.hit?.frontmatter?.excerpt ?? ""}</p>
    </a>)
}


export default function MyApp() {
    return (
        <InstantSearch indexName="test" searchClient={searchClient}>
            <SearchBox/>
            <Results/>
        </InstantSearch>
    )
}


// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// import { SideNav, TableOfContents, TopNav, Footer } from '../components';
// import 'prismjs';
// import 'prismjs/components/prism-bash.min';
// import 'prismjs/themes/prism.css';
// import '@docsearch/css';
// import '../public/globals.css'
//
// import type { AppProps } from 'next/app'
//
// const TITLE = 'Book';
// const DESCRIPTION = 'Handbook of my little fantasy world.';
//
// function collectHeadings(node, sections = []) {
// 	if (node) {
// 		if (node.name === 'Heading') {
// 			const title = node.children[0];
//
// 			if (typeof title === 'string') {
// 				sections.push({
// 					...node.attributes,
// 					title
// 				});
// 			}
// 		}
//
// 		if (node.children) {
// 			for (const child of node.children) {
// 				collectHeadings(child, sections);
// 			}
// 		}
// 	}
//
// 	return sections;
// }
//
// export default function MyApp({ Component, pageProps }: AppProps) {
// 	const { markdoc } = pageProps;
//
// 	let title = TITLE;
// 	let description = DESCRIPTION;
// 	if (markdoc) {
// 		if (markdoc.frontmatter.title) {
// 			title = markdoc.frontmatter.title;
// 		}
// 		if (markdoc.frontmatter.description) {
// 			description = markdoc.frontmatter.description;
// 		}
// 	}
//
// 	const toc = pageProps.markdoc?.content
// 		? collectHeadings(pageProps.markdoc.content)
// 		: [];
//
// 	return (
// 		<>
// 			<Head>
// 				<title>{title}</title>
// 				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
// 				<meta name="referrer" content="strict-origin" />
// 				<meta name="title" content={title} />
// 				<meta name="description" content={description} />
// 				<link rel="shortcut icon" href="/favicon.ico" />
// 				<link rel="icon" href="/favicon.ico" />
// 			</Head>
// 			<TopNav>
// 				<Link href="/flora-and-fauna">
// 					<a >Flora and fauna</a>
// 				</Link>
// 				<Link href="/religions">
// 					<a >Religions</a>
// 				</Link>
// 				<Link href="/countries">
// 					<a >Countries</a>
// 				</Link>
// 				<Link href="/history">
// 					<a >History</a>
// 				</Link>
// 				<Link href="/persons">
// 					<a >Persons</a>
// 				</Link>
// 			</TopNav>
// 			<div className="page flex grow pt-[var(--top-nav-height)] min-h-screen">
// 				<SideNav />
// 				<main className="flex flex-col text-[size:16px] p-8">
//                     <Component {...pageProps} />
// 				</main>
// 				<TableOfContents toc={toc} />
// 			</div>
// 			<Footer />
// 		</>
// 	);
// }
