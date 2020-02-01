import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { getDailyEvents } from '../actions';
import { Button } from 'antd';
import { connect } from 'react-redux';

function Charts(props) {
	const [poi_id, set_poi_id] = useState(1);
	const [cycle, setCycle] = useState(1);

	useEffect(() => {
		props.getDailyEvents(poi_id, cycle);
		buttons = [];
	}, [poi_id]);
	let x = [];
	let y = [];
	let name = '';
	let buttons = [];

	for (let item in props.dailyEvents) {
		let event = props.dailyEvents[item];
		x.push(event.date.substring(0, event.date.indexOf('T')));
		y.push(parseInt(event.events));
		name = event.name;
		buttons.push(
			<Button
				onClick={() => {
					name = event.name;
				}}>
				sort by {event.name}
			</Button>
		);
	}

	let data = {
		labels: x,
		datasets: [
			{
				label: `${name} Events`,
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
		<div>
			<h3>Daily Events Bar Chart Sorted by Custom Dates</h3>
			<div>
				<Bar data={data} width={100} height={200} options={{ maintainAspectRatio: false }} />
			</div>
			<div>
				<Button
					onClick={() => {
						props.getDailyEvents(poi_id, cycle);
						setCycle(cycle - 1);
					}}>
					Prev Week
				</Button>
				<Button
					onClick={() => {
						props.getDailyEvents(poi_id, cycle);
						setCycle(cycle + 1);
					}}>
					Next Week
				</Button>

				<Button
					onClick={() => {
						if (poi_id === 4) {
							set_poi_id(1);
						} else {
							set_poi_id(poi_id + 1);
						}
					}}>
					Switch Company
				</Button>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return { dailyEvents: state.dailyEvents };
};

export default connect(mapStateToProps, { getDailyEvents })(Charts);
