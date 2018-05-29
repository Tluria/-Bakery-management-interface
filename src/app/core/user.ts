export interface Roles {
    subscriber?:string;
    editor?:string;
    admin?:string;
    supplier?:string;
}

export interface User {
    uid?: string;
    email: string;
    displayName?: string;
    roles?: Roles;
    password?: string;
}
