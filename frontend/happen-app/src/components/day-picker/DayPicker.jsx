import React from 'react'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import './DayPicker.css';

const DayPicker = () => {

    const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
    ]);

  return (
    <div>
        <DateRange
        showDateDisplay={false}
        rangeColors={['#B7410E']} 
        onChange={item => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        months={1}
        direction="horizontal"
        showMonthAndYearPickers={false}
        />
    </div>
  )
}

export default DayPicker
