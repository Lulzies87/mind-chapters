import { Schema, Types, model } from "mongoose";
interface Chapter {
    author: string;
    title: string;
    content: string;
    timePosted: Date;
}

const schema = new Schema<Chapter>({
    timePosted: { type: Schema.Types.Date, default: () => new Date() },
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    }
);

export const Chapter = model<Chapter>("Chapter", schema, "chapters");
