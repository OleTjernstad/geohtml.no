import AppBar from "../components/app-bar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import logo from "../assets/logo.png";

export default function StartScreen() {
  return (
    <>
      <AppBar />
      <Box sx={{ paddingTop: "70px" }}>
        <div>
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
              For interaksjon med programmet benytt tastatursnarveiene under,
              eller menyen øverst til venstre
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

              <dt>Lagre som</dt>
              <dd>
                <Chip label="Ctrl" /> + <Chip label="Shift" /> +{" "}
                <Chip label="S" />
              </dd>
            </dl>
          </div>
        </div>
      </Box>
    </>
  );
}
