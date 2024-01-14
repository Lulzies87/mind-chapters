import { Schema, model } from "mongoose"
interface Chapter {
    author: string;
    title: string;
    content: string;
    timePosted: Date;
}

const schema = new Schema<Chapter>({
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    timePosted: { type: Date, immutable: true, required: true }
    }
);

export const Chapter = model<Chapter>("Chapter", schema, "chapters");
