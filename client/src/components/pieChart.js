import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './pieChart.css';

const PieChart = ({ data }) => {
  const ref = useRef();
  const radius = Math.min(600, 600) / 2;

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();

    const color = d3.scaleOrdinal(["#cea9bc", "#FFA32F", " #F54F52", "#93F03B", "#9552EA"]);

    const arc = d3.arc().outerRadius(radius - 10).innerRadius(0);

    const pie = d3.pie().sort(null).value(d => d.radius);

    const svg = d3.select(ref.current)
      .attr("width", 900)
      .attr("height", 900)
      .append("g")
      .attr("transform", "translate(" + 900 / 2 + "," + 900 / 2 + ")");

    const outerArc = d3.arc().innerRadius(radius + 10).outerRadius(radius + 50);

    const g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    function boxesCollide(boxA, boxB) {
      return !(boxA.right < boxB.left ||
        boxA.left > boxB.right ||
        boxA.bottom < boxB.top ||
        boxA.top > boxB.bottom);
    }


    g.append("path")
    .attr("d", arc)
    .style("fill", d => color(d.data.label))
    .on("mouseover", function (event, d) {
  
      d3.select(this).transition()
        .duration('50')
        .attr('opacity', '.85');
      
  
      
      d3.select("#tooltip")
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 15) + "px")
        .style("opacity", 1)
        .html(d.data.label + "<br/>Percentage: "+ d.data.percentage+"%" +
          "<br/>Carbon footprint: " + d.data.radius + " Kg ");
    })
    .on("mouseout", function () {
  
      d3.select(this).transition()
        .duration('50')
        .attr('opacity', '1');
      
  
      d3.select("#tooltip").style("opacity", 0);
    });






    g.append("text")
      .attr("transform", d => "translate(" + outerArc.centroid(d) + ")")
      .attr("dy", "-0.2em")
      .style("text-anchor", "middle")
      .style("font-family", "Quicksand")
      .style("font-size", "24px")
      //.style("font-style", "italic")
      .text(d => `${d.data.label}`);



    g.append("text")
      .attr("transform", d => "translate(" + outerArc.centroid(d) + ")")
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .style("font-family", "'Helvetica Neue', Helvetica, Arial, sans-serif")
      .style("font-size", "20px")
      .style("font-weight", "bold")
      //.style("font-style", "italic")
      .style("fill", "red")
      .text(d => `${d.data.percentage}%`);



    const allTextBoxes = [];
    g.selectAll("text").each(function () {
      let textNode = d3.select(this);
      let thisBox = this.getBoundingClientRect();

      allTextBoxes.forEach((box) => {
        while (boxesCollide(thisBox, box)) {
          let currentTransform = textNode.attr("transform");
          let newTransform = currentTransform.replace(/translate\(([^,]+),([^,]+)\)/, (_, x, y) => `translate(${x},${parseFloat(y) + 1})`);
          textNode.attr("transform", newTransform);
          thisBox = this.getBoundingClientRect();
        }
      });

      allTextBoxes.push(thisBox);
    });
  }, [data, radius]);

  return (
    <div className="chart-container">
      <div className="svg-container">
        <svg ref={ref} />
        <div id="tooltip" className="tooltip" style={{
          position: "absolute",
          padding: "15px",
          fontWeight: "bold",
          borderRadius: "5px",
          opacity: 1,
          pointerEvents: "none",
          fontSize: "20px"
        }}></div>
      </div>
    </div>
  );
};

export default PieChart;
