import { createContext, useContext, useRef, useState } from "react";

import { ContextInterface } from "./contracts";
import { File } from "../contracts/file";
import { Editor as TinyMCEEditor } from "tinymce";
import { db } from "../utils/db";
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

  async function newFile() {
    const id = uuidv4();
    setFiles((prev) => {
      return [...prev, { id, name: "Ny.html", fileHandle: undefined }];
    });

    await db.files.add({
      id,
      name: "Ny.html",
      content: "",
      fileHandle: undefined,
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
      return [...prev, { id, name: file.name, fileHandle }];
    });

    await db.files.add({
      id,
      name: file.name,
      content: contents,
      fileHandle,
    });

    navigate(`editor/${id}`);
  }

  async function saveFile(id: string) {
    const file = files.find((f) => f.id === id);

    if (file) {
      // Save file as first time
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
        // save file
        _save(file, file.fileHandle);
      }
    }
  }
  async function saveFileAs(id: string) {
    const file = files.find((f) => f.id === id);

    if (file) {
      // Save file as
      const options = {
        suggestedName: file.name,
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
    }
  }

  async function _save(file: File, fileHandle: FileSystemFileHandle) {
    const newContent = editorRef.current?.getContent();

    const savedFile = await fileHandle.getFile();

    if (!newContent) return;

    db.files.update(file.id, {
      name: savedFile.name,
      fileHandle,
    });

    setFiles((fs) => {
      return fs.map((f) => {
        if (f.id === file.id) {
          return {
            ...f,
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
    await writable.write(newContent);
    // Close the file and write the contents to disk.
    await writable.close();
  }

  const updateEditedStatus = (id: string, hasBeenEdited: boolean) => {
    const currentIsEdited = isEdited;

    currentIsEdited.set(id, hasBeenEdited);

    setIsEdited(currentIsEdited);
    setRefreshIndex(Date.now());
  };

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
        saveFileAs,
      }}
    >
      {children}
    </context.Provider>
  );
};
