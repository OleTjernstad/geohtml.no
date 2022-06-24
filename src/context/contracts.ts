import { File } from "../contracts/file";
import { FileContent } from "../utils/db";
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

  openFileFromMemory: (fileContent: FileContent) => Promise<void>;

  lastFiles: FileContent[];
}
