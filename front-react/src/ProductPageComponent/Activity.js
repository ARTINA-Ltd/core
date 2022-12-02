import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('رویداد',"خرید" , "فروش", "خرید", "فروش"),
    createData('قیمت', 237, 240, 242, 250),
    createData('از', "dsfgfgsd2541265", "025423czvcxvx025", "353cxcv3c5v3c", "fdgfgdf555551dgdfg"),
    createData('به', "fgdfgfgf35gf1gf", "xvxvxb5x15xf4g", "bcfbb5c1c2bc", "xcbcbcb3551xv"),
    createData('تاریخ', "2022/05/11", "2022/06/20", "2022/07/15", "2022/11/7"),
];

export default function BasicTable() {
    return (

    <TableContainer component={Paper} className="text-8xl">
        <h4 className={"flex justify-center text-5xl font-extrabold mt-6"}>تاریخچه فعالیت</h4>

        <Table sx={{ minWidth: 350 }} aria-label="simple table" className="text-6xl" >
                <TableHead>
                    <TableRow >
                        <TableCell align="center"> <p className='text-3xl'>رویداد</p> </TableCell>
                        <TableCell className='text-5xl' align="center"> <p className='text-3xl'> قیمت</p> </TableCell>
                        <TableCell align="center"> <p className='text-3xl'> از</p> </TableCell>
                        <TableCell align="center"> <p className='text-3xl'> به</p> </TableCell>
                        <TableCell align="center"> <p className='text-3xl'> تاریخ</p> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            <p className='text-3xl'>   {row.name} </p>
                            </TableCell>
                            <TableCell align="center"><p className='text-3xl'> {row.calories} </p></TableCell>
                            <TableCell align="center"><p className='text-3xl'> {row.fat}</p></TableCell>
                            <TableCell align="center"><p className='text-3xl'> {row.carbs}</p></TableCell>
                            <TableCell align="center"><p className='text-3xl'>{row.protein}</p></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
