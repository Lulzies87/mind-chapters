import { Schema, Types, model } from "mongoose";
export interface Chapter {
    author: string;
    title: string;
    content: string;
    timePosted: Date;
    likes: string[];
}

const schema = new Schema<Chapter>({
    timePosted: { type: Schema.Types.Date, default: () => new Date() },
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: [String], default: [], required: false}
    }
);

export const Chapter = model<Chapter>("Chapter", schema, "chapters");
