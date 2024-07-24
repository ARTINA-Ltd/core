import { useContext, useEffect, useState } from "react";
import UploadItem from "../components/UploadItem";
import TestLayout from "../Layouts/TestLayout";
import { useNavigate } from "react-router-dom";
import { UserChangeContext, UserContext } from "../App.js";
import { Notify } from "notiflix";

function NFTUploadPage() {

  const [user,setUser] = useState(useContext(UserContext))
  const userChange = useContext(UserChangeContext)
  const navigate = useNavigate()
useEffect(()=>{
  if(!user){
    Notify.warning("Please log in to you account")
    navigate("/")
  }
 

},[user])
  return (
    <TestLayout connectWallet={true}>
      <UploadItem />
    </TestLayout>
  );
}

export default NFTUploadPage;
