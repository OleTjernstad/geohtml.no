// require("tinymce/tinymce");

import "@tjernstad-utvikling/geo-image/dist/plugin";

import { Editor as TinyMCEEditor } from "tinymce";
import { Editor as TinyMceReactEditor } from "@tinymce/tinymce-react";
import { useRef } from "react";

// import '../style/tinymce.css';

interface EditorProps {
  // file: File;
}

export default function Editor() {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <div style={{ maxWidth: "970px" }}>
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
