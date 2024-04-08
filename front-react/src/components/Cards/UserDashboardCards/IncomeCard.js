import { Card } from "primereact/card";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons

function IncomeCard() {
  const ReportLegend = (
    <div className="   justify-content-center " style={{ color: "#424874" }}>
      <span className="pi pi-user mr-2 text-5xl"></span>
      <span className="font-bold text-5xl font"> درآمد حاصل </span>
    </div>
  );

  return (
    <Card
      title={ReportLegend}
      className=" m-4 h-full p-1 font bg-white shadow-7"
      style={{ color: "#424874", borderColor: "#424874", borderWidth: "2px" }}
    >
      <p className="  text-5xl   ">
        <p className="m-3 text-5xl  p-button-outlined font">در ماه اخیر</p>

        <br></br>
        <p className=" m-3  text-5xl  p-button-outlined font">در سال اخیر</p>
      </p>
    </Card>
  );
}

export default IncomeCard;
