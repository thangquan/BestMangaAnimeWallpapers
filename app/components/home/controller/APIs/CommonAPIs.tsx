import axios from 'axios'
import Constant from '../Constant'

import BaseAPIs from './BaseAPIs'

export default class CommonAPIs extends BaseAPIs {
    static baseURL = Constant.baseURL

    static endpoints = {
        getAllPopular: Constant.baseURL
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
}
