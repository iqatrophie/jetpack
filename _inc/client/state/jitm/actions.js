/**
 * Internal dependencies
 */
import {
	JITM_FETCH,
	JITM_FETCH_RECEIVE,
	JITM_FETCH_FAIL,
} from 'state/action-types';
import restApi from 'rest-api';

export const fetchJitm = ( message_path = '', query_url = 'page=jetpack' ) => {
	return ( dispatch ) => {
		dispatch( {
			type: JITM_FETCH
		} );
		return restApi.fetchJitm( message_path, query_url )
			.then( message => {
				dispatch( {
					type: JITM_FETCH_RECEIVE,
					message: message
				} );
			} )
			.catch( error => {
				dispatch( {
					type: JITM_FETCH_FAIL,
					error: error
				} );
			} );
	};
};
