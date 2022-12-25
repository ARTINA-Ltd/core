import React, {useState, useCallback} from "react";
import {useDropzone} from "react-dropzone";
import "./Dropzone.css";
import cuid from "cuid";

function Dropzone({onDrop, accept, open}) {
    const [myFiles, setMyFiles] = useState([]);

    // const onDrop = useCallback(acceptedFiles => {
    //     setMyFiles([...myFiles, ...acceptedFiles])
    // }, [myFiles])

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} =
        useDropzone({
            accept,
            onDrop,
        });

    const removeFile = file => () => {
        console.log("removeFile", file);
        const newFiles = [...myFiles]
        newFiles.splice(newFiles.indexOf(file), 1)
        setMyFiles(newFiles)
    }

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes{" "}
            <button className="remove-btn" onClick={removeFile(file)}>x</button>
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
            {/*{files.length > 0 && <button className="remove-btn" onClick={removeAll}>x</button>}*/}
        </div>
    );
}

export default Dropzone;