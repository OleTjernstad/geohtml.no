export interface File {
  content: string;
  name: string;
  path: string | undefined;
  id: string;
}

export function isFile(obj: unknown): obj is File {
  return (
    (obj as File).name !== undefined && typeof (obj as File).name === 'string'
  );
}
