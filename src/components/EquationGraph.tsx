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
    <div className='w-[300px] sm:w-[480px] md:w-[560px] lg:w-[720px]'>
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
        title: 'Graph',
        margin:{l:0, r:0},
        legend:{xanchor:'right', yanchor:'top', bgcolor:'rgba(255,255,255,0.7)'}
        
      }}
      useResizeHandler={true}
      style={{maxWidth:"100%", maxHeight:"100%"}}
      
      />
    </div>
  )
}
