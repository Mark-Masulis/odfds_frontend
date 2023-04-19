export default class Storage{
    static storeJWT(token, userType){
        window.localStorage.setItem(userType + "Token", token)
    }

    static getToken(){
        return window.localStorage.getItem(userType + "Token")
    }

    static removeToken(){
        window.localStorage.removeItem(userType + "Token")
    }
}