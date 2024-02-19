import React from 'react';
import axios from 'axios';
import * as d3 from 'd3';

class D3Chart extends React.Component {
    componentDidMount() {
        this.createD3Chart();
    }

    async getBudget() {
        return axios.get('http://localhost:3000/budget')
            .then(function (res) {
                console.log(res.data);
                return res.data;
            })
            .catch((error) => {
                if (error.res) {
                    console.log('Error', error.message)
                }
            }
            )}

    async createD3Chart() {
        var data = await this.getBudget();
        var width = 400;
        var height = 400;
        var radius = Math.min(width, height) / 2;

        var color = d3.scaleOrdinal()
            .domain([0, 10])
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

        var pie = d3.pie()
            .sort(null)
            .value(function(d) {
                return d.budget;
            });

        var arc = d3.arc()
            .outerRadius(radius * 0.8)
            .innerRadius(radius * 0.4);

        var svg = d3.select("#d3chart")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var arcs = svg.selectAll("arc")
            .data(pie(data.myBudget))
            .enter()
            .append("g")
            .attr("class", "arc");

        arcs.append("path")
            .attr("d", arc)
            .attr("fill", function (d) { return color(d.data.title); });

        arcs.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .text(function (d) { return d.data.title; })
            .style("text-anchor", "middle")
            .style("font-size", "10px");
    }

    render() {
        return (
            <div id="d3chart"></div>
        );
    }
}

export default D3Chart;