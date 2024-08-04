import React from 'react'
import Plot from 'react-plotly.js';

interface Prop{
    datapoint:{
        x:Float64Array,
        y1:Float64Array,
        y2:Float64Array
    }
}

export default function EquationGraph({datapoint}:Prop) {
  return (
    <div>
      <Plot 
      data={[
        { x: datapoint.x,
          y: datapoint.y1,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},}
      ]}
      layout={{
        width: 320, 
        height: 240, 
        title: 'A Fancy Plot'
      }}
      />
    </div>
  )
}
