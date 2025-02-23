export type LoginParams = {
    username: string;
    password: string;
    captchaId: string;
    verifyCode: string;
}

export type LoginResult = {
    token: string;
    userId: string; // 添加 userId 属性
}

export type CaptchaParams = {
    width?: number;
    height?: number;
}

export type CaptchaResult = {
    img: string;
    id: string;
}

export type UserInfo = {
    userName: string;
    roles: number[];
    [anykey: string | number]: any;
}
