import React, { useState, useEffect } from 'react';
import { getAvgHourlyStats, getSumHourlyStats, getPoi } from '../actions';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';
import colorArray from './colorArray';
import _ from 'lodash';
import './HourlyStats.css';

function HourlyStats(props) {
	const [minDate, setMinDate] = useState('2012-12-12');
	const [maxDate, setMaxDate] = useState('2020-12-12');
	const [datasets, setDataSets] = useState([]);
	const [query, setQuery] = useState('average');

	let data = { labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], datasets };

	const retrieveData = (minDate, maxDate, query) => {
		for (let key in props.poi) {
			props.getAvgHourlyStats(props.poi[key].poi_id, minDate, maxDate);
			props.getSumHourlyStats(props.poi[key].poi_id, minDate, maxDate);
		}
	};

	const datasetSetup = (companyId, yAxis) => {
		let rev = [];
		let clicks = [];
		let imps = [];
		let label = '';
		let id;

		for (let index in companyId) {
			let stats = companyId[index];
			rev.push(stats.revenue);
			clicks.push(stats.clicks);
			imps.push(stats.impressions);
			label = stats.name;
			id = stats.id;
		}

		return {
			data: yAxis == 'clicks' ? clicks : yAxis == 'rev' ? rev : yAxis == 'imps' ? imps : imps,
			clicks,
			rev,
			imps,
			label,
			key: id,
			fill: false,
			borderColor: colorArray[Math.floor(Math.random() * 50)],
			id
		};
	};

	const createDataset = (category, query) => {
		let newDataset = [];
		if (query == 'average') {
			for (let key in props.avgHourlyStats) {
				newDataset.push(datasetSetup(props.avgHourlyStats[key], category));
			}
		}

		if (query == 'sum') {
			for (let key in props.avgHourlyStats) {
				newDataset.push(datasetSetup(props.sumHourlyStats[key], category));
			}
		}

		return newDataset;
	};

	return (
		<div>
			<h3>Hourly Stats Line Chart</h3>
			<h5>Collection of averaged stats labeled by hour and custom dates</h5>

			<div>
				<Line data={data}></Line>
				<div className='input-layout'>
					<Input
						value={minDate}
						onChange={e => {
							setMinDate(e.target.value);
						}}></Input>
					<Input
						value={maxDate}
						onChange={e => {
							setMaxDate(e.target.value);
						}}></Input>
				</div>
				<div className='button-layout'>
					<Button
						type='primary'
						onClick={() => {
							retrieveData(minDate, maxDate);
							setQuery('average');
						}}>
						Get Average Stats For Specified Date
					</Button>
					<Button
						type='primary'
						onClick={() => {
							retrieveData(minDate, maxDate);
							setQuery('sum');
						}}>
						Get Sum of Stats For Specified Date
					</Button>
				</div>
				<br />
				<div className='button-layout'>
					<Button
						type='primary'
						onClick={() => {
							let newDataset = createDataset('clicks', query);

							setDataSets(newDataset);
						}}>
						Order Dataset by Clicks
					</Button>
					<Button
						type='primary'
						onClick={() => {
							let newDataset = createDataset('rev', query);

							setDataSets(newDataset);
						}}>
						Order Dataset by Revenue
					</Button>
					<Button
						type='primary'
						onClick={() => {
							let newDataset = createDataset('imps', query);

							setDataSets(newDataset);
						}}>
						Order Dataset by Impressions
					</Button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		avgHourlyStats: state.avgHourlyStats,
		sumHourlyStats: state.sumHourlyStats,
		poi: state.poi
	};
};

export default connect(mapStateToProps, {
	getAvgHourlyStats,
	getSumHourlyStats,
	getPoi
})(HourlyStats);
