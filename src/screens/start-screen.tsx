import Chip from "@mui/material/Chip";
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFile } from 'renderer/context/file';
// import logo from '../../../assets/logo.png';

export default function StartScreen() {
  // const { files } = useFile();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (files.length > 0) {
  //     navigate('edit');
  //   }
  // }, [files.length, navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* <img
          src={logo}
          style={{ height: '40vmin', marginTop: '5vh' }}
          alt="logo"
        /> */}
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
            <Chip label="Ctrl" /> + <Chip label="N" />
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
