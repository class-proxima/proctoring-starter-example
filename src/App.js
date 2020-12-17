import "./App.css";
import Proctor from "@classproxima/proctoring";
import { useEffect, useState, useRef } from "react";

function App() {
  const [events, setEvents] = useState([]);
  const [stream, setStream] = useState();
  const videoRef = useRef();
  useEffect(() => {
    if (stream) videoRef.current.srcObject = stream;
  }, [stream]);
  useEffect(() => {
    let proctoring = async () => {
      // ***************
      // PROGRAMATICALLY START MONITORING
      // ***************
      let response = await proctor.startMonitoring();
      if (response.status) {
        setStream(response.stream);
      }
    };
    // ***************
    // INITIALISATION
    // ***************
    let proctor = new Proctor("api-key");
    // ***************
    // LISTENING TO EVENTS
    //
    // Supports two modes - on and once
    // ***************
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
    proctor.once("page-to-background", () => {
      console.log("page-to-background triggered only once");
    });
    proctor.on("gaze-outside", () => {
      setEvents((events) => [...events, "Person looking outside the screen"]);
      console.log("gaze-outside");
    });
    proctor.on("multiple-faces-found", () => {
      setEvents((events) => [...events, "Multiple faces detected"]);
      console.log("multiple-faces-found");
    });
    proctor.on("no-face-found", () => {
      setEvents((events) => [...events, "No face detected"]);
      console.log("no-face-found");
    });
    proctoring();
    return () => {
      // ***************
      // PROGRAMATICALLY STOP MONITORING
      // ***************
      proctor.stopMonitoring();
    };
  }, []);
  return (
    <div className="App">
      <div className="w-100">
        <header className="App-header">
          <h4>Video</h4>
          <video ref={videoRef} autoPlay height="300px"></video>
        </header>
      </div>
      <div className="w-100">
        <header className="App-header">
          <h4>Logs</h4>
          <h6>
            Try navigating away from screen, switching tabs to generate logs
          </h6>
          <div className="logs-container w-100">
            {events.map((event) => {
              return <li style={{ fontSize: "0.75em" }}>{event}</li>;
            })}
          </div>
        </header>
      </div>
    </div>
  );
}

export default App;
