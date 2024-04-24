import { useEffect } from "react";
import UploadItem from "../components/UploadItem";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router-dom";

function NFTUploadPage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("authTokens") === null && navigate("/login");
  });
  return (
    <TestLayout connectWallet={true}>
      <UploadItem />
    </TestLayout>
  );
}

export default NFTUploadPage;
