import Constant from '../Constant'

export default class BaseAPIs {
    static baseURL = Constant.baseURL

    static rapidapiURL = 'https://best-manga-anime-wallpapers.p.rapidapi.com/'
    static waifuURL = 'https://api.waifu.pics'

    static getHeadersRapidapi() {
        return {
            'X-RapidAPI-Key': '705e77c12bmsh40fb806cf9aa882p151a96jsnf4fed1616dc6',
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
