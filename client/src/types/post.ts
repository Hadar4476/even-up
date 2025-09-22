import { IDocument } from "./common";

export interface IPost extends IDocument {
  title: string;
  content: string;
}
