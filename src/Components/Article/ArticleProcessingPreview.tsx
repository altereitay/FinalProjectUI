import React from "react";
import {Card, CardContent, CardHeader, CardTitle} from "../ui/card";
import {Skeleton} from "../ui/skeleton";
import {CircleCheck, FileText, Sparkles} from "lucide-react";

export default function ArticleProcessingPreview({fileName, stage = "uploading"}) {
    const stageInfo = {
        uploading: {
            title: "Uploading Article",
            description: "Your file is being uploaded...",
            icon: FileText,
            progress: 33
        },
        analyzing: {
            title: "Analyzing Content",
            description: "Extracting and processing scientific content...",
            icon: Sparkles,
            progress: 66
        },
        completed: {
            title: "Simplification Complete",
            description: "Your article has been successfully simplified!",
            icon: CircleCheck,
            progress: 100
        }
    };

    const currentStage = stageInfo[stage] || stageInfo.uploading;

    return (
        <Card className="border border-indigo-100">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <currentStage.icon className="h-5 w-5 text-indigo-600"/>
                    {currentStage.title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                    {currentStage.description}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-indigo-600"/>
                        </div>
                        <div>
                            <p className="text-sm font-medium">{fileName || "document.pdf"}</p>
                            <div className="h-2 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                                <div
                                    className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-out"
                                    style={{width: `${currentStage.progress}%`}}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Article Preview</h3>
                        {stage !== "completed" ? (
                            <>
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-3/4"/>
                                <Skeleton className="h-4 w-5/6"/>
                                <Skeleton className="h-4 w-full"/>
                                <Skeleton className="h-4 w-2/3"/>
                            </>
                        ) : (
                            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                                Your simplified article is ready to view!
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}