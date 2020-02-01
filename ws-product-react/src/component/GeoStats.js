import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { getEventsSumGeo, getStatsSumGeo } from '../actions';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Chart } from 'react-google-charts';
const dataRemap = (data, name, category) => {
	let remapped = [['Lat', 'Long', 'events']];
	for (let item in data) {
		let innerArr = [];

		innerArr.push(data[item].lat);
		innerArr.push(data[item].lon);

		innerArr.push(data[item][category]);

		remapped.push(innerArr);
	}

	return remapped;
};

function GeoStats(props) {
	// Note: you will need to get a mapsApiKey for your project.
	// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
	useEffect(() => {
		props.getEventsSumGeo();
		props.getStatsSumGeo();
	}, []);

	console.log(dataRemap(props.eventsSumGeo, 'company name', 'events'));

	return (
		<div>
			<Chart
				width={'500px'}
				height={'500px'}
				chartType='GeoChart'
				data={dataRemap(props.eventsSumGeo, 'Company Name', 'events')}
				options={{
					region: 'CA',
					displayMode: 'markers',
					colorAxis: { colors: ['green', 'blue', 'yellow', 'purple'] }
				}}
				// Note: you will need to get a mapsApiKey for your project.
				// See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
				mapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}
				rootProps={{ 'data-testid': '2' }}
			/>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		eventsSumGeo: state.eventsSumGeo,
		eventsStatGeo: state.eventsStatGeo
	};
};

export default connect(mapStateToProps, { getEventsSumGeo, getStatsSumGeo })(GeoStats);
