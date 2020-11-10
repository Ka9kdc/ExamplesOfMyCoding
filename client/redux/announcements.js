import axios from 'axios'

const initialAnnouncement = {
    message: '',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
}
const initialAnnouncementHistory = []

const SET_ANNOUNCEMENT_HISTORY = "SET_ANNOUNCEMENT_HISTORY"
const SET_LAST_ANNOUNCEMENT = "SET_LAST_ANNOUNCEMENT"
const UPDATE_ANNOUNCEMENT = 'UPDATE_ANNOUNCEMENT'

const setAnnounmentHistory = announcements => {
    return {
        type: SET_ANNOUNCEMENT_HISTORY,
         announcements
    }
}

const setLastAnnouncment = announcement => {
    return {
        type: SET_LAST_ANNOUNCEMENT,
        announcement
    }
}

export const updateAnnouncement = newPost => {
    return {
        type: UPDATE_ANNOUNCEMENT,
        newPost
    }
}

export const fetchLastAnnouncement = () => {
    return async dispatch => {
        try{
            console.log('fetch')
            const res = await axios.get('/api/announcement/last')
            const announcement = res.data
            dispatch(setLastAnnouncment(announcement))
        } catch (err){
            console.error(err)
        }
    }
}

export const fetchAllAnnouncement = () => {
    return async dispatch => {
        try {
            const res = await axios.get('/api/announcement/all')
            const announcements = res.data
            dispatch(setAnnounmentHistory(announcements))
        } catch (err){
            console.error(err);
        }
    }
}

export const postNewAnnouncement = (newAnnouncement, history) => {
    return async dispatch => {
        try {
            const res = await axios.post('/api/announcement/', newAnnouncement)
            const announcement = res.data
            dispatch(setLastAnnouncment(announcement))
            history.push('/News')
        } catch (err) {
            console.error(err)
        }
    }
}

export const singleAnnouncementReducer = (state = initialAnnouncement, action) => {
    switch (action.type) {
        case SET_LAST_ANNOUNCEMENT:
            return action.announcement
        case UPDATE_ANNOUNCEMENT:
            return {...state, [action.newPost.name]: action.newPost.value}
        default:
            return state
    }
}

export const allAnnouncementReducer = (state = initialAnnouncementHistory, action) => {
    switch (action.type) {
        case SET_ANNOUNCEMENT_HISTORY:
            return action.announcements
        default:
            return state
    }
}