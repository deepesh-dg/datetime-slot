import React, { CSSProperties, PropsWithChildren } from 'react';

export const DTWrapper = ({
    children,
    active = false,
    disable = false,
    onClick = () => {},
    style = {},
    value,
}: PropsWithChildren & {
    active?: boolean;
    disable?: boolean;
    onClick?: (data: any) => void;
    style?: CSSProperties;
    value: any;
}) => {
    const myStyle: CSSProperties = {
        borderRadius: '0.25rem',
        backgroundColor: active ? 'green' : 'rgb(244,244,244)',
        color: active ? 'white' : 'black',
        padding: '0.5rem 1rem',
        cursor: disable ? 'no-drop' : 'pointer',
        opacity: disable ? 0.5 : 1,
        ...style,
    };

    return (
        <div style={myStyle} onClick={() => !disable && onClick(value)}>
            {children}
        </div>
    );
};

export default DTWrapper;
