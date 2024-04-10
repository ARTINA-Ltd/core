import React from 'react';

export default function TradeRate() {
  return (
    <div className="m-8 sm:m-2 sm:text-[14px]">
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-indigo-700 text-white">حجم معاملات 30 روز گذشته</th>
            <th className="py-2 px-4 bg-indigo-700 text-white">کارمزد معادلات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">کمتر از 10 میلیون تومان</td>
            <td className="py-2 px-4">0.35%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">بین 10 تا 50 میلیون تومان</td>
            <td className="py-2 px-4">0.3%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">بین 50 تا 100 میلیون تومان</td>
            <td className="py-2 px-4">0.25%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 bg-indigo-300">بیشتر از 100 میلیون تومان</td>
            <td className="py-2 px-4">0.2%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
