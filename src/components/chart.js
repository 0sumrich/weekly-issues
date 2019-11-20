import React, { useEffect } from "react"

const Chart = ({ data, id, draw }) => {
	useEffect(() => {
		draw(data)
	})
	return <svg id={id} />
}

export default Chart