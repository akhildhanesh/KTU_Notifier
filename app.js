const axios = require('axios')
const https = require('https')
const { getDate } = require('./helpers/date')
const { getTime } = require('./helpers/time')
// const { getShortLink } = require('./helpers/cuttly')
const sendMsg = require('./helpers/sendMsg')
const { writeFile } = require('node:fs/promises')

const instance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
})

let getId = require('./db/getId.json')

const url = `https://api.ktu.edu.in/ktu-web-portal-api/anon/announcemnts`

const getNotification = () => {
    instance.post(url, { "number": 0, "searchText": "", "size": 3 })
        .then(data => data.data)
        .then(data => {
            for (let e of data.content.reverse()) {
                if (e.id <= getId.id) continue
                e.date = getDate()
                e.time = getTime()
                e.shortLink = `https://cutt.ly/bwR5funn`
                getId.id = e.id
                sendMsg.send(e)
            }
            let jsonData = {
                id: getId.id
            }
            writeFile('./db/getId.json', JSON.stringify(jsonData))
        })
        .catch(e => {
            console.error(e)
        })
}

setInterval(() => {
    getNotification()
}, 180000) // 3 min

// getNotification()