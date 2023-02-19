import React, { useState, useEffect } from "react";
// import { ProductService } from './service/ProductService';
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Skeleton } from "primereact/skeleton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import ImageBG from "../../HomePageComponent/ArtNft3.jpg";

import CollectionDialog from "../Dialog/CollectionDialog/CollectionDialog";
export default function BasicDemo() {
  const [products, setProducts] = useState([
    {
      id: 0,
      image: require("../../HomePageComponent/ArtNft3.jpg"),
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 1,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 2,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 3,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 4,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 5,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
    {
      id: 6,
      image: "",
      name: "this is name",
      basicprice: "9000",
    },
  ]);
 
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [sortField, setSortField] = useState("");
  const sortOptions = [
    { label: "قیمت زیاد به کم", value: "!price" },
    { label: "قیمت کم به زیاد", value: "price" },
  ];
 
  const [layout, setLayout] = useState("grid");
  const [loading, setloading] = useState(false);
   useEffect(() => {
    // ProductService.getProductsSmall().then((data) => setProducts(data.slice(0, 6)));
  }, []);

  const listItem = () => {
    if (loading) {
      return (
        <div className="col-12">
          <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <Skeleton className="w-9 sm:w-16rem xl:w-10rem shadow-2 h-6rem block xl:block mx-auto border-round" />
            <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                <Skeleton className="w-8rem border-round h-2rem" />
                <Skeleton className="w-6rem border-round h-1rem" />
                <div className="flex align-items-center gap-3">
                  <Skeleton className="w-6rem border-round h-1rem" />
                  <Skeleton className="w-3rem border-round h-1rem" />
                </div>
              </div>
              <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                <Skeleton className="w-4rem border-round h-2rem" />
                <Skeleton shape="circle" className="w-3rem h-3rem" />
              </div>
            </div>
          </div>
        </div>
      );
    }
         

    return (
      <>
       
        <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
       
            <img
              className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              src={products[0].image}
              alt={products[0].name}
            />;
        

          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{products[0].name}s</div>
              <Rating value={products[0].rating} readOnly cancel={false}></Rating>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{products[0].category}</span>
                </span>
                <Tag
                  value={products[0].inventoryStatus}
                  severity={getSeverity(products[0])}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${products[0].basicprice}</span>
              <CollectionDialog    />
              {/* <Button
               
                className=" font" onClick={()=>{setVisible(true)}}
                disabled={products.inventoryStatus === "OUTOFSTOCK"}
              >فروش</Button> */}
            </div>
          </div>
        </div>
      </div> 
     
      </>
     
     
    );
  };

  const gridItem = () => {
    if (loading) {
      return (
        <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div className="p-4 border-1 surface-border surface-card border-round">
            <div className="flex flex-wrap align-items-center justify-content-between gap-2">
              <Skeleton className="w-6rem border-round h-1rem" />
              <Skeleton className="w-3rem border-round h-1rem" />
            </div>
            <div className="flex flex-column align-items-center gap-3 py-5">
              <Skeleton className="w-9 shadow-2 border-round h-10rem" />
              <Skeleton className="w-8rem border-round h-2rem" />
              <Skeleton className="w-6rem border-round h-1rem" />
            </div>
            <div className="flex align-items-center justify-content-between">
              <Skeleton className="w-4rem border-round h-2rem" />
              <Skeleton shape="circle" className="w-3rem h-3rem" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{products[0].category}</span>
            </div>
            <Tag
              value={products[0].inventoryStatus}
              severity={getSeverity(products)}
            ></Tag>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img
              className="w-9 shadow-2 border-round"
              src={ImageBG}
              alt={products.name}
            />
            <div className="text-2xl font-bold">{products[0].name}</div>
            <Rating value={products.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="flex align-items-center justify-content-between">
          <span className="text-2xl font-semibold">${products[0].basicprice}</span>
          <CollectionDialog    />

            {/* 
            <Button
              icon="pi pi-shopping-cart"
              className="font"
              disabled={products.inventoryStatus === "OUTOFSTOCK"}
            >فروش</Button> */}
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === "list") return listItem(product);
    else if (layout === "grid") return gridItem(product);
  };

  const header = () => {
    return (
      <div className=" flex flex-wrap ">
        <div className="  flex   ">
          <div className="mr-2" style={{ direction: "ltr" }}>
            <DataViewLayoutOptions
              layout={layout}
              onChange={(e) => setLayout(e.value)}
            />
          </div>
          <div className="mr-3  ">
            <Button
              icon="pi pi-refresh"
              style={{ width: "40px" }}
              rounded
              raised
            />
          </div>
        </div>
        <div className="      mt-3 mr-8  ">
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="  مرتب کردن قیمت"
            onChange={onSortChange}
            className="w-full sm:w-14rem font"
          />
        </div>
      </div>
    );
  };
  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };
  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };
  return (
    <div className="card flex m-3">
      <DataView
        value={products}
        sortField={sortField}
        sortOrder={sortOrder}
        itemTemplate={itemTemplate}
        layout={layout}
        header={header()}
        // paginator
        dataKey="id"
        emptyMessage="No customers found."
      />
    </div>
  );
}
