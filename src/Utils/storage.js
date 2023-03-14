export default class Storage{
    static storeJWT(token){
        window.localStorage.setItem("token", token)
    }

    static getToken(){
        return window.localStorage.getItem("token")
    }

    static removeToken(){
        window.localStorage.removeItem("token")
    }
}