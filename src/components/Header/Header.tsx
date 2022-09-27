import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import {
  getBaseURL,
  times,
  minifyTimetable,
  base64ToURLSafe,
} from "../../misc";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import { HeaderProps } from "./types";
import { overlayType } from "../Overlay";
import subscribeUserToPush from "../../subscribeNotifications";
import LZUTF8 from "lzutf8";

const Header = (props: HeaderProps) => {
  const { setTransition, isTransitioning, curr, isSwiping, setCurr } = props;
  const [buttonText, setText] = useState("Copy URL for Mobile");
  const [resetText, setResetText] = useState("Hold To Reset Timetable");
  const variable = useRef(false);
  const tid = useRef<NodeJS.Timeout>();
  const resetTimetable = () => {
    window.localStorage.clear();
    window.location.href = getBaseURL();
  };

  useEffect(() => {
    const onmouseup = () => {
      setResetText("Hold To Reset Timetable");
      variable.current = false;
      clearTimeout(tid.current);
    };
    document.addEventListener("mouseup", onmouseup);
    document.addEventListener("touchend", onmouseup);
    return () => {
      document.removeEventListener("mouseup", onmouseup);
      document.removeEventListener("touchend", onmouseup);
    };
  }, []);

  return (
    <div id="header">
      <Menu>
        <MenuItem
          text={buttonText}
          onClick={() => {
            const minified = minifyTimetable(props.timetableData);
            const base64 = LZUTF8.compress(minified, {
              inputEncoding: "String",
              outputEncoding: "Base64",
            });
            const url = `${getBaseURL()}?timetable=${base64ToURLSafe(base64)}`;
            navigator.clipboard.writeText(url).then(() => {
              setText("Copied!");
              setTimeout(() => setText("Copy URL for Mobile"), 600);
            });
          }}
        />
        <MenuItem
          disabled={
            (!("serviceWorker" in navigator) && !("PushManager" in window)) ||
            Notification.permission !== "default"
          }
          text={"Enable Notifications"}
          onClick={subscribeUserToPush}
        />
        <MenuItem
          text={"Customize"}
          onClick={() => props.setOverlay(overlayType.CUSTOMIZE)}
        />
        <MenuItem
          text={resetText}
          onMouseDown={() => {
            variable.current = true;
            setResetText("Resetting");
            times(3, (i) =>
              setTimeout(
                () => variable.current && setResetText((s) => `${s}.`),
                (i + 1) * 250
              )
            );
            tid.current = setTimeout(() => {
              if (variable.current) resetTimetable();
              else setResetText("Hold To Reset Timetable");
            }, 1000);
          }}
        />
        <MenuItem
          text="Gen QR Code"
          onClick={() => props.setOverlay(overlayType.QR_CODE)}
        />
      </Menu>
      {["M", "T", "W", "T", "F"].map((day, i) => {
        return (
          <div
            className="header-button-container"
            key={i}
            onClick={() => {
              if (!isTransitioning && !isSwiping) {
                setCurr(i);
                setTransition(true);
                setTimeout(() => setTransition(false), 600);
              }
            }}
            style={{ opacity: i !== curr ? 0.3 : 1 }}
          >
            <div
              className="header-button"
              style={{
                cursor: isTransitioning ? "not-allowed" : "pointer",
                backgroundColor: i !== curr ? "white" : "#bbbbbb",
                color: i !== curr ? "black" : "white",
              }}
            >
              {day}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Header;
