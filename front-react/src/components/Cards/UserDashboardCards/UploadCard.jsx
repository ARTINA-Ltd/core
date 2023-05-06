import { Button } from "@mui/material";
import React , {useState} from "react";
import SimpleCard from "./SimpleCard";

const UploadCard = ({className = ""}) => {
const [img, setImg] = useState();

const handleChange = (e) => {
    const data = new FileReader();
    data.addEventListener('load', ()=>{setImg(data.result)});
    data.readAsDataURL(e.target.files[0]);
    console.log(img);
}
  return (
    <SimpleCard className={`bg-white ${className}`}>
      <Button variant="contained" component="label" className="mb-4">
        انتخاب تصویر
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleChange}
        />
      </Button>
      <img src={img} width='200px' height='200px' className="rounded-lg" />
    </SimpleCard>
  );
};

export default UploadCard;
