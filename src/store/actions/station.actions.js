import { stationService } from '../../services/station'
import { store } from '../store'
import { SET_STATIONS, ADD_STATION, REMOVE_STATION, SET_STATION, UPDATE_STATION, SET_FILTER_BY,  SET_IS_LOADING} from '../reducers/station.reducer'

export async function loadStations(filterBy) {
    try {
        const stations = await stationService.query(filterBy)
        store.dispatch(getCmdSetStations(stations))
    } catch (err) {
        console.log('Cannot load stations', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        store.dispatch(getCmdSetStation(station))
    } catch (err) {
        console.log('Cannot load station', err)
        throw err
    }
}


export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch(getCmdRemoveStation(stationId))
    } catch (err) {
        console.log('Cannot remove station', err)
        throw err
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdAddStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch(getCmdUpdateStation(savedStation))
        return savedStation
    } catch (err) {
        console.log('Cannot save station', err)
        throw err
    }
}

export async function addStationMsg(stationId, txt) {
    try {
        const msg = await stationService.addStationMsg(stationId, txt)
        store.dispatch(getCmdAddStationMsg(msg))
        return msg
    } catch (err) {
        console.log('Cannot add station msg', err)
        throw err
    }
}

// Command Creators:
function getCmdSetStations(stations) {
    return {
        type: SET_STATIONS,
        stations
    }
}
function getCmdSetStation(station) {
    return {
        type: SET_STATION,
        station
    }
}
function getCmdRemoveStation(stationId) {
    return {
        type: REMOVE_STATION,
        stationId
    }
}
function getCmdAddStation(station) {
    return {
        type: ADD_STATION,
        station
    }
}
function getCmdUpdateStation(station) {
    return {
        type: UPDATE_STATION,
        station
    }
}

/*
// unitTestActions()
async function unitTestActions() {
    await loadStations()
    await addStation(stationService.getEmptyStation())
    await updateStation({
    })
    await removeStation()
    // TODO unit test addCarMsg
}
*/