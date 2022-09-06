import axios from 'axios'
import Constant from '../Constant'

import BaseAPIs from './BaseAPIs'

export default class CommonAPIs extends BaseAPIs {
    static baseURL = Constant.baseURL

    static endpoints = {
        getAllPopular: Constant.baseURL,
        getImageByCategory: this.waifuURL + '/many/sfw'
    }

    static headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }

    static async getAllPopular() {
        try {
            let response = await axios.get(CommonAPIs.endpoints.getAllPopular, {
                headers: this.getHeadersRapidapi()
            })
            return Promise.resolve(response?.data[0] || [])
        } catch (error) {
            return this.handleFail(error)
        }
    }

    static async getImageByCategory(category: string) {
        try {
            let response = await axios.post(
                `${CommonAPIs.endpoints.getImageByCategory}/${category}`,
                {
                    headers: this.headers
                }
            )
            return Promise.resolve(response?.data?.files)
        } catch (error) {
            return this.handleFail(error)
        }
    }
}
