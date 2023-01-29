import "./form-styles.css";
import { images } from "../../images";
import React, { useState } from "react";
import axios from "axios";
import {
  DatePicker,
  DateTimePicker,
  DateRangePicker,
  DateTimeRangePicker,
} from "react-advance-jalaali-datepicker";

const Form = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleContarctChange = (e) => {
    setContract(e.target.files[0]);
  };

  const handleChange = (event) => {
    setIsChecked((current) => !current);
  };
  const [user, setUser] = useState(8);
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [contract, setContract] = useState(null);
  const [date, setDate] = useState(null);
  const [ticket, setTicket] = useState(null);

  const addNewStudent = async () => {
    let formField = new FormData();
    formField.append("user", user);
    formField.append("marketName", name);
    formField.append("start_date", date.formatted);
    formField.append("end_date", date.formatted);
    formField.append("contract", contract);
    // formField.append("ticket", ticket);

    if (image !== null) {
      formField.append("image", image);
    }

    await axios({
      method: "post",
      url: "http://78.38.35.249:8000/api/exhibition/exhibitions/",
      data: formField,
      mode: "cors",
    }).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="form-section">
      <img
        className="close-icon"
        src={images["close-icon.png"]}
        onClick={props.handleClose}
      />

      <div className="from-container">
        <div className="upload">
          <p className="form-title">پوستر مورد نظر خود را انتخاب کنید</p>
          <div className="upload-container">
            <label id="upload-label" for="inputTag">
              {/* <img
                src="http://100dayscss.com/codepen/upload.svg"
                class="upload-icon"
              /> */}
              <input
                id="inputTag"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                required
              />
              <br />
              <span id="imageName"></span>
            </label>
          </div>
        </div>
        <div className="ex-title">
          <p className="form-title">عنوان نمایشگاه</p>
          <input
            className="title-input date-input "
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-desc">
          <p className="form-title">توضیحات نمایشگاه</p>
          <textarea
            className="text-area"
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="date">
          <p className="form-title">تاریخ برگزاری نمایشگاه</p>
          <DateTimePicker
            style={"width : 240px;"}
            cancelOnBackgroundClick={true}
            onChange={(unix, formatted) =>
              setDate({
                formatted,
              })
            }
            placeholder="انتخاب تاریخ"
            format="YYYY-MM-DD"
          />
        </div>
        <div className="ticket">
          <div>
            <input
              value={isChecked}
              onChange={handleContarctChange}
              class="checkmark"
              type="checkbox"
            />
            <p className="ticket-title"> نمایشگاه من بلیط دارد</p>
          </div>
          {isChecked && (
            <input
              className="date-input"
              type="text"
              onChange={(e) => setTicket(e.target.value)}
            />
          )}
        </div>
        <div></div>
        <div className="contract">
          <input id="inputTag" type="file" onChange={handleImageChange} />
          <button className="form-btn contract-button">آپلود قرار داد</button>
          <button className="form-btn contract-button" contract-button>
            قرار داد های نمونه
          </button>
        </div>
        <button className="form-btn" onClick={addNewStudent}>
          ثبت نمایشگاه{" "}
        </button>
      </div>
    </div>
  );
};

export default Form;
