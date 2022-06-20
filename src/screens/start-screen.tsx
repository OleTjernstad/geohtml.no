import Chip from "@mui/material/Chip";
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useFile } from "../context/file";
import { useNavigate } from "react-router-dom";

export default function StartScreen() {
  const { files } = useFile();
  const navigate = useNavigate();

  useEffect(() => {
    if (files.length > 0) {
      navigate("editor");
    }
  }, [files.length, navigate]);

  // async function getFile() {
  //   const [fileHandle] = await window.showOpenFilePicker();
  //   console.log(fileHandle);
  //   const file = await fileHandle.getFile();
  //   const contents = await file.text();
  //   console.log(contents);
  // }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={logo}
          style={{ height: "40vmin", marginTop: "5vh" }}
          alt="logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
        }}
      >
        <p>
          For interaksjon med programmet benytt tastatursnarveiene under, eller
          menyen øverst til venstre
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1vh",
        }}
      >
        <dl>
          <dt>Ny fil</dt>
          <dd>
            <Chip label="Ctrl" /> + <Chip label="M" />
          </dd>

          <dt>Åpne fil</dt>
          <dd>
            <Chip label="Ctrl" /> + <Chip label="O" />
          </dd>

          <dt>Lagre</dt>
          <dd>
            <Chip label="Ctrl" /> + <Chip label="S" />
          </dd>
        </dl>
      </div>
    </div>
  );
}
