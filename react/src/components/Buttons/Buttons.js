import React from 'react'

export default props => 
  <div className='buttons fadein'>
    <div className='button'>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>
</div>