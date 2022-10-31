import Constant from '../Constant'
import Config from 'react-native-config'

export default class BaseAPIs {
    static baseURL = Constant.baseURL

    static rapidapiURL = 'https://best-manga-anime-wallpapers.p.rapidapi.com/'
    static waifuURL = 'https://api.waifu.pics'

    static getHeadersRapidapi() {
        return {
            'X-RapidAPI-Key': Config.RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'best-manga-anime-wallpapers.p.rapidapi.com'
        }
    }

    static handleSuccess(data: any) {
        return Promise.resolve(data?.data)
    }

    static handleFail(data: any) {
        return Promise.reject(data)
    }
}
