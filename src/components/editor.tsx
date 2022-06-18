import { Editor as TinyMCEEditor } from "tinymce";
// import '../style/tinymce.css';
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

// require("tinymce/tinymce");
// // require("@tjernstad-utvikling/geo-image/dist/plugin");
// require("tinymce/plugins/code/index");
// require("tinymce/plugins/table/index");
// require("tinymce/plugins/lists/index");
// require("tinymce/themes/silver/index");
// require("tinymce/models/dom/index");
// require("tinymce/icons/default/index");

interface EditorProps {
  // file: File;
}

export default function Editor() {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <>
      <TinyMceReactEditor
        apiKey="98eu7znwbri5wrh1v1h5t47fd9iu8qkrrqkuvof5ygn60nbi"
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
          plugins: ["table", "code", "wordcount"],
          toolbar: [
            { name: "history", items: ["undo", "redo"] },
            { name: "styles", items: ["styles"] },
          ],
        }}
      />
      {/* <Button variant="contained" onClick={() => copyContentToClipboard()}>
        Kopier html
      </Button> */}
    </>
  );
}
