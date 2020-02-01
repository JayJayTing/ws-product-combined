import React, { useEffect, useState } from 'react';
import { getHourlyEvents, getHourlyStats } from '../actions';
import { connect } from 'react-redux';
import { Table, Button, Input, Switch } from 'antd';
import Fuse from 'fuse.js';
import './DataTable.css';

const fuzzySearch = (object, rules, fuzzySeqence) => {
	let fuse = new Fuse(object, rules);
	let analyzed = fuse.search(fuzzySeqence);

	return analyzed;
};

function DataTable(props) {
	useEffect(() => {
		props.getHourlyEvents(0);
		props.getHourlyStats(0);
	}, []);
	const [arrangement, setArrangement] = useState(true);

	const [query, setQuery] = useState('');

	const statsColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			width: 150,
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Date',
			dataIndex: 'date',
			width: 150,
			sorter: (a, b) => a.date - b.date,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Hour',
			dataIndex: 'hour',
			sorter: (a, b) => a.hour - b.hour,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Impressions',
			dataIndex: 'impressions',
			width: 150,
			sorter: (a, b) => a.impressions - b.impressions,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Clicks',
			dataIndex: 'clicks',
			sorter: (a, b) => a.clicks - b.clicks,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Revenue',
			dataIndex: 'revenue',
			sorter: (a, b) => a.revenue - b.revenue,
			sortDirections: ['ascend', 'descend']
		}
	];

	const eventColumns = [
		{
			title: 'Name',
			dataIndex: 'name',
			width: 150,
			sorter: (a, b) => a.name.length - b.name.length,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Date',
			dataIndex: 'date',
			width: 150,
			sorter: (a, b) => a.date - b.date,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Hour',
			dataIndex: 'hour',
			sorter: (a, b) => a.hour - b.hour,
			sortDirections: ['ascend', 'descend']
		},
		{
			title: 'Events',
			dataIndex: 'events',
			width: 150,
			sorter: (a, b) => a.events - b.events,
			sortDirections: ['ascend', 'descend']
		}
	];

	var options = {
		keys: ['name']
	};

	return (
		<div>
			<div>{arrangement ? <h2>Events Table</h2> : <h2>Stats Table</h2>}</div>
			<div className='switch'>
				{arrangement ? <h4>Toggle Stats Table </h4> : <h4> Toggle Events Table</h4>}-
				<Switch
					type='primary'
					onChange={() => {
						setArrangement(!arrangement);
					}}></Switch>
			</div>
			<div className='table-query-settings'>
				Search by Location
				<Input
					value={query}
					onChange={e => {
						setQuery(e.target.value);
					}}
				/>
			</div>
			<br></br>
			<div>
				<Table
					columns={arrangement ? eventColumns : statsColumns}
					dataSource={
						arrangement
							? query == ''
								? Object.values(props.hourlyEvents)
								: fuzzySearch(Object.values(props.hourlyEvents), options, query)
							: query == ''
							? Object.values(props.hourlyStats)
							: fuzzySearch(Object.values(props.hourlyStats), options, query)
					}
					pagination={{ pageSize: 50 }}
					scroll={{ y: 500 }}
				/>
			</div>
			>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		hourlyStats: state.hourlyStats,
		hourlyEvents: state.hourlyEvents
	};
};

export default connect(mapStateToProps, { getHourlyEvents, getHourlyStats })(DataTable);
