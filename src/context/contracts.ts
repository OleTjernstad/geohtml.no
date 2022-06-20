import { File } from "../contracts/file";

export interface ContextInterface {
  files: File[];
  activeId: string | undefined;
  isEdited: Map<string, boolean>;
  refreshIndex: number | undefined;

  setActiveFile: (id: string) => void;
  updateEditedStatus: (id: string, hasBeenEdited: boolean) => void;
}
