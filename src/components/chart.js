import React, { useEffect } from "react"
import * as d3 from 'd3'

const Chart = ({ data, id, draw }) => {
	useEffect(() => {
		draw(data)
	})
	return <svg id={id} />
}

export default Chart