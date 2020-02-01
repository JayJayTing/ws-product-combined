import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getDailyStats } from '../actions';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './DailyStats.css';

function DailyStats(props) {
	const [poi_id, set_poi_id] = useState(1);
	const [x_axes, set_x_axes] = useState('revenue');
	const [y_axes, set_y_axes] = useState('date');
	const [cycle, setCycle] = useState(1);

	useEffect(() => {
		props.getDailyStats(poi_id, cycle);
	}, [poi_id, x_axes]);

	let x = [];
	let y = [];
	let name = '';

	for (let item in props.dailyStats) {
		let event = props.dailyStats[item];
		x.push(y_axes === 'date' ? event.date.substring(0, event.date.indexOf('T')) : event.hour);
		y.push(parseInt(event[x_axes]));
		name = event.name;
	}

	let data = {
		labels: x,
		datasets: [
			{
				label: `${name} ${x_axes}`,
				data: y,
				backgroundColor: [
					'rgba(255, 99, 132, 0.6)',
					'rgba(54, 162, 235, 0.6)',
					'rgba(255, 206, 86, 0.6)',
					'rgba(75, 192, 192, 0.6)',
					'rgba(153, 102, 255, 0.6)',
					'rgba(255, 159, 64, 0.6)',
					'rgba(255, 99, 132, 0.6)'
				]
			}
		]
	};

	return (
		<div className='layout'>
			<h3>Daily Stats Bar Chart Sorted by Custom Dates</h3>
			<div className='wrapper'>
				<Bar data={data} width={500} height={200} options={{ maintainAspectRatio: false }} />
			</div>

			<div className='buttonPosition'>
				<Button
					type='primary'
					onClick={() => {
						set_x_axes('revenue');
					}}>
					Graph By Revenue
				</Button>
				<Button
					type='primary'
					onClick={() => {
						set_x_axes('clicks');
					}}>
					Graph By Clicks
				</Button>
				<Button
					type='primary'
					onClick={() => {
						set_x_axes('impressions');
					}}>
					Graph By Impressions
				</Button>
			</div>

			<Button
				onClick={() => {
					props.getDailyStats(poi_id, cycle);
					setCycle(cycle - 1);
				}}>
				Go to Prev Week
			</Button>
			<Button
				onClick={() => {
					props.getDailyStats(poi_id, cycle);
					setCycle(cycle + 1);
				}}>
				Go to Next Week
			</Button>
			<Button
				onClick={() => {
					if (poi_id === 4) {
						set_poi_id(1);
					} else {
						set_poi_id(poi_id + 1);
					}
				}}>
				Switch Locations
			</Button>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		dailyStats: state.dailyStats
	};
};

export default connect(mapStateToProps, { getDailyStats })(DailyStats);
