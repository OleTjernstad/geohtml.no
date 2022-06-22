import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Editor from "../components/editor";
import { useFile } from "../context/file";

export default function EditorScreen() {
  const { createNewFile, files } = useFile();

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const file = useMemo(() => {
    return files.find((f) => f.id === id);
  }, [id, files]);

  useEffect(() => {
    const file = files.find((f) => f.id === id);

    if (!file) {
      navigate("/");
    }
  }, [files, id, navigate]);

  if (!file) {
    return <div />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Editor file={file} openNewFile={createNewFile} />
    </div>
  );
}
