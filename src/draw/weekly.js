import * as d3 from "d3";
import moment from "moment";

function getDateTime(dayNum, hour = 0) {
  const monday = d3.timeMonday(new Date(Date.now()));
  return moment(monday)
    .add(dayNum, "d")
    .add(hour, "h")
    .add(0, "m")
    .toDate();
}

const scheme = d3.schemeCategory10.slice(0, 3);

function splitter(d) {
  let arr = [d[0]];
  let res = [];
  for (let i = 1; i < d.length; i++) {
    const arrType = arr[arr.length - 1].opening_type;
    const thisType = d[i].opening_type;
    if (thisType === arrType) {
      arr.push(d[i]);
    } else {
      arr.push(d[i]);
      res.push(arr);
      arr = [d[i]];
    }
  }
  res.push(arr);
  return res; //array of arrays
}

function weekly(data) {
  if (data.length > 0) {
    d3.select("#weekly")
      .selectAll("*")
      .remove();
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 950 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const d = data;
    const chart = d3
      .select("#weekly")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const timeArr = d3.timeHours(getDateTime(0), getDateTime(7), 1);

    const x = d3
      .scaleTime()
      .domain([timeArr[0], timeArr[timeArr.length - 1]])
      .range([0, width]);

    const yMax = d3.max(d.map(d => d.average_transactions));

    const y = d3
      .scaleLinear()
      .domain([0, yMax + 10])
      .range([height, 0]);

    const line = d3
      .line()
      .x(d => {
        const res = getDateTime(d.day_num, d.hour);
        return x(res);
      })
      .y(d => y(d.average_transactions));

    line(d);

    const area = d3
      .area()
      .x(d => x(getDateTime(d.day_num, d.hour)))
      .y1(d => y(d.average_transactions))
      .y0(height);

    const openingTypeFill = ot => {
      if (ot === "closed") return scheme[0];
      else if (ot === "staffed") return scheme[1];
      else if (ot === "SSO") return scheme[2];
    };

    const split = splitter(d);

    const drawPath = arr => {
      chart
        .append("path")
        .datum(arr)
        .attr("d", area)
        .attr("fill", openingTypeFill(arr[0].opening_type))
        .on("mouseenter", d => console.log(d));
    };

    split.forEach(arr => {
      drawPath(arr);
    });

    chart
      .append("path")
      .datum(d)
      .attr("class", "line")
      .attr("d", line);

    const xAxis = d3
      .axisBottom(x)
      .tickArguments([d3.timeHour.every(12)])
      .tickFormat(time => {
        const h = moment(time).hour();
        const format =
          h === 0 ? d3.timeFormat("") : d3.timeFormat("%H:%M %p \n %A");
        return format(time);
      });
    const yAxis = d3.axisLeft(y);

    chart
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis)
      .selectAll(".tick text")
      .each(function(d) {
        const el = d3.select(this);
        const txt = el.text();
        if (txt.length > 0) {
          const y = +el.attr("y");
          const x = +el.attr("x");
          const arr = txt.split("\n");
          el.text(null)
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .text(arr[0]);
          el.append("tspan")
            .attr("x", x)
            .attr("y", +y + 20)
            .text(arr[1]);
        }
      });

    chart
      .append("g")
      .attr("class", "y axis")
      .call(yAxis);

    // legend
    const openingTypes = ["closed", "staffed", "SSO"];

    const drawLeg = (openingType, idx) => {
      const sqSize = 20;
      const gap = 5;
      const top = 20;
      const y = idx * (sqSize + gap) + top;
      chart
        .append("rect")
        .attr("x", gap)
        .attr("y", y)
        .attr("height", sqSize)
        .attr("width", sqSize)
        .attr("fill", openingTypeFill(openingType));

      chart
        .append("text")
        .attr("x", sqSize + 2 * gap)
        .attr("y", y + sqSize / 2)
        .attr("alignment-baseline", "middle")
        .attr("font-size", "small")
        .text(openingType);
    };

    chart
      .append("text")
      .attr("x", 5)
      .attr("y", 0)
      .attr("alignment-baseline", "hanging")
      .attr("font-size", "small")
      .text("Opening Types");

    openingTypes.forEach((ot, i) => drawLeg(ot, i));

    //axes labels
    const text = chart.append("text").style("text-anchor", "middle");

    text
      .append("tspan")
      .attr("x", width / 2)
      .attr("y", 0 + margin.top / 2)
      .text(`Average Weekly Loan Transactions at ${d[0].library}`);

    text
      .append("tspan")
      .text(`Between March-November 2019`)
      .attr("x", width / 2)
      .attr("y", 0 + margin.top / 2)
      .attr("dy", "1.6em");

    chart
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 5)
      .attr("x", 0 - height / 2)
      .attr("dy", "1em")
      .attr("font-size", "small")
      .style("text-anchor", "middle")
      .text("Average loan transactions");
  }
}

export default weekly;
