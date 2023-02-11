import UploadItem from "../components/UploadItem";
import { FileUpload } from 'primereact/fileupload';

function NFTUploadPage() {
    return (
        <div>
            <UploadItem />
            <FileUpload name="demo[]" url={'/api/upload'}   multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />

        </div>
    );
}

export default NFTUploadPage;
