import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

function SimpleMap() {
	let defaultSettings = {
		center: {
			lat: 43.6426,
			lng: -79.3871
		},
		zoom: 11
	};

	return (
		// Important! Always set the container height explicitly
		<div style={{ height: '100vh', width: '100%' }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API }}
				defaultCenter={defaultSettings.center}
				defaultZoom={defaultSettings.zoom}
				heatmapLibrary={true}
				heatmap={{
					positions: [
						{ lat: 43.0896, lng: -79.0849 },
						{ lat: 49.2965, lng: -123.0884 },
						{
							lat: 43.6426,
							lng: -79.3871
						},
						{
							lat: 43.6708,
							lng: -79.3899
						}
					],
					options: {
						radius: 30,
						opacity: 0.6
					}
				}}
				markerLibrary={true}
				marker={{ positions: [{ lat: 55.5, lng: 34.56 }] }}
			/>
		</div>
	);
}

export default SimpleMap;
