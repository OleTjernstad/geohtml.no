export interface File {
  content: string;
  name: string;
  fileHandle: FileSystemFileHandle | undefined;
  id: string;
}

export function isFile(obj: unknown): obj is File {
  return (
    (obj as File).name !== undefined && typeof (obj as File).name === "string"
  );
}
