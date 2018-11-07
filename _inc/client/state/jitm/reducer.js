/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import get from 'lodash/get';
import assign from 'lodash/assign';

/**
 * Internal dependencies
 */
import {
	JITM_FETCH,
	JITM_FETCH_RECEIVE,
	JITM_FETCH_FAIL,
} from 'state/action-types';

export const data = ( state = {}, action ) => {
	switch ( action.type ) {
		case JITM_FETCH_RECEIVE:
			return assign( {}, state, { message: action.message } );
		default:
			return state;
	}
};

export const initialRequestsState = {
	isFetchingJitm: false
};

export const requests = ( state = initialRequestsState, action ) => {
	switch ( action.type ) {
		case JITM_FETCH:
			return assign( {}, state, {
				isFetchingJitm: true
			} );
		case JITM_FETCH_RECEIVE:
		case JITM_FETCH_FAIL:
			return assign( {}, state, {
				isFetchingJitm: false
			} );
		default:
			return state;
	}
};

export const reducer = combineReducers( {
	data,
	requests
} );

/**
 * Returns true if currently requesting a JITM message. Otherwise false.
 * otherwise.
 *
 * @param  {Object}  state Global state tree
 * @return {Boolean}       Whether a JITM is being requested
 */
export function isFetchingJitm( state ) {
	return !! (
		state.jetpack.jitm.requests.isFetchingJitm
	);
}

/**
 * Returns the current JITM message
 * @param  {Object}  state Global state tree
 * @return {Object}  Features
 */
export function getJitm( state ) {
	return get( state.jetpack.jitm, [ 'data', 'message' ], {} );
}
