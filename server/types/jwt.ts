export interface IAdminPayLoad {
    id: string;
}
export interface IUserPayLoad {
    id: string;
}

export type IJWTPayLoad = IAdminPayLoad | IUserPayLoad;
