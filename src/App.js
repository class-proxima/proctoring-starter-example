import "./App.css";
import Proctor from "@classproxima/proctoring";
import { useEffect, useState, useRef } from "react";

const getDateString = () => {
  const date = new Date();
  return date.toTimeString().substr(0, 8);
};

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
      } else {
        console.error(response.error);
      }
    };
    // ***************
    // INITIALISATION
    // ***************
    let proctor = new Proctor(
      {
        activityUID: "yash-test-activity-id",
        apiKey: "5BD3G67-BDD4PT9-J08HC2Q-4M4PFNC",
        studentUID: "yash-test-student-id",
      },
      true
    );
    // ***************
    // LISTENING TO EVENTS
    //
    // Supports two modes - on and once
    // ***************
    proctor.on("mouse-enter", () => {
      setEvents((events) => [
        `${getDateString()} - Mouse entered the window`,
        ...events,
      ]);
      console.log("mouse-enter");
    });
    proctor.on("mouse-leave", () => {
      setEvents((events) => [
        `${getDateString()} - Mouse exited from window`,
        ...events,
      ]);
      console.log("mouse-leave");
    });
    proctor.on("page-back-to-foreground", () => {
      setEvents((events) => [
        `${getDateString()} - Tab in focus/ Window brought to foreground`,
        ...events,
      ]);
      console.log("page-back-to-foreground");
    });
    proctor.on("page-to-background", () => {
      setEvents((events) => [
        `${getDateString()} - Tab switched/ Window sent to background`,
        ...events,
      ]);
      console.log("page-to-background");
    });
    proctor.once("page-to-background", () => {
      console.log("page-to-background triggered only once");
    });
    proctor.on("gaze-outside", () => {
      setEvents((events) => [
        `${getDateString()} - Person looking outside the screen`,
        ...events,
      ]);
      console.log("gaze-outside");
    });
    proctor.on("multiple-faces-found", () => {
      setEvents((events) => [
        `${getDateString()} - Multiple faces detected`,
        ...events,
      ]);
      console.log("multiple-faces-found");
    });
    proctor.on("no-face-found", () => {
      setEvents((events) => [
        `${getDateString()} - No face detected`,
        ...events,
      ]);
      console.log("no-face-found");
    });
    proctor.on("expressions", (e) => {
      setEvents((events) => [
        `${getDateString()} - Expression: ${e.detail.toString()}`,
        ...events,
      ]);
      console.log(e.detail);
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
