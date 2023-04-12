import React, { CSSProperties } from 'react';
import DTWrapper from '../DTWrapper/DTWrapper';

export const Months = ({
    maxHeight,
    activeMonth,
    dates = [],
    setMonth = () => {},
}: {
    maxHeight: number;
    activeMonth: number;
    dates?: Date[];
    setMonth?: (month: number) => void;
}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const style: CSSProperties = {
        maxHeight: `${maxHeight}px`,
        overflow: 'auto',
        display: 'inline-block',
    };

    return (
        <div style={style}>
            {dates.map((date, index) =>
                date.getMonth() !== dates[index - 1]?.getMonth() ? (
                    <DTWrapper
                        value={date.getMonth()}
                        key={date.getTime()}
                        onClick={setMonth}
                        style={{ margin: '0.5rem 0rem' }}
                        active={date.getMonth() === activeMonth}
                    >
                        {months[date.getMonth()]}
                    </DTWrapper>
                ) : null,
            )}
        </div>
    );
};

export default Months;
