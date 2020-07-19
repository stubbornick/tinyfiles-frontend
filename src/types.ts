export interface File {
  id: string,
  name: string,
  size: number
}

export declare type FileHandler = (file: File) => void;
