import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





export default function BasicTable() {

    const Price = document.getElementsByClassName("Eth");
    console.log(Price)
    const Price2 = Price * 48000000;
    return (
        <div className=' box-border h-[250px] lg:w-[80%] sm:w-[95%] lg:mr-[10%] sm:mr-[2.5%] mt-[60px] p-4 border-2 radius-[20px] rounded-3xl shadow-xl '>
            <h2 className='lg:text-[45px] md:text-[35px] sm:text-[30px] font-black '>فرم پیشنهاد</h2>
            <div className='flex justify-between mt-[30px] lg:mr-[60px] sm:mr-[2px]'>
                <h2 className='lg:text-4xl sm:text-2xl'>قیمت پیشنهادی به اتریوم </h2>
                <input type="text" className='Eth border-2 lg:px-14 sm:px-8' />
              
            </div>
            <p className='lg:text-4xl sm:text-3xl '  >{Price2} قیمت پیشنهادی به تومان :</p>

            <div dir='ltr' className='flex items-center'>
                <button className='box-border border-2 text-4xl bg-purple-600 text-white w-32 h-14 mt-10 rounded-lg hover:text-black'>ثبت</button>
            </div>
        </div>

    );
}
