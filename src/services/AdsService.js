import { AppState } from "../AppState.js"
import { Ad } from "../models/Ad.js"
import { sandboxApi } from "./AxiosService.js"

class AdsService {
  async getAds() {
    AppState.ads = []
    const res = await sandboxApi.get("api/ads")
    AppState.ads = res.data.map(data => new Ad(data))
  }

}

export const adsService = new AdsService()