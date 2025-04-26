import React, {useState, useRef} from "react";
import {Button} from "../ui/button";
import {Upload, File} from "lucide-react";

export default function FileUploadZone({onFileSelected}) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileSelected(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            onFileSelected(files[0]);
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-xl p-8 transition-all ${
                isDragging ? "border-indigo-400 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <Upload className="h-8 w-8 text-indigo-600"/>
                </div>

                <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Upload your scientific article
                </h3>

                <p className="text-sm text-gray-500 mb-4 max-w-md">
                    Drag and drop your PDF or text document, or click to browse your files
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.txt,.doc,.docx"
                />

                <Button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    <File className="h-4 w-4 mr-2"/>
                    Select File
                </Button>

                <p className="text-xs text-gray-400 mt-4">
                    Supported formats: PDF, TXT, DOC, DOCX
                </p>
            </div>
        </div>
    );
}