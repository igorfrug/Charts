import React from 'react';
import {render} from 'react-dom';
import Chart from './Chart';
import { getData } from "./utils"
import { TypeChooser } from "react-stockcharts/lib/helper";


class ChartComponent extends React.Component {
	componentDidMount() {
		console.log("hey 3")
		getData().then(data => {
			this.setState({ data })
			console.log(this.state.data)
		})
	}

	componentDidUpdate() {
		setInterval(async () => {
			try {
				const data = await getData();		
			let dataArr = []
			for (let d of data) {
				for (let sd of this.state.data) {
					if ( d.low === sd.low && d.high === sd.high && d.open === sd.open
						&& d.close === sd.close  ) { dataArr.push(d) }	
				}
				
			}
			console.log(dataArr.length)
			console.log(this.state.data.length)
			
			
			if (dataArr.length < this.state.data.length) {
				this.setState({ data })
				dataArr=null
				console.log("new state", this.state.data)
			} else {
				console.log("again")	
			}
		}catch(err){
			console.log(err)
		}
		}, 5000);
	};



	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<TypeChooser>
				{type => <Chart type={type} data={this.state.data} />}
			</TypeChooser>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
