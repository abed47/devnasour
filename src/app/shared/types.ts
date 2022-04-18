export enum StorageTypes {
    LOCAL_STORAGE = 1,
    SESSION_STORAGE = 2,
    DB_STORAGE = 3
}

export type TowDTool = "selection" | "templates" | "text" | "image-upload" | "elements" | "background" | "folders" | "brush";

export type responseType = {
    data: any[] | any,
    status: 0 | 1,
    message: string,
    type: string
}