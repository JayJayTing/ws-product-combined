import { combineReducers } from 'redux';

import {
	getHourlyEventsReducer,
	getDailyEventsReducer,
	getAvgHourlyStatsReducer,
	getSumHourlyStatsReducer,
	getDailyStatsReducer,
	getPoiReducer,
	getHourlyStats,
	getHourlyEvents,
	getEventsSumGeo,
	getStatsSumGeo
} from './marketingDataReducer';

export default combineReducers({
	avgHourlyStats: getAvgHourlyStatsReducer,
	sumHourlyStats: getSumHourlyStatsReducer,
	hourlyEvents: getHourlyEventsReducer,
	dailyEvents: getDailyEventsReducer,
	dailyStats: getDailyStatsReducer,
	hourlyStats: getHourlyStats,
	hourlyEvents: getHourlyEvents,
	eventsSumGeo: getEventsSumGeo,
	statsSumGeo: getStatsSumGeo,

	poi: getPoiReducer
});
