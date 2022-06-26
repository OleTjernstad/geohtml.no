import Button from "@mui/material/Button";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import toast from "react-hot-toast";
import usePWA from "react-pwa-install-prompt";

export const InstallPwa = () => {
  const { isInstallPromptSupported, isStandalone, promptInstall } = usePWA();

  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      toast.success("Takk for at du valgte å installere GeoHtml");
    }
  };

  const renderInstallButton = () => {
    // if (isInstallPromptSupported && isStandalone)

    console.log({ isInstallPromptSupported, isStandalone });
    return (
      <Button
        sx={{ marginBottom: "10px" }}
        onClick={onClickInstall}
        startIcon={<InstallDesktopIcon />}
        variant="contained"
      >
        Start installasjon
      </Button>
    );
    // return null;
  };

  if (!isInstallPromptSupported || isStandalone) return <></>;

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

        {renderInstallButton()}
      </div>
    </div>
  );
};
