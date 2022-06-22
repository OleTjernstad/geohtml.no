// require("tinymce/tinymce");

import "@tjernstad-utvikling/geo-image/dist/plugin";

import { File } from "../contracts/file";
import { Editor as TinyMCEEditor } from "tinymce";
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

// import '../style/tinymce.css';

interface EditorProps {
  file: File;
  openNewFile: () => void;
}

export default function Editor({ openNewFile, file }: EditorProps) {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <div style={{ maxWidth: "970px" }}>
      <TinyMceReactEditor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue={file.content}
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
