import { usersModel } from "../models/users.js";

export default class Users {
    constructor() {
        
    }
    getAll = async () => {
        const users = await usersModel.find();
        return users.map( user => user.toObject());
    }

    saveUsers = async (user, photoRoute) => {
        try {
            user.photo = photoRoute;
            const result = await usersModel.create(user);
            return result;
        } catch (error) {
            throw error;
        }
    }

}