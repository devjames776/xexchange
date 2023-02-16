import React, { forwardRef, useEffect, useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";

const rangeOfYears = (start: number, end: number) =>
  Array(end - start + 1)
    .fill(start)
    .map((year, index) => year + index);

const Datepicker = ({ setFieldValue }: any) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const years = rangeOfYears(1900, moment().year());
  const months = moment.months();

  useEffect(() => {
    setFieldValue("dob", moment(startDate).format("yyyy-MM-DD"));
  }, []);

  const CustomHeader = ({ date, changeYear, changeMonth }: any) => (
    <div className="d-flex ml-1">
      <select
        className="form-control form-control-sm mr-1"
        value={moment(date).year()}
        onChange={({ target: { value } }) => changeYear(Number(value))}
      >
        {years.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="form-control form-control-sm mr-1"
        value={months[moment(date).month()]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      >
        {months.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const CustomInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <input
      defaultValue={value}
      type="text"
      readOnly
      name="dob"
      onClick={onClick}
      ref={ref}
      className="form-control mt-1"
    />
  ));
  return (
    <DatePicker
      renderCustomHeader={CustomHeader}
      selected={startDate}
      onChange={(date: Date) => {
        setStartDate(date);
        setFieldValue("dob", moment(date).format("yyyy-MM-DD"));
      }}
      customInput={<CustomInput />}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default Datepicker;
