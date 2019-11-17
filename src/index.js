import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import raw from "./data.csv";
import { csv } from "d3-fetch";

const fixData = (arr) => arr.map(o => {
	const keys = ['average_transactions', 'day_num', 'hour']
	keys.forEach(key => {
		o[key] = +o[key]
	})
	return o
})

const render = async () => {
	const init = await csv(raw);
	const data = fixData(init);
	ReactDOM.render(<App data={data} />, document.getElementById("root"));
};

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
