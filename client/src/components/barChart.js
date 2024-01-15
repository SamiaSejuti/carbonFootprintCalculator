import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './barChart.css';

function BarChart({ data }) {
    const svgRef = useRef();

    const translateX = ((900 - 500) / 2) - 30;
    const translateY = ((900 - 350) / 2) - 30 - 50;


    useEffect(() => {

        const svg = d3.select(svgRef.current);

        svg.append("text")
        .attr("x", 450)  
        .attr("y", 50)   
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")
        //.style("font-weight", "bold")
        .style("font-family", '"Helvetica Neue", Helvetica, Arial, sans-serif')
        .text("Comparison with suburb's monthly consumption");

        const centeredGroup = svg.select("g");

        const legends = [
            { label: 'Your consumption', color: '#e41a1c' },
            { label: "Average tenant's monthly consumption", color: 'lightgray' }
        ];

        centeredGroup.selectAll(".extendedData").remove();
        centeredGroup.selectAll(".bar-compare").remove();


        const extendedData = data;


        const xScale = d3.scaleBand()
            .domain(extendedData.map(d => d.label))

            .range([0, 600])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(extendedData, d => Math.max(d.radius, d.compare))])
            .range([300, 0]);

        const colorScale = d3.scaleOrdinal()
            .domain(["radius", "compare"])
            .range(['#e41a1c', 'lightgray']);



        centeredGroup.select(".x-axis")
            .style("transform", "translateY(300px)")
            .style("font-size", "18px")
            .style("font-family", '"Helvetica Neue", Helvetica, Arial, sans-serif')
            .call(d3.axisBottom(xScale).ticks(data.length))
            .selectAll("text")
            .attr("transform", "rotate(-35)")
            .attr("text-anchor", "end")
            .attr("dy", "1em")
            .attr("dx", "0.5em");




        centeredGroup.select(".y-axis")
            .style("font-size", "15px")
            .style("font-family", '"Helvetica Neue", Helvetica, Arial, sans-serif')
            .call(d3.axisLeft(yScale).ticks(5))


        //bar
        centeredGroup.selectAll(".extendedData")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "extendedData")
            .attr("x", d => xScale(d.label))
            .attr("y", d => yScale(d.radius))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => 300 - yScale(d.radius))
            .attr("fill", colorScale("radius"));

        //2nd bar
        centeredGroup.selectAll(".bar-compare")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar-compare")
            .attr("x", d => xScale(d.label) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.compare))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => 300 - yScale(d.compare))
            .attr("fill", colorScale("compare"));

        svg.append("text")
            .attr("class", "y-axis-label")
            .attr("x", -400)
            .attr("y", 110)
            .style("font-size", "18px")
            .style("font-family", '"Helvetica Neue", Helvetica, Arial, sans-serif')
            .attr("transform", "rotate(-90)")
            .text("Kg's of CO2e ");

            centeredGroup.selectAll(".extendedData, .bar-compare")
            .on("mouseover", function(event, d) {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity', '.85');
                
                d3.select("#bar-tooltip")
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 15) + "px")
                    .style("opacity", 1)
                    .html("CO2e: " + (this.classList.contains('extendedData') ? d.radius : d.compare) + " Kg");
            })
            .on("mouseout", function() {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity', '1');
                
                d3.select("#bar-tooltip").style("opacity", 0);
            });
          


        // Legends
        const legendGroup = centeredGroup.append("g")
            .attr("transform", "translate(0,400)");

        legends.forEach((legend, index) => {
            const legendContainer = legendGroup.append("g")
                .attr("transform", `translate(${index * 200}, 0)`);

            legendContainer.append("rect")
                .attr("width", 20)
                .attr("height", 20)
                .style("fill", legend.color);

            legendContainer.append("text")
                .attr("x", 25)
                .attr("y", 15)
                .text(legend.label)
                .attr("fill", "black")
                .style("font-size", "20px");
        });


    }, [data]);

    return (
        <div className="svg-container-bar">
    <svg ref={svgRef} width="900" height="800">
        <g transform={`translate(${translateX},${translateY})`}>
            <g className="x-axis" />
            <g className="y-axis" />
        </g>
    </svg>
    <div id="bar-tooltip" className="tooltip"></div>
</div>

    );
}

export default BarChart;
