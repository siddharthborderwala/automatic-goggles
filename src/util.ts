export const randomString = (length: number = 5) => Math.random().toString(36).substr(2, length);

export const log = (value: any) => console.log(JSON.stringify(value, null, 2));
