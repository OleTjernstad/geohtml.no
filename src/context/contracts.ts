import { File } from "../contracts/file";

export interface ContextInterface {
  files: File[];
  isEdited: Map<string, boolean>;
  refreshIndex: number | undefined;

  updateEditedStatus: (id: string, hasBeenEdited: boolean) => void;

  createNewFile: () => void;
  openExistingFile: () => void;
}
