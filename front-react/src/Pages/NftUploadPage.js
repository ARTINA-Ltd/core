import UploadItem from "../components/UploadItem";
import { FileUpload } from 'primereact/fileupload';
import NFTupload from "../components/Uploaders/NFTupload";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";
import TestLayout from "../Layouts/TestLayout";

function NFTUploadPage() {
    return (
       <TestLayout connectWallet={true}>
            <UploadItem />
       </TestLayout>
    );
}

export default NFTUploadPage;
