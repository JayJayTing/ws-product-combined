import { GET_EVENTS_SUM_GEO, GET_STATS_SUM_GEO, GET_HOURLY_EVENTS, GET_HOURLY_STATS, GET_DAILY_EVENTS, GET_AVG_HOURLY_STATS, GET_SUM_HOURLY_STATS, GET_DAILY_STATS, GET_POI } from '../actions/types';

export const getHourlyEventsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_HOURLY_EVENTS:
			return Object.assign({}, action.payload);
		default:
			return state;
	}
};

export const getDailyEventsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_DAILY_EVENTS:
			return Object.assign({}, action.payload);
		default:
			return state;
	}
};
export const getAvgHourlyStatsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_AVG_HOURLY_STATS:
			if (!state[action.id]) {
				state[action.id] = action.payload;
			} else {
				state[action.id] = action.payload;
			}
			return Object.assign({}, state);
		default:
			return state;
	}
};

export const getSumHourlyStatsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_SUM_HOURLY_STATS:
			let obj = state;
			if (!obj[action.id]) {
				obj[action.id] = action.payload;
			} else {
				obj[action.id] = action.payload;
			}
			return Object.assign({}, obj);
		default:
			return Object.assign({}, state);
	}
};

export const getDailyStatsReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_DAILY_STATS:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};

export const getPoiReducer = (state = {}, action) => {
	switch (action.type) {
		case GET_POI:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};

export const getHourlyStats = (state = {}, action) => {
	switch (action.type) {
		case GET_HOURLY_STATS:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};

export const getHourlyEvents = (state = {}, action) => {
	switch (action.type) {
		case GET_HOURLY_EVENTS:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};

export const getEventsSumGeo = (state = {}, action) => {
	switch (action.type) {
		case GET_EVENTS_SUM_GEO:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};

export const getStatsSumGeo = (state = {}, action) => {
	switch (action.type) {
		case GET_STATS_SUM_GEO:
			return Object.assign({}, action.payload);
		default:
			return Object.assign({}, state);
	}
};
