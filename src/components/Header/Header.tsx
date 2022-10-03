import React, { useState, useEffect, useRef } from "react";
import "./header.css";
import {
  getBaseURL,
  times,
  minifyTimetable,
  base64ToURLSafe,
  minifyURL,
} from "../../misc";
import Menu from "../Menu";
import MenuItem from "../MenuItem";
import { HeaderProps } from "./types";
import { overlayType } from "../Overlay";
import subscribeUserToPush from "../../subscribeNotifications";
import LZUTF8 from "lzutf8";
import Error from "../Error";

const Header = (props: HeaderProps) => {
  const { setTransition, isTransitioning, curr, isSwiping, setCurr } = props;
  const [buttonText, setText] = useState("Copy URL for Mobile");
  const [shortURLText, setShortURLText] = useState("Copy Short URL");
  const [resetText, setResetText] = useState("Hold To Reset Timetable");
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef<HTMLDivElement>(null);
  const variable = useRef(false);
  const tid = useRef<NodeJS.Timeout>();
  const resetTimetable = () => {
    window.localStorage.clear();
    window.location.href = getBaseURL();
  };

  const handleError = (errorMessage: string) => {
    setErrorMessage(errorMessage);
    const { current } = errorRef;
    if (current) {
      current.style.top = "0";
      setTimeout(() => (current.style.top = ""), 2000);
    }
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
      <Error {...{ errorMessage, errorRef }} />
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
          text={shortURLText}
          onClick={() => {
            minifyURL(props.timetableData, (shortURL, err) => {
              if (err) {
              } //TODO Do something about it
              if (shortURL)
                navigator.clipboard.writeText(shortURL).then(() => {
                  setShortURLText("Copied!");
                  setTimeout(() => setShortURLText("Copy Short URL"), 600);
                });
            });
          }}
        />
        <MenuItem
          disabled={
            (!("serviceWorker" in navigator) && !("PushManager" in window)) ||
            Notification.permission !== "default"
          }
          text={"Enable Notifications"}
          onClick={async () => {
            if ((await subscribeUserToPush()) === false)
              handleError("Registration failed, please try again.");
          }}
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
