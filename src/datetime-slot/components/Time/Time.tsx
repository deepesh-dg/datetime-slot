import React, { CSSProperties } from 'react';
import { DTWrapper } from '..';

export const Time = ({
    maxHeight,
    interval,
    slots,
    activeTime,
    activeDay,
    setTime = () => {},
}: {
    maxHeight: number;
    interval: number;
    slots: { from: { hour: number; min: number }; to: { hour: number; min: number } }[];
    activeTime?: { hour: number; min: number };
    activeDay?: number;
    setTime?: (time: { hour: number; min: number }) => void;
}) => {
    const style: CSSProperties = {
        maxHeight: `${maxHeight}px`,
        overflow: 'auto',
        display: 'inline-block',
    };

    const prepend = (digit: number, by: number = 2) => {
        return digit.toLocaleString('en-US', { minimumIntegerDigits: by, useGrouping: false });
    };

    const finalSlots: { hour: number; min: number }[] = [];

    slots.forEach((slot) => {
        const fromDate = new Date();
        const toDate = new Date();

        fromDate.setHours(slot.from.hour, slot.from.min);
        toDate.setHours(slot.to.hour, slot.to.min);

        for (let d = fromDate; d < toDate; d.setHours(d.getHours(), d.getMinutes() + interval)) {
            finalSlots.push({ hour: d.getHours(), min: d.getMinutes() });
        }
    });

    return (
        <div style={style}>
            {finalSlots.map((slot) => (
                <DTWrapper
                    value={slot}
                    key={`${slot.hour}-${slot.min}`}
                    onClick={(time) => setTime(time)}
                    style={{ margin: '0.5rem 0rem' }}
                    active={activeTime ? activeTime.hour === slot.hour && activeTime.min === slot.min : false}
                    disable={activeDay ? !(activeDay > 0) : true}
                >
                    {prepend(slot.hour)} - {prepend(slot.min)}
                </DTWrapper>
            ))}
        </div>
    );
};

export default Time;
