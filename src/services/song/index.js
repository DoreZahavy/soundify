const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { songService as local } from './song.service.local'
import { songService as remote } from './song.service.remote'

// function getEmptyCar() {
// 	return {
// 		vendor: makeId(),
// 		speed: getRandomIntInclusive(80, 240),
// 		msgs: [],
// 	}
// }

function getDefaultFilter() {
    return {
        txt: ''
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const songService = { getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.songService = songService
