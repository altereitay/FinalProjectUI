import React, {useState} from "react";
import {Button} from "../ui/button";
import {useNavigate} from "react-router-dom";
import {ArrowRight} from "lucide-react";

import FileUploadZone from "./FileUploadZone";
import ArticleProcessingPreview from "../Article/ArticleProcessingPreview";
import SimplifiedArticle from "../Article/SimplifiedArticle";

export default function Upload() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [processing, setProcessing] = useState(false);
    const [processingStage, setProcessingStage] = useState("uploading");
    const [simplifiedArticle, setSimplifiedArticle] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelected = (selectedFile: File) => {
        setFile(selectedFile);
        setError(null);
    };

    const processArticle = async () => {
        if (!file) return;
        let extractionResult = {};
        let json = {};
        const formData = new FormData();
        formData.append('file', file);
        try {
            setProcessing(true);
            setProcessingStage("uploading");
            // TODO: change to real API
            try {
                const res = await fetch('https://scisimplify.online:8081/article/new', {
                    method: 'POST',
                    body: formData
                });

                json = await res.json();

            } catch (error) {
                console.error("Error loading articles:", error);
            } finally {
                extractionResult = {
                    status: "success",
                    output: {
                        text: json.original,
                        title: json.title,
                    },
                };
            }

            setProcessingStage("analyzing");

            // TODO: Extraction API

            if (extractionResult.status !== "success") {
                throw new Error("Failed to extract text from the document");
            }

            const originalText = extractionResult.output.text || "";
            const extractedTitle =
                extractionResult.output.title || file.name.replace(/\.[^/.]+$/, "");

            const articleData = {
                title: extractedTitle,
                original_text: originalText,
                simplified_text: json.simplified,
                date_simplified: new Date().toISOString(),
                terms: json.terms,
            };

            setProcessingStage("completed");
            setSimplifiedArticle({
                ...articleData,
                id: 1,
            });
        } catch (err) {
            console.error("Error processing article:", err);
            setError("Failed to process the article. Please try again.");
            setProcessing(false);
        }
    };

    const viewSimplifiedArticle = () => {
        navigate("/library");
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                    Upload Scientific Article
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Upload a scientific article and we'll simplify it for easier understanding
                </p>
            </div>

            {!processing && !simplifiedArticle && (
                <div className="space-y-6">
                    <FileUploadZone onFileSelected={handleFileSelected}/>

                    {file && (
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="flex items-center">
                                <div className="bg-white dark:bg-gray-700 p-2 rounded border dark:border-gray-600 mr-3">
                                    <svg
                                        className="w-8 h-8 text-indigo-500 dark:text-indigo-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800 dark:text-white">{file.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {Math.round(file.size / 1024)} KB
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={processArticle}
                                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
                            >
                                Process Article
                                <ArrowRight className="ml-2 h-4 w-4"/>
                            </Button>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-lg">
                            {error}
                        </div>
                    )}
                </div>
            )}

            {processing && !simplifiedArticle && (
                <ArticleProcessingPreview fileName={file?.name} stage={processingStage}/>
            )}

            {simplifiedArticle && (
                <div className="space-y-6">
                    <SimplifiedArticle article={simplifiedArticle}/>
                    <div className="flex justify-end">
                        <Button
                            onClick={viewSimplifiedArticle}
                            className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white"
                        >
                            Save & View in Library
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
