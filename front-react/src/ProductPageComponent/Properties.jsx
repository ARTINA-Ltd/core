import 'tw-elements';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Properties() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return <>
    <div className='ml-[20px] mr-[20px] mb-8  font-bold  '>
    <h1 className='flex mr-[10px] lg:text-6xl sm:text-4xl '>پیشنهادات</h1>

    <div className="flex flex-col">
  <div className="overflow-x-auto sm:mx-6 lg:mx-8">
    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full">
          <thead className="border-b ">
            <tr>
              <th scope="col" className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center">
                #
              </th>
              <th scope="col" className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center">
                نام
              </th>
              <th scope="col" className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center">
                مبلغ
              </th>
              <th scope="col" className="text-4xl sm:text-3xl font-bold text-gray-900 px-6 py-4 text-center">
                مبلغ به تومان
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font">1</td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                زهرا علیمی
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                302
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                5/000/000
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font">2</td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                سمانه رشیدی
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                301
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                4/900/000
              </td>
            </tr>
            <tr className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-2xl font-medium text-gray-900 font">3</td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                مهدی غلامی
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                209
              </td>
              <td className="text-2xl text-gray-900 font-light px-6 py-4 whitespace-nowrap font">
                3/800/000
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    </div>
  </>
}

export default Properties;