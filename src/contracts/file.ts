export interface File {
  content: string;
  name: string;
  fileHandle: FileSystemFileHandle | undefined;
  id: string;
}
