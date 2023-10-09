import { createPlace, deletePlace, getAllPlaces, getPlace, updatePlace } from "../dao/PlaceDAO.js";

async function getAllPlacesService(call, callback) {
    const places = await getAllPlaces()
    callback(null, { places: places })
}

async function getPlaceService(call, callback) {
    const place = await getPlace(call.request.id)
    callback(null, { place: place })
}

async function createPlaceService(call, callback) {
    const result = await createPlace(call.request.place)
    callback(null, { success: result })
}

async function updatePlaceService(call, callback) {
    const result = await updatePlace(call.request.id, call.request.place)
    callback(null, { success: result })
}

async function deletePlaceService(call, callback) {
    const result = await deletePlace(call.request.id)
    callback(null, { success: result })
}

export {
    getAllPlacesService,
    getPlaceService,
    createPlaceService,
    updatePlaceService,
    deletePlaceService,
}
