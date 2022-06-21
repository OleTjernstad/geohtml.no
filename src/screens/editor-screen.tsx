import Editor from "../components/editor";

export default function EditorScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Editor />
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
