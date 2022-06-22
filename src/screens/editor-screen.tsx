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
      <Editor openNewFile={createNewFile} />
    </div>
  );
}

// import { useEffect, useState } from 'react';
// import Editor from 'renderer/components/editor';
// import FileSelector from 'renderer/components/file-tabs';
// import { useFile } from 'renderer/context/file';
// import { File } from 'renderer/contracts/file';

// export default function EditorScreen() {
//   const { activeId, files } = useFile();
//   const [selectedFile, setSelectedFile] = useState<File>();

//   useEffect(() => {
//     const file = files.find((f) => f.id === activeId);
//     if (file) setSelectedFile(file);
//   }, [activeId, files]);

//   return (
//     <div
//       style={{
//         width: '100vw',
//         height: '100vh',
//       }}
//     >
//       <FileSelector />
//       {selectedFile && activeId && <Editor file={selectedFile} />}
//     </div>
//   );
// }
