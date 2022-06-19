// require("tinymce/tinymce");
import "@tjernstad-utvikling/geo-image/dist/plugin";

import { Editor as TinyMCEEditor } from "tinymce";
// import '../style/tinymce.css';
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

interface EditorProps {
  // file: File;
}

export default function Editor() {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <>
      <TinyMceReactEditor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(_, editor) => {
          editorRef.current = editor;
        }}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          content_css: "",
          language: "nb_NO",
          language_url: "/langs/nb_NO.js",
          plugins: ["table", "code", "wordcount", "geo-image"],
          toolbar: [
            { name: "history", items: ["undo", "redo"] },
            { name: "styles", items: ["styles"] },
            { name: "image", items: ["geo-image"] },
          ],
        }}
      />
      {/* <Button variant="contained" onClick={() => copyContentToClipboard()}>
        Kopier html
      </Button> */}
    </>
  );
}
