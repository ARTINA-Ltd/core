import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
  import { Image } from 'primereact/image';
 

// ./ProductPageComponent/images/image_2022-08-15_19-57-46.png
export default function IDUpdate() {
  const toast = useRef(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef(null);
  const imageUrl = "/static/PicturesOfNationalCard/default.png";
  const [UserData, setUserDatas] = useState(
    JSON.parse(localStorage.getItem("UserDatas"))
  );
  const onTemplateSelect = (e) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 100000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          direction: "ltr",
          backgroundColor: "#DCD6F7",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex align-items-center gap-3 ml-auto mr-8">
          <span>{formatedValue} / 10 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{
              width: "10rem",
              height: "12px",
              backgroundColor: "#A6B1E1",
            }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div
        className="flex align-items-center flex-wrap"
        style={{ direction: "ltr" }}
      >
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <>
        {UserData.national_card_picture === null ? (
          <div className="flex align-items-center flex-column">
            {/* <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">   </span>*/}
            <p className="font text-3xl">
              لطفا عکس کارت ملی خود را اینجا بارگذاری بکنید
            </p>

            <i
              className="pi pi-id-card mt-3 p-5"
              style={{
                fontSize: "18em",
                borderRadius: "80%",
                backgroundColor: "var(--surface-b)",
                color: "var(--surface-d)",
              }}
            ></i>
          </div>
        ) : (
          <div className="flex align-items-center flex-column">
            {/* <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
            <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">   </span>*/}
            <p className="font text-3xl">
              لطفا عکس کارت ملی خود را اینجا بارگذاری بکنید
            </p>

            <Image src={imageUrl} alt="Image" width="250" />

          </div>
        )}
      </>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div
      className="mt-8"
      style={{
        borderColor: "#424874",
        borderWidth: "2px",
        borderRadius: "9px",
      }}
    >
      <Toast ref={toast}></Toast>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        ref={fileUploadRef}
        name="demo[]"
        url="/api/upload"
        multiple
        accept="image/*"
        maxFileSize={10000000}
        onUpload={onTemplateUpload}
        onSelect={onTemplateSelect}
        onError={onTemplateClear}
        onClear={onTemplateClear}
        headerTemplate={headerTemplate}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
      />
    </div>
  );
}
