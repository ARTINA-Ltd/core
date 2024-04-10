import React, { useState, useEffect } from "react";
import "./UserDashboardTable.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function UserDashboardTable() {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(10);

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
    filters: {
      name: { value: "", matchMode: "contains" },
      "country.name": { value: "", matchMode: "contains" },
      company: { value: "", matchMode: "contains" },
      "representative.name": { value: "", matchMode: "contains" },
    },
  });

  let loadLazyTimeout = null;
  const TableData = [
    {
      id: 1,
      Exhibitionname: "adasd",

      CommissionPercentage: "12%",
      ProductSum: "1123",
      Benefit: "19%",
      EthersaleVolume: " ?",
      saleVolume: " ?",
      TerminationDate: "1999/02/03",
    },
    {
      id: 2,
      Exhibitionname: "adasd",

      CommissionPercentage: "12%",
      ProductSum: "1123",
      Benefit: "19%",
      EthersaleVolume: " ?",
      saleVolume: " ?",
      TerminationDate: "1999/02/03",
    },
    {
      id: 3,
      Exhibitionname: "adasd",

      CommissionPercentage: "12%",
      ProductSum: "1123",
      Benefit: "19%",
      EthersaleVolume: " ?",
      saleVolume: " ?",
      TerminationDate: "1999/02/03",
    },
  ];
  useEffect(() => {
    loadLazyData();
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 1000 + 250);
  }, [lazyParams]);
  // -------------------------------- Table Logics--------------------------------
  const loadLazyData = () => {
    setLoading(true);

    if (loadLazyTimeout) {
      clearTimeout(loadLazyTimeout);
    }
  };

  const onPage = (event) => {
    setLazyParams(event);
  };

  const onSort = (event) => {
    setLazyParams(event);
  };

  const onFilter = (event) => {
    event["first"] = 0;
    setLazyParams(event);
  };

  // -------------------------------- Table Columns--------------------------------

  const ProductSum = (TableData) => {
    return (
      <React.Fragment>
        <span className="image-text text-4xl text-5xl">
          {TableData.ProductSum}{" "}
        </span>
      </React.Fragment>
    );
  };
  const saleVolume = (TableData) => {
    return (
      <React.Fragment>
        <span className="image-text text-4xl ">{TableData.saleVolume} </span>
      </React.Fragment>
    );
  };

  const ExhibitionImage = (rowData) => {
    return (
      <div>
        <img
          alt=""
          src=""
          onError={(e) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
      </div>
    );
  };
  const EthersaleVolume = (rowData) => {
    return <div className="text-4xl">{rowData.EthersaleVolume}</div>;
  };

  const TerminationDate = (rowData) => {
    //TODO: Modal Accept Warning !
    return <div className="text-4xl">{rowData.TerminationDate}</div>;
  };

  const Benefit = (TableData) => {
    return <spen className="text-4xl">{TableData.Benefit}</spen>;
  };
  const CommissionPercentage = (TableData) => {
    return (
      <div className="text-4xl">
        <div> {TableData.CommissionPercentage}</div>
      </div>
    );
  };

  const Exhibitionname = (TableData) => {
    return (
      <div style={{ fontFamily: "IRANSansWeb" }}>
        <span className="image-text text-4xl">{TableData.Exhibitionname}</span>
      </div>
    );
  };

  // -------------------------------- card Title Section--------------------------------

  // --------------------------------    --------------------------------

  return (
    <DataTable
      value={TableData}
      scrollable
      scrollHeight="400px"
      lazy
      // paginator
      filterDisplay="row"
      responsiveLayout="scroll"
      dataKey="id"
      first={lazyParams.first}
      rows={10}
      totalRecords={totalRecords}
      onPage={onPage}
      onSort={onSort}
      sortField={lazyParams.sortField}
      sortOrder={lazyParams.sortOrder}
      onFilter={onFilter}
      filters={lazyParams.filters}
      loading={loading}
      style={{ color: "#424874" }}
    >
      <Column
        field=" نام نمایشگاه"
        header=" عکس"
        sortable
        body={ExhibitionImage}
      />

      <Column
        field="name"
        header=" نام نمایشگاه  "
        sortable
        filter
        filterPlaceholder="Search by name"
        body={Exhibitionname}
        //  filterPlaceholder="Search by name"
      />

      <Column
        field="country.name"
        header="  درصد کمیسیون "
        filterField="country.name"
        body={CommissionPercentage}
        sortable
        className=""
        //  filter
        //  filterPlaceholder="Search by country"
      />

      <Column
        field="company"
        sortable
        body={ProductSum}
        // filter
        header=" تعداد آثار  "
        // filterPlaceholder="Search by company"
      />
      <Column
        field="company"
        sortable
        body={Benefit}
        // filter
        header="سود حاصل   "
        // filterPlaceholder="Search by company"
      />
      <Column
        style={{ fontFamily: "IRANSansWeb" }}
        field="representative.name"
        header="  حجم فروش به اتر "
        sortable
        body={EthersaleVolume}
        // filter
        // filterPlaceholder="Search by representative"
      />
      <Column
        field="representative.name"
        header=" حجم فروش "
        sortable
        body={saleVolume}

        // filterPlaceholder="Search by representative"
      />
      <Column
        field=""
        sortable
        style={{ fontFamily: "IRANSansWeb" }}
        header="تاریخ پایان"
        // filterPlaceholder="Search by company"
        body={TerminationDate}
      />
    </DataTable>
  );
}

export default UserDashboardTable;
