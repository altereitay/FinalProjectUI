import React, {useState, useEffect} from "react";
import {Button} from "../ui/button";
import {Skeleton} from "../ui/skeleton";
import {Link, useLocation} from "react-router-dom";
import {ArrowLeft, Loader2} from "lucide-react";

import SimplifiedArticle from "./SimplifiedArticle";


export default function Article() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const {state} = useLocation();

    useEffect(() => {
        loadArticle();
    }, []);

    const loadArticle = async () => {
        setIsLoading(true);
        try {
            console.log(state)
            if (state !== undefined) {
                setArticle(state)
            } else {
                setError("Could not load the article. It may have been deleted or you don't have permission to view it.");
            }
        } catch (error) {
            console.error("Error loading article:", error);
            setError("Could not load the article. It may have been deleted or you don't have permission to view it.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderLoadingState = () => {
        console.log('render')
        console.log(article)
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-3/4"/>
                <div className="space-y-4">
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-5/6"/>
                    <Skeleton className="h-4 w-full"/>
                    <Skeleton className="h-4 w-3/4"/>
                </div>
            </div>
        );
    }

    const renderErrorState = () => (
        <div className="text-center py-12 border rounded-lg bg-red-50">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Article</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {error}
            </p>
            <Link to={'/library'}>
                <Button variant="outline">
                    Return to Library
                </Button>
            </Link>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center mb-6">
                <Link to={'/library'}>
                    <Button variant="outline" size="icon" className="mr-4">
                        <ArrowLeft className="h-4 w-4"/>
                    </Button>
                </Link>

                <div>
                    <h1 className="text-xl font-semibold text-gray-700">Article Details</h1>
                    <p className="text-sm text-gray-500">Viewing simplified scientific article</p>
                </div>
            </div>

            {isLoading ? (
                renderLoadingState()
            ) : error ? (
                renderErrorState()
            ) : (
                <SimplifiedArticle article={article}/>
            )}
        </div>
    );
}