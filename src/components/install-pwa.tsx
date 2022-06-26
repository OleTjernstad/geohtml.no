// import Button from "@mui/material/Button";
// import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";

import { useEffect } from "react";

// import usePWA from "react-pwa-install-prompt";

export const InstallPwa = () => {
  // const { isInstallPromptSupported, isStandalone, promptInstall } = usePWA();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", function (e: any) {
      // log the platforms provided as options in an install prompt
      console.log(e.platforms); // e.g., ["web", "android", "windows"]
      e.userChoice.then(
        function (choiceResult: any) {
          console.log(choiceResult.outcome); // either "accepted" or "dismissed"
        },
        (e: any) => console.log("error", e)
      );
    });
    // 👇️ remove the event listener when component unmounts
    return () => {
      window.removeEventListener("beforeinstallprompt", (e) => console.log(e));
    };
  });

  // const onClickInstall = async () => {
  //   const didInstall = await promptInstall();
  //   if (didInstall) {
  //     // User accepted PWA install
  //   }
  // };

  // const renderInstallButton = () => {
  //   // if (isInstallPromptSupported && isStandalone)

  //   console.log({ isInstallPromptSupported, isStandalone });
  //   return (
  //     <Button
  //       sx={{ marginBottom: "10px" }}
  //       onClick={onClickInstall}
  //       startIcon={<InstallDesktopIcon />}
  //       variant="contained"
  //     >
  //       Start installasjon
  //     </Button>
  //   );
  //   // return null;
  // };

  //   if (!isInstallPromptSupported && isStandalone) return <></>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "5vh",
      }}
    >
      <div
        style={{
          border: "5px solid #4a4063",
          borderRadius: "20px",
          flexDirection: "column",
          padding: "0.2rem",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h2>Installer appen for offline tilgang</h2>

        <p>GeoHtml kan også brukes uten å installeres</p>

        {/* {renderInstallButton()} */}
      </div>
    </div>
  );
};
