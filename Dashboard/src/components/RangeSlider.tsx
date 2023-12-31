import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';

function valuetext(value: number) {
  return `${value}°C`;
}

export const RangeSlider = (
  { onHandleChange }: 
  { onHandleChange: (updatedRange: Array<number>) => void}
  ) => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

const handleOnDragStop = () => {
  onHandleChange(value as number[]);
}

  return (
    <Box sx={{ width: 300, paddingTop: '30px' }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            onChangeCommitted={handleOnDragStop}
          />
    </Box>
  )
}
