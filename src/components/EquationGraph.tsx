import dynamic from 'next/dynamic';
import React from 'react'
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

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
          name:'f(t)',
          mode: 'lines',
          marker: {color: 'red'},},

        { x: datapoint.x,
          y: datapoint.y2,
          name: 'display',
          type: 'scatter',
          mode: 'lines',
          marker: {color: 'blue'},}
        
      ]}
      layout={{
        title: 'Graph'
      }}
      />
    </div>
  )
}
