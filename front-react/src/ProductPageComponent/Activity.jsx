import  React , {useState} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import SimpleInput from "../components/Inputs/SimpleInput";

export default function BasicTable() {
  const [price,setPrice] = useState(0);
  const [ethereum,setEthereum] = useState(0);
  return (
    <div className="flex gap-12 w-full">
      <SimpleInput
        className={"text-white bg-[#7168f3] rounded-lg "}
        placeholder={"مثلا: 3"}
        title="قیمت پیشنهادی شما به اتریم"
        onChange={(e) => {setPrice(e.target.value * 104759811); setEthereum(e.target.value)}}
      />
      <div className="bg-[#7168f3] py-[20px] cursor-pointer text-white text-[16px] w-[60%] flex justify-center rounded-lg">قیمت به تومان: <div className="text-yellow-300">&nbsp;{price}&nbsp;</div> تومان</div>
      <div className="bg-sky-400 py-[20px] cursor-pointer text-white text-[16px] w-[25%] flex justify-center rounded-lg hover:bg-sky-500 transition-all">ثبت</div>
    </div>
  );
}
