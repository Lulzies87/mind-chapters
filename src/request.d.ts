declare namespace Express {
    export interface Request {
        chapter: (import("mongoose").Document<
            unknown,
            {},
            import("./chapters.model").Chapter
        > &
            import("./chapters.model").Chapter &
        {
            _id: Types.ObjectId;
        })
        | null;
    }
}