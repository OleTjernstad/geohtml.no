import { createContext, useContext, useRef, useState } from "react";

import { ContextInterface } from "./contracts";
import { File } from "../contracts/file";
import { Editor as TinyMCEEditor } from "tinymce";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const context = createContext<ContextInterface>({} as ContextInterface);

export const useFile = () => {
  return useContext(context);
};

export const FileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);
  const [isEdited, setIsEdited] = useState<Map<string, boolean>>(new Map());
  const [refreshIndex, setRefreshIndex] = useState<number>();

  const editorRef = useRef<TinyMCEEditor>();

  const navigate = useNavigate();

  // New file
  useHotkeys("Control+m", (e) => {
    e.preventDefault();
    newFile();
  });

  // Open file
  useHotkeys("Control+o", (e) => {
    e.preventDefault();
    openFile();
  });

  function newFile() {
    const id = uuidv4();
    setFiles((prev) => {
      return [
        ...prev,
        { id, content: "", name: "Ny fil.html", fileHandle: undefined },
      ];
    });
    navigate(`editor/${id}`);
    updateEditedStatus(id, true);
  }

  async function openFile() {
    const [fileHandle] = await window.showOpenFilePicker();
    console.log(fileHandle);
    const file = await fileHandle.getFile();
    const contents = await file.text();

    const id = uuidv4();
    setFiles((prev) => {
      return [...prev, { id, content: contents, name: file.name, fileHandle }];
    });
    navigate(`editor/${id}`);
  }

  async function saveFile(id: string) {
    const file = files.find((f) => f.id === id);

    if (file) {
      // Save file as
      if (!file.fileHandle) {
        const options = {
          suggestedName: "Beskrivelse.html",
          types: [
            {
              description: "Geocaching beskrivelse",
              accept: {
                "text/html": [".html"],
              },
            },
          ],
        };
        const fileHandle = await window.showSaveFilePicker(options);

        _save(file, fileHandle);
      } else {
        _save(file, file.fileHandle);
      }
    }
  }

  async function _save(file: File, fileHandle: FileSystemFileHandle) {
    const newContent = editorRef.current?.getContent();

    const savedFile = await fileHandle.getFile();

    setFiles((fs) => {
      return fs.map((f) => {
        if (f.id === file.id) {
          return {
            ...f,
            content: newContent ?? f.content,
            name: savedFile.name,
            fileHandle,
          };
        }
        return f;
      });
    });
    updateEditedStatus(file.id, false);
    // Create a FileSystemWritableFileStream to write to.
    const writable = await fileHandle.createWritable();
    // Write the contents of the file to the stream.
    await writable.write(newContent ?? file.content);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  const updateEditedStatus = (id: string, hasBeenEdited: boolean) => {
    const currentIsEdited = isEdited;

    currentIsEdited.set(id, hasBeenEdited);

    setIsEdited(currentIsEdited);
    setRefreshIndex(Date.now());
  };

  // useEffect(() => {
  //   const removeListener = electron.ipcRenderer.on('new-file', (_file) => {
  //     const id = uuidv4();
  //     if (!isFile(_file)) return;
  //     setFiles((prev) => {
  //       return [...prev, { ..._file, id }];
  //     });
  //     setActiveId(id);
  //   });
  //   return () => {
  //     if (removeListener) removeListener();
  //   };
  // }, []);

  // useEffect(() => {
  //   electron.ipcRenderer.once('save-file', (arg) => {
  //     if (!isFile(arg)) return;

  //     setFiles((fs) => {
  //       return fs.map((f) => {
  //         if (f.id === arg.id) {
  //           return arg;
  //         }
  //         return f;
  //       });
  //     });
  //   });
  // }, []);

  return (
    <context.Provider
      value={{
        files,
        isEdited,
        refreshIndex,
        editorRef,

        updateEditedStatus,
        createNewFile: newFile,
        openExistingFile: openFile,
        saveFile,
      }}
    >
      {children}
    </context.Provider>
  );
};
