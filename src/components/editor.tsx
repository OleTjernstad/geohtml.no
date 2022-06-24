import "@tjernstad-utvikling/geo-image/dist/plugin";

import { useEffect, useState } from "react";

import { File } from "../contracts/file";
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react";
import { db } from "../utils/db";
import { useFile } from "../context/file";
import { useHotkeys } from "react-hotkeys-hook";

interface EditorProps {
  file: File;
  openNewFile: () => void;
  openExistingFile: () => void;
}

export default function Editor({
  openNewFile,
  file,
  openExistingFile,
}: EditorProps) {
  const { saveFile, editorRef, updateEditedStatus, saveFileAs } = useFile();

  const [fileContent, setFileContent] = useState<string | undefined>();

  useEffect(() => {
    let active = true;
    setFileContent("");
    load();
    return () => {
      active = false;
    };

    async function load() {
      const res = await db.files.get({ id: file.id });
      if (!active) {
        return;
      }
      setFileContent(res?.content ?? "");
    }
  }, [file.id]);

  // Save file
  useHotkeys("Control+s", (e) => {
    e.preventDefault();
    console.log("editor", file);

    if (file.id) saveFile(file.id);
  });

  // Save file
  useHotkeys("Control+Shift+s", (e) => {
    e.preventDefault();

    if (file.id) saveFileAs(file.id);
  });

  function onContentUpdate(evt: any) {
    if (file) db.files.update(file.id, { content: evt.lastLevel.content });
  }

  return (
    <div style={{ maxWidth: "970px" }}>
      <TinyMceReactEditor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        onChange={(evt) => {
          onContentUpdate(evt);
          if (file) updateEditedStatus(file.id, true);
        }}
        initialValue={fileContent}
        init={{
          height: 500,
          menubar: false,
          content_css: "",
          language: "nb_NO",
          language_url: "/langs/nb_NO.js",
          setup: (editor) => {
            editor.addShortcut("ctrl+m", "Åpne nytt dokument", () => {
              openNewFile();
            });
            editor.addShortcut("ctrl+o", "Åpne eksisterende dokument", () => {
              openExistingFile();
            });
            editor.addShortcut("ctrl+s", "Lagre dokument", () => {
              if (file.id) saveFile(file.id);
            });
            editor.addShortcut("ctrl+shift+s", "Lagre dokument som", () => {
              if (file.id) saveFileAs(file.id);
            });
          },
          plugins: [
            "table",
            "code",
            "wordcount",
            "lists",
            "advlist",
            "geo-image",
          ],
          toolbar: [
            "undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | removeformat | code ",
            " fontfamily  fontsize | forecolor backcolor | table bullist numlist | outdent indent | hr geo-image |  ",
          ],
        }}
      />
      {/* <Button variant="contained" onClick={() => copyContentToClipboard()}>
        Kopier html
      </Button> */}
    </div>
  );
}
