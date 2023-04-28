import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';





export default function BasicTable() {

    const Price = document.getElementsByClassName("Eth");
    const Price2 = Price * 48000000;
    return (
      

       
        <div className='flex card   p-4  grid m-4 w-full align-items-center justify-content-center   '>
            <h2 className='  font-black font text-6xl mt-4 mb-4 font'> قیمت پیشنهادی </h2>
            <div className='flex grid justify-between lg:w-7   font'>
                <h2 className='font flex text-3xl  font  lg:col-6 sm:col-12 align-items-center md:col-12 col-12 justify-content-center'>قیمت پیشنهادی شما       </h2>
                <InputText type="text" placeholder="قیمت به اتریوم"  className='Eth flex font lg:col-6 md:col-12 sm:col-12 col-12' />
              
            </div>
            <p className='lg:text-4xl sm:text-3xl mt-5 font'  > قیمت پیشنهاد شده به تومان : {Price2} </p>

            <div dir='ltr' className='flex items-center'>
                <Button className='box-border border-2 text-4xl  font text-white w-full h-auto  mt-10 rounded-lg hover:text-black'>ثبت</Button>
            </div>
        </div>
        
    );
}
