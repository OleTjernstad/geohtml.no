import { File } from "../contracts/file";
import { Editor as TinyMCEEditor } from "tinymce";

export interface ContextInterface {
  files: File[];
  isEdited: Map<string, boolean>;
  refreshIndex: number | undefined;
  editorRef: React.MutableRefObject<TinyMCEEditor | undefined>;

  updateEditedStatus: (id: string, hasBeenEdited: boolean) => void;

  createNewFile: () => void;
  openExistingFile: () => void;
  saveFile: (id: string) => void;
  saveFileAs: (id: string) => void;
}
