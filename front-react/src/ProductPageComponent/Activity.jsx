import * as React from "react";
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
  return (
    <div className="flex gap-12 w-full">
      <SimpleInput
        className={"text-white bg-[#7168f3] rounded-lg "}
        placeholder={"مثلا: 64"}
        title="قیمت پیشنهادی شما به اتریم"
      />
      <div className="bg-[#7168f3] py-[20px] cursor-pointer text-white text-[16px] w-[60%] flex justify-center rounded-lg">قیمت به تومان: 1.273.563 تومان</div>
      <div className="bg-sky-400 py-[20px] cursor-pointer text-white text-[16px] w-[25%] flex justify-center rounded-lg">ثبت</div>
    </div>
  );
}
