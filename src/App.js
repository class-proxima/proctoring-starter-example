import logo from "./logo.svg";
import "./App.css";
import Proctor from "@classproxima/proctoring";
import { useEffect, useState } from "react";

function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    let proctoring = async () => {
      let status = await proctor.startMonitoring();
      console.log(status);
    };
    let proctor = new Proctor("api-key", "student-id");
    proctor.on("mouse-enter", () => {
      setEvents((events) => [...events, "Mouse entered the window"]);
      console.log("mouse-enter");
    });
    proctor.on("mouse-leave", () => {
      setEvents((events) => [...events, "Mouse exited from window"]);
      console.log("mouse-leave");
    });
    proctor.on("page-back-to-foreground", () => {
      setEvents((events) => [
        ...events,
        "Tab in focus/ Window brought to foreground",
      ]);
      console.log("page-back-to-foreground");
    });
    proctor.on("page-to-background", () => {
      setEvents((events) => [
        ...events,
        "Tab switched/ Window sent to background",
      ]);
      console.log("page-to-background");
    });
    proctoring();
    return () => {
      proctor.stopMonitoring();
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Logs</h1>
        <h6>
          Try navigating away from screen, switching tabs to generate logs
        </h6>
        <div>
          {events.map((event) => {
            return <li style={{ fontSize: "0.75em" }}>{event}</li>;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
