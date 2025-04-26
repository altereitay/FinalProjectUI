import Layout from "./Layout";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Upload from "./Components/Upload/Upload";
import Library from "./Components/Library/Library";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout currentPageName="Upload">
                                <Upload/>
                            </Layout>
                        }
                    />
                    <Route
                        path="/library"
                        element={
                            <Layout currentPageName="Library">
                                <Library/>
                            </Layout>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


export default App
