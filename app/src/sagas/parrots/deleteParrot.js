import { push } from 'connected-react-router';
import { takeEvery, put } from 'redux-saga/effects';

import api from 'services/api';

const DELETE_PARROT = 'DELETE_PARROT';

export const deleteParrot = (id) => ({ type: DELETE_PARROT, id });

function* deleteParrotSaga(action) {
    try {
        yield api.parrots.detail.del({ pk: action.id });

        yield put(push('/parrots/'));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* deleteParrotWatcher() {
    yield takeEvery(DELETE_PARROT, deleteParrotSaga);
}
