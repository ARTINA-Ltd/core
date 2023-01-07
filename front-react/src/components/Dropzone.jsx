import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import "./Dropzone.css";

function Dropzone({onDrop, open}) {
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} =
        useDropzone({
            accept:{'image/*': ['jpg', 'jpeg', 'png']},
            onDrop,
        });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes{" "}
        </li>
    ));


    return (
        <div className="main-div">
            <div {...getRootProps({className: "dropzone"})}>
                <input className="input-zone" {...getInputProps()} />
                <div className="text-center">
                    {isDragActive ? (
                        <p className="dropzone-content">
                            فایل خود را اینجا رها کنید
                        </p>
                    ) : (
                        <p className="dropzone-content">
                            فایل خود را اینجا رها کنید و یا کلیک کنید
                        </p>
                    )}
                    <button type="button" onClick={open} className="btn">
                        برای انتخاب فایل کلیک کنید
                    </button>
                </div>
            </div>
            <aside>
                <ul>{files}</ul>
            </aside>
        </div>
    );
}

export default Dropzone;