import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DailyEventsChart from './DailyEventsChart';
import DailyStatsChart from './DailyStats';
import DataTable from './DataTable';
import { getHourlyEvents, getHourlyStats } from '../actions/';
import GeoStats from './GeoStats';
import SimpleMap from './SimpleMap';
import HourlyStats from './HourlyStats';
import { connect } from 'react-redux';
import { getPoi } from '../actions';
import dotenv from 'dotenv';
dotenv.config();
console.log('LOOK HERE', process.env);
function App(props) {
	useEffect(() => {
		props.getPoi();
	}, []);

	return (
		<div>
			<DailyEventsChart />
			<br></br>
			<br></br>
			<DailyStatsChart />
			<br></br>
			<br></br>
			<HourlyStats />
			<br></br>
			<br></br>
			<DataTable />
			<br></br>
			<br></br>
			<GeoStats />
			<br></br>
			<br></br>
			<SimpleMap />
		</div>
	);
}

export default connect(null, { getPoi, getHourlyEvents, getHourlyStats })(App);
