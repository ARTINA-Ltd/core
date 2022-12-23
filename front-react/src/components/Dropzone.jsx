import React from "react";
import {useDropzone} from "react-dropzone";
import "./Dropzone.css";

function Dropzone({onDrop, accept, open}) {
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} =
        useDropzone({
            accept,
            onDrop,
        });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));


    return (
        <div>
            <div {...getRootProps({className: "dropzone"})}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">
                            فایل خود را اینجا ول کنید
                        </p>
                    ) : (
                        <p className="dropzone-content">
                            فایل خود را اینجا ول کنید و یا کلیک کنید
                        </p>
                    )}
                    <button type="button" onClick={open} className="btn">
                        Click to select files
                    </button>
                </div>
            </div>
            re
            <aside>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}

export default Dropzone;