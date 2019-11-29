import axios from 'axios'

/**
 * 获取当前城市
 * @returns {Promise<any>}
 */
export const getCurrentCity = () => {
	const localCity = JSON.parse(localStorage.getItem('hkzf_city'))
	if (!localCity) {
		return new Promise((resolve, reject) => {
			const curCity = new window.BMap.LocalCity()
			curCity.get(async res => {
				try {
					const result = await axios.get(`/area/info?name=${res.name}`)
					localStorage.setItem('hkzf_city', JSON.stringify(result.data.body))
					resolve(result.data.body)
				} catch (e) {
					reject(e)
				}
			})
		})
	}
	return Promise.resolve(localCity)
}
