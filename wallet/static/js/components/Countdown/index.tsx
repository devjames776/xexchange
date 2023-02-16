import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { updateRefetch } from "redux/slices";

export enum CountdownStyle {
  HOMEPAGE = "homepage-countdown",
  CONTRACT_STATUS = "contract-status-countdown ",
}

const CountDown = ({
  utcDate,
  className,
  title,
}: {
  utcDate: string;
  className?: CountdownStyle;
  title?: React.ComponentType;
}) => {
  const TitleComponent = title;
  const now = moment.utc();
  const genesis = moment.utc(utcDate, "ddd MMM DD YYYY HH:mm:ss");
  const diffDays = moment.duration(genesis.diff(now));

  const [days, setDays] = useState(diffDays.days());
  const [hours, setHours] = useState(diffDays.hours());
  const [minutes, setMinutes] = useState(diffDays.minutes());
  const [seconds, setSeconds] = useState(diffDays.seconds());
  const dispatch = useDispatch();

  useEffect(() => {
    const myInterval = setInterval(() => {
      const currentTime = moment.utc();
      const currentDiffDays = moment.duration(genesis.diff(currentTime));

      if (currentDiffDays.isValid() && currentDiffDays.asSeconds() > 0) {
        setDays(currentDiffDays.days());
        setHours(currentDiffDays.hours());
        setMinutes(currentDiffDays.minutes());
        setSeconds(currentDiffDays.seconds());
      } else {
        dispatch(updateRefetch());
        clearInterval(myInterval);
      }
    }, 1000);
    if (myInterval)
      return () => {
        clearInterval(myInterval);
      };
  });

  return (
    <div className={`${className} py-spacer d-flex flex-column`}>
      {TitleComponent ? <TitleComponent /> : ""}

      <div className="time-holder border d-flex">
        <div className="time-block d-flex align-items-center justify-content-center">
          <div className="digits">{isNaN(days) ? "" : days < 0 ? 0 : days}</div>
        </div>
        <div className="time-block d-flex align-items-center justify-content-center">
          <div className="digits">
            {isNaN(hours) ? "" : hours < 0 ? 0 : hours}
          </div>
        </div>
        <div className="time-block d-flex align-items-center justify-content-center">
          <div className="digits">
            {isNaN(minutes) ? "" : minutes < 0 ? 0 : minutes}
          </div>
        </div>
        <div className="time-block d-flex align-items-center justify-content-center">
          <div className="digits">
            {isNaN(seconds) ? "" : seconds < 0 ? 0 : seconds}
          </div>
        </div>
      </div>
      <div className="legend-holder d-flex">
        <div className="legend">days</div>
        <div className="legend">hours</div>
        <div className="legend">minutes</div>
        <div className="legend">seconds</div>
      </div>
    </div>
  );
};

export default CountDown;
