import algoliasearch from 'algoliasearch/lite';
import { connectStateResults, Hits, InstantSearch, SearchBox } from 'react-instantsearch-dom';
import React from "react";
import Link from "next/link";

const SEARCH_INDEX_NAME = process.env.NEXT_PUBLIC_SEARCH_INDEX_NAME;

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_SEARCH_APP_ID,
    process.env.NEXT_PUBLIC_SEARCH_SEARCH_API_KEY);

const Results = connectStateResults(({searchState, searchResults, searching}) => {
        const hasQuery = searchState && searchState.query;
        const hasResults = (searchResults?.hits ?? []).length > 0;
        const isSearching = searching;
        if (hasQuery && hasResults) {
            return <Hits hitComponent={Hit}/>;
        }
        if (hasQuery && !hasResults && !isSearching) {
            return <h4 className="text-[18px] m-0 mt-[15px]">No results</h4>
        }
        return null;
    }
);

function getMatchPosition(rawText: string): number {
    if(!rawText || typeof rawText !== 'string') {
        return -1
    }
    return rawText.indexOf('<ais-highlight-0000000000>');
}

function Hit(props: any) {
    const rawContent = props?.hit?._highlightResult?.content?.value || '';
    const rawTitle = props?.hit?._highlightResult.frontmatter?.title.value;

    const titleMatchPosition: number = getMatchPosition(rawTitle);
    const contentMatchPosition: number = getMatchPosition(rawContent);

    let title = rawTitle || 'no title';
    let content = ''

    if (titleMatchPosition !== -1) {
        title = rawTitle
            .replace(/<ais-highlight-0000000000>/g, '<mark>')
            .replace(/<\/ais-highlight-0000000000>/g, '</mark>') ?? "";
    }

    if (contentMatchPosition !== -1) {
        content = rawContent
            .slice(contentMatchPosition, (contentMatchPosition+150))
            .replace(/<ais-highlight-0000000000>/g, '<mark>')
            .replace(/<\/ais-highlight-0000000000>/g, '</mark>') ?? "";
    }

    return (
        <Link href={props.hit.slug || ''}>
            <a>
                <h4 className="text-[18px] m-0" dangerouslySetInnerHTML={{__html: title}}/>
                <div dangerouslySetInnerHTML={{__html: content}}/>
            </a>
        </Link>
    )
}


export default function Search() {
    return (
        <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
            <SearchBox/>
            <Results/>
        </InstantSearch>
    )
}


// import { DocSearch } from '@docsearch/react';
//
// export default function Search() {
//     return (
//         <DocSearch
//             appId="R2IYF7ETH7"
//             apiKey="599cec31baffa4868cae4e79f180729b"
//             indexName="docsearch"
//         />
//         // <DocSearch
//         //     appId="0SNY69OLGK"
//         //     indexName="test"
//         //     apiKey="8d4aec2d9afe6404e555ce51fd7838ee"
//         // />
//     );
// }
