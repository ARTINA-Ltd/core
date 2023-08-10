import React from 'react';

export default function Commissionmax() {
  return (
    <div className="m-8">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-indigo-700 text-white">دارایی دیجیتال</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">حداقل قابل واریز</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">هزینه واریز</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">حداقل قابل برداشت</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">هزینه قابل برداشت</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">شبکه اتریوم</td>
            <td className="py-2 px-4">15 USDT</td>
            <td className="py-2 px-4">10 USDT</td>
            <td className="py-2 px-4">500 USDT</td>
            <td className="py-2 px-4">متغییر بنا به شبکه تتر</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">شبکه ترون</td>
            <td className="py-2 px-4">0.5 USDT</td>
            <td className="py-2 px-4">0 USDT</td>
            <td className="py-2 px-4">10 USDT</td>
            <td className="py-2 px-4">؟</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

