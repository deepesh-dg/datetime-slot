import React, { CSSProperties } from 'react';
import { DTWrapper } from '..';

export const Day = ({
    maxHeight,
    activeDay,
    activeMonth,
    dates = [],
    setDay = () => {},
}: {
    maxHeight: number;
    activeDay?: number;
    activeMonth: number;
    dates?: Date[];
    setDay?: (Date: any) => void;
}) => {
    const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const style: CSSProperties = {
        maxHeight: `${maxHeight}px`,
        overflow: 'auto',
        display: 'inline-block',
    };

    return (
        <div style={style}>
            {dates.map((date, index) =>
                date.getMonth() === activeMonth ? (
                    <DTWrapper
                        value={date.getDate()}
                        key={date.getTime()}
                        onClick={setDay}
                        style={{ margin: '0.5rem 0rem' }}
                        active={date.getDate() === activeDay && activeMonth === date.getMonth()}
                        disable={!(activeMonth >= 0)}
                    >
                        {`${day[date.getDay()]} - ${date.getDate()}`}
                    </DTWrapper>
                ) : null,
            )}
        </div>
    );
};

export default Day;
