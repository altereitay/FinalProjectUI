import React, {useRef} from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "../ui/tooltip";
import {Button} from "../ui/button";
import {Share2, Bookmark, Download} from "lucide-react";

export default function SimplifiedArticle({article}) {
    if (!article || !article.simplified) {
        return null;
    }

    const articleRef = useRef(null);

    // Function to highlight terms with tooltips
    const highlightTerms = ({text, terms}: { text: string, terms: any }) => {
        if (!terms || terms.length === 0) return <p>{text}</p>;

        // Create a Map for faster lookup of terms
        const termMap = new Map<string, string>(
            terms.map((term: { term: string; definition: string }) => [term.term.toLowerCase(), term.definition])
        );


        // Function to check if a word is a term or part of a term
        const isTermOrPartOfTerm = (word: string) => {
            word = word.toLowerCase().replace(/[.,;!?()]/g, '');
            if (termMap.has(word)) return true;

            // Check if this word starts any multi-word term
            for (const t of termMap.keys()) {
                const term = t as string
                if (term.split(' ').length > 1 && term.startsWith(word)) {
                    return true;
                }
            }

            return false;
        };

        // Split text into paragraphs
        const paragraphs = text.split('\n\n');

        return paragraphs.map((paragraph, pIndex) => {
            if (!paragraph.trim()) return null;

            // Process each word to check if it's a term
            const words = paragraph.split(' ');
            let result = [];
            let buffer = [];

            for (let i = 0; i < words.length; i++) {
                const currentWord = words[i];
                const cleanWord = currentWord.toLowerCase().replace(/[.,;!?()]/g, '');

                // Check if this word is a term by itself
                if (termMap.has(cleanWord)) {
                    // Add any buffered words first
                    if (buffer.length > 0) {
                        result.push(buffer.join(' ') + ' ');
                        buffer = [];
                    }

                    // Add the term with a tooltip
                    result.push(
                        <TooltipProvider key={`term-${pIndex}-${i}`} delayDuration={300}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                  <span className="bg-indigo-50 text-indigo-800 px-1 rounded cursor-help">
                    {currentWord}
                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs bg-white dark:bg-gray-800 p-3 shadow-lg rounded-lg border dark:border-gray-700">
                                    <div>
                                        <div className="font-medium mb-1 text-gray-900 dark:text-gray-100">{cleanWord}</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-100">{termMap.get(cleanWord)}</div>
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    );

                    result.push(' ');
                    continue;
                }

                // Check for multi-word terms
                let foundMultiWordTerm = false;
                for (const [term, definition] of termMap.entries()) {
                    if (term.split(' ').length > 1) {
                        const termWords = term.split(' ');

                        // Check if the current position matches the start of the term
                        if (i + termWords.length <= words.length) {
                            const potentialMatch = words.slice(i, i + termWords.length)
                                .map(w => w.toLowerCase().replace(/[.,;!?()]/g, ''))
                                .join(' ');

                            if (potentialMatch === term) {
                                // Add any buffered words first
                                if (buffer.length > 0) {
                                    result.push(buffer.join(' ') + ' ');
                                    buffer = [];
                                }

                                // Add the multi-word term with a tooltip
                                result.push(
                                    <TooltipProvider key={`term-${pIndex}-${i}`} delayDuration={300}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                        <span className="bg-indigo-50 text-indigo-800 px-1 rounded cursor-help">
                          {words.slice(i, i + termWords.length).join(' ')}
                        </span>
                                            </TooltipTrigger>
                                            <TooltipContent
                                                className="max-w-xs bg-white p-3 shadow-lg rounded-lg border">
                                                <div>
                                                    <div className="font-medium mb-1">{term}</div>
                                                    <div className="text-sm text-gray-600">{definition}</div>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                );

                                result.push(' ');
                                i += termWords.length - 1;
                                foundMultiWordTerm = true;
                                break;
                            }
                        }
                    }
                }

                if (foundMultiWordTerm) continue;

                // If not a term, add to buffer
                buffer.push(currentWord);
            }

            // Add any remaining buffered words
            if (buffer.length > 0) {
                result.push(buffer.join(' '));
            }

            return (
                <p key={`p-${pIndex}`} className="mb-4 leading-relaxed text-gray-800 dark:text-gray-100">
                    {result}
                </p>
            );
        });
    };

    return (
        <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-6 md:p-8">
                <div className="flex justify-between items-start mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 leading-tight">{article.title}</h1>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="icon">
                            <Bookmark className="h-4 w-4 text-gray-600"/>
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="h-4 w-4 text-gray-600"/>
                        </Button>
                    </div>
                </div>

                <div className="prose max-w-none text-gray-800 dark:text-gray-100" ref={articleRef}>
                    {highlightTerms({text: article.simplified, terms: article.terms})}
                </div>

                {article.file_url && (
                    <div className="mt-8 pt-6 border-t">
                        <Button variant="outline" className="flex items-center text-gray-700">
                            <Download className="h-4 w-4 mr-2"/>
                            View Original Document
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}