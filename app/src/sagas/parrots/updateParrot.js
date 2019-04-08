import { push } from 'connected-react-router';
import { takeEvery, put } from 'redux-saga/effects';

import api from 'services/api';

const UPDATE_PARROT = 'UPDATE_PARROT';

export const updateParrot = (id) => ({ type: UPDATE_PARROT, id });

function* updateParrotSaga(action) {
    try {
        yield api.parrots.detail.put({ pk: action.id });

        yield put(push('/parrots/'));
    } catch (e) {
        console.log('Something went wrong!');
    }
}

export default function* updateParrotWatcher() {
    yield takeEvery(UPDATE_PARROT, updateParrotSaga);
}
