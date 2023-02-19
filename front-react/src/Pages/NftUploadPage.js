import UploadItem from "../components/UploadItem";
import { FileUpload } from 'primereact/fileupload';
import NFTupload from "../components/Uploaders/NFTupload";
import Header from "../components/LandingPageNavBar/Header";
import Footer from "../components/Footer/Footer";

function NFTUploadPage() {
    return (
        <div className="overflow-hidden">
        <div style={{direction:'rtl'}}>
        <Header/>
        </div>
       
        <div className="h-full" style={{backgroundColor:'#F4EEFF'}}>

            <UploadItem />
            
            {/* <FileUpload name="demo[]" url={'/api/upload'}   multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /> */}

        </div>
        <div className="w-full" style={{direction:'rtl'}}>
        <Footer/>
        </div>
       
        
        </div>
    );
}

export default NFTUploadPage;
