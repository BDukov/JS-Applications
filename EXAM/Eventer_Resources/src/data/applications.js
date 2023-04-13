import { post, get } from './api.js';

const ednpoints = {
    applications: '/data/events',
    byOfferId: offerId => `/data/events?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    byOfferIdAndUserId: (offerId, userId) => `/data/events?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count` 
}
export async function apply(offerId) {
    return post(ednpoints.applications, {offerId});
}

export async function getApplications(offerId){
    return get(ednpoints.byOfferId(offerId));
}

export async function getUserApplication(offerId, userId){
    return get(ednpoints.byOfferIdAndUserId(offerId, userId));
}