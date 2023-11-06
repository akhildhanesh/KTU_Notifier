const dotenv = require('dotenv')
const axios = require('axios')
dotenv.config()

const getShortLink = async url => {
    try {
        const response = await axios.get(`https://cutt.ly/api/api.php?key=${process.env.KEY}&short=${url}`)
        return response.data.url.shortLink
    } catch (err) {
        console.error(err)
    }
    
}

module.exports = {
    getShortLink
}