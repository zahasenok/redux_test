import { createStore, applyMiddleware } from 'redux';
import PhotosReducer from './photoReducer';
import thunk from 'redux-thunk';
import axios from 'axios';
import { connect } from 'react-redux';
import { logger } from 'react-native-logs';
import Photo from '../src/Photo'

export const GET_PHOTOS_PENDING = 'GET_PHOTOS_PENDING';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_ERROR = 'GET_PHOTOS_ERROR';

const log = logger.createLogger();

const client_id = 'cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0';



export const getPhotos = () => {
    return function(dispatch) {
        dispatch(getPhotosPending());
        axios.get(`https://api.unsplash.com/photos/?client_id=${client_id}`)
            .then(response => {
                log.info("Got Data");
                dispatch(getPhotosSuccess(response));
            })
            .catch(error => {
                dispatch(getPhotosError(error));
            })
    }
}

const getPhotosPending = () => {
    return {
        type: GET_PHOTOS_PENDING
    }
}
const getPhotosSuccess = (photos) => {
    return {
        type: GET_PHOTOS_SUCCESS,
        payload: photos
    }
}
const getPhotosError = (error) => {
    return {
        type: GET_PHOTOS_ERROR,
        payload: error
    }
}
const mapStateToProps = (state) => {
    return {
        photos: state.photos
    }
}
const mapDispatchToProps = {
    getPhotos,
}

export const store = createStore(PhotosReducer, applyMiddleware(thunk));
export default connect(mapStateToProps,mapDispatchToProps)(Photo);



