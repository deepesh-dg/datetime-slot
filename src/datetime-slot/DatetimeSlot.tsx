import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { Months, Day, Time } from './components';

export const DatetimeSlot = ({
    selectDate = () => {},
}: {
    selectDate?: (date: Date | undefined) => void;
}) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const [date, setDate] = useState<Date>(); // selected date

    const [month, setMonth] = useState<number>(now.getMonth()); // Active Month
    const [day, setDay] = useState<number>(); // Active Day
    const [time, setTime] = useState<{ hour: number; min: number }>();

    const range = 15; // range in days including both starting and end date
    const maxHeight = 200; // in pixels

    const ONE_DAY_MILLISECOND = useMemo(() => 60 * 60 * 24 * 1000, []);

    const startDate: Date = now;
    const endDate: Date = new Date(startDate.getTime() + ONE_DAY_MILLISECOND * range);

    const dates: Date[] = [];

    for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d));
    }

    const style: { [key: string]: CSSProperties } = {
        row: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        month: {
            width: '20%',
            flex: '0 0 20%',
            padding: '0rem 0.5rem',
            display: 'flex',
            justifyContent: 'center',
        },
        date: {
            width: '40%',
            flex: '0 0 40%',
            padding: '0rem 0.5rem',
            display: 'flex',
            justifyContent: 'center',
        },
        time: {
            width: '40%',
            flex: '0 0 40%',
            padding: '0rem 0.5rem',
            display: 'flex',
            justifyContent: 'center',
        },
    };

    useEffect(() => {
        selectDate(date);
    }, [date]);

    useEffect(() => {
        if (day && time && month >= 0 && day > 0) {
            const newDate = new Date();
            newDate.setDate(day);
            newDate.setMonth(month);
            newDate.setHours(time.hour, time.min, 0, 0);

            setDate(newDate);
        } else setDate(undefined);
    }, [month, day, time]);

    useEffect(() => {
        if (day) setDay(undefined);
    }, [month]);

    useEffect(() => {
        if (time) setTime(undefined);
    }, [day]);

    return (
        <>
            <div style={style.row}>
                <div style={style.month}>
                    <Months activeMonth={month} setMonth={setMonth} dates={dates} maxHeight={maxHeight} />
                </div>
                <div style={style.date}>
                    <Day
                        activeMonth={month}
                        activeDay={day}
                        setDay={setDay}
                        dates={dates}
                        maxHeight={maxHeight}
                    />
                </div>
                <div style={style.time}>
                    <Time
                        activeDay={day}
                        interval={60}
                        maxHeight={maxHeight}
                        activeTime={time}
                        slots={[
                            { from: { hour: 8, min: 0 }, to: { hour: 12, min: 0 } },
                            { from: { hour: 14, min: 30 }, to: { hour: 18, min: 0 } },
                        ]}
                        setTime={setTime}
                    />
                </div>
            </div>
        </>
    );
};

export default DatetimeSlot;
