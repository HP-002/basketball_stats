export type Player = {
    key: number | string,
    image: string | number,
    name: string,
    location: string,
    age: number,
    height: string,
    points: number,
    rebounds: number,
    assists: number,
    ratings: number,
}

export const defaultProfile = require('@/assets/images/defaultPicture.png')