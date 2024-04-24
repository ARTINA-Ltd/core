import React from 'react';

export default function Commissionmax() {
  return (
    <div className="m-8 sm:m-2 sm:text-[10px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-indigo-700 text-white sm:px-2">دارایی دیجیتال</th>
            <th className="py-2 px-4 bg-indigo-700 text-white sm:px-2">حداقل قابل واریز</th>
            <th className="py-2 px-4 bg-indigo-700 text-white sm:px-2">هزینه واریز</th>
            <th className="py-2 px-4 bg-indigo-700 text-white sm:px-2">حداقل قابل برداشت</th>
            <th className="py-2 px-4 bg-indigo-700 text-white sm:px-2">هزینه قابل برداشت</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 bg-indigo-300 sm:px-2">شبکه اتریوم</td>
            <td className="py-2 px-4 sm:px-2">15 USDT</td>
            <td className="py-2 px-4 sm:px-2">10 USDT</td>
            <td className="py-2 px-4 sm:px-2">500 USDT</td>
            <td className="py-2 px-4 sm:px-2">متغییر بنا به شبکه تتر</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300 sm:px-2">شبکه ترون</td>
            <td className="py-2 px-4 sm:px-2">0.5 USDT</td>
            <td className="py-2 px-4 sm:px-2">0 USDT</td>
            <td className="py-2 px-4 sm:px-2">10 USDT</td>
            <td className="py-2 px-4 sm:px-2">؟</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

