import React, { CSSProperties, useState } from 'react';
import { DatetimeSlot } from './datetime-slot';
import './App.scss';

function App() {
    const [date, setDate] = useState<Date>();

    const style: { [key: string]: CSSProperties } = {
        app: {
            padding: '1rem',
            borderRadius: '1rem',
            margin: '1rem auto',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '1px 1px 10px #d4d4d4',
        },
    };

    return (
        <>
            <div style={style.app}>
                <DatetimeSlot selectDate={(date) => setDate(date)} />
            </div>
            {date ? <div>{date.toLocaleString()}</div> : null}
        </>
    );
}

export default App;
