import React, {useState, useEffect} from "react";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {Alert, AlertDescription} from "../ui/alert";
import {Tabs, TabsList, TabsTrigger} from "../ui/tabs";
import {Link} from "react-router-dom";
import {Search, Plus, AlertCircle, Loader2} from "lucide-react";

import ArticleCard from '../Article/ArticleCard';

export default function Library() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTab, setSelectedTab] = useState("all");

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('https://scisimplify.online:8081/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const json = await res.json();
            setArticles(json);
        } catch (error) {
            console.error("Error loading articles:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getFilteredArticles = () => {
        return articles.filter(article => {
            // Search filter
            const matchesSearch = searchTerm === "" ||
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.simplified_text.toLowerCase().includes(searchTerm.toLowerCase());

            // Tab filter (in the future we could add more tabs like "Favorites", etc.)
            const matchesTab = selectedTab === "all";

            return matchesSearch && matchesTab;
        });
    };

    const filteredArticles = getFilteredArticles();

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-400 mb-2">Article Library</h1>
                    <p className="text-gray-500">View your collection of simplified scientific articles</p>
                </div>

                <Link to='/'>
                    <Button className="bg-indigo-600 hover:bg-indigo-700 w-full md:w-auto">
                        <Plus className="h-4 w-4 mr-2"/>
                        Upload New Article
                    </Button>
                </Link>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
                    <Input
                        placeholder="Search articles..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Tabs
                    value={selectedTab}
                    onValueChange={setSelectedTab}
                    className="w-full md:w-auto"
                >
                    <TabsList className="grid w-full grid-cols-1">
                        <TabsTrigger value="all">All Articles</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-6 w-6 text-indigo-600 animate-spin"/>
                    <span className="ml-2 text-gray-600">Loading articles...</span>
                </div>
            ) : filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredArticles.map(article => (
                        <ArticleCard key={article.id} article={article}/>
                    ))}
                </div>
            ) : articles.length > 0 ? (
                <Alert className="bg-amber-50 text-amber-800 border-amber-200">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>
                        No articles match your search criteria. Try adjusting your search terms.
                    </AlertDescription>
                </Alert>
            ) : (
                <div className="text-center py-12 border rounded-lg bg-gray-50">
                    <div className="w-16 h-16 mx-auto bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 text-indigo-400"/>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Upload your first scientific article to see it simplified here
                    </p>
                    <Link to='/'>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="h-4 w-4 mr-2"/>
                            Upload Your First Article
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}