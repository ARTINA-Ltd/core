import UploadItem from "../components/UploadItem";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router-dom";
import { Notify } from "notiflix";

function NFTUploadPage() {
  const navigate = useNavigate();
  if (localStorage.getItem("authTokens") === null) {
    navigate("/");
    Notify.warning("Please log in to you account");
  }

  return (
    <TestLayout connectWallet={true}>
      <UploadItem />
    </TestLayout>
  );
}

export default NFTUploadPage;
