import React, { useState, useEffect } from "react";

export default function WidthdrawRate() {
  return (
    <div>
      <div className="m-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-indigo-700 text-white">کارمزد برداشت</th>
              <th className="py-2 px-4 bg-indigo-700 text-white">میزان برداشت تومان</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 bg-indigo-300">یک درصد میزان برداشت</td>
              <td className="py-2 px-4">کمتر از 400 هزار تومان</td>
            </tr>
            <tr>
              <td className="py-2 px-4 bg-indigo-300">4000 تومان</td>
              <td className="py-2 px-4">400 تا 50 میلیون تومان</td>
            </tr>
            <tr>
              <td className="py-2 px-4 bg-indigo-300">4000هزار تومان به ازای هر 50 میلیون تومان</td>
              <td className="py-2 px-4">بیشتر از 50 میلیون تومان</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}