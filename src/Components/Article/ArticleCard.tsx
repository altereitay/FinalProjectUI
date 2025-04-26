import React from "react";
import {Card, CardContent} from "../ui/card";
import {Badge} from "../ui/badge";
import {FileText} from "lucide-react";
import {Link} from "react-router-dom";


export default function ArticleCard({article}) {
    const truncateText = (text, maxLength = 150) => {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + "...";
    };

    // Format the date in a readable format
    // const formattedDate = article.date_simplified
    //     ? format(new Date(article.date_simplified), 'MMM d, yyyy')
    //     : null;

    // Count the number of defined terms
    const termCount = article.terms?.length || 0;

    return (
        //TODO: add dynamic article choosing
        <Link to='ArticleID'>
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                        <div
                            className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-indigo-600"/>
                        </div>

                        <div className="space-y-2 min-w-0">
                            <h3 className="font-medium text-gray-900 text-lg leading-tight line-clamp-2">
                                {article.title}
                            </h3>

                            <p className="text-sm text-gray-500 line-clamp-2">
                                {truncateText(article.simplified_text)}
                            </p>

                            <div className="flex flex-wrap items-center space-x-3 pt-1">
                                {termCount > 0 && (
                                    <Badge variant="secondary"
                                           className="text-xs bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
                                        {termCount} {termCount === 1 ? 'term' : 'terms'}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}