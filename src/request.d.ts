// declare namespace Express {
//     export interface Request {
//         chapter: (import("mongoose").Document<
//             unknown,
//             {},
//             import("./chapters.model").Book
//         > &
//             import("./chapters.model").Book &
//         {
//             _id: Types.ObjectId;
//         })
//         | null;
//     }
// }