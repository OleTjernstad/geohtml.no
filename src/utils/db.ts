// db.ts

import Dexie, { Table } from "dexie";

export interface FileContent {
  id?: string;
  name: string;
  content: string;
  fileHandle: FileSystemFileHandle | undefined;
}

export class GeoHTMLDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  files!: Table<FileContent>;

  constructor() {
    super("FileDB");
    this.version(1).stores({
      files: "++id, name, content, fileHandle", // Primary key and indexed props
    });
  }
}

export const db = new GeoHTMLDexie();
