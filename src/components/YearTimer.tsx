import React from 'react'

interface Prop {
    year: number;
}


function displayYear(year: number) {
    //year>9999
    let exp = 4;
    while (year > Math.pow(10, exp + 1)) {
        exp += 1;
    }
    year = year / Math.pow(10, exp);
    const coef = year.toFixed(3)
    return {
        int: coef[0],
        mantissa: coef.substring(2, 5),
        exp: exp
    };
}


export default function YearTimer({ year }: Prop) {
    const { int, mantissa, exp } = displayYear(year);
    return (
        <div className='font-digital-mono bg-transparent p-1'>
            {(year > 9999) ? (
                <div>
                    {int}
                    <span className='font-digital'>.</span>
                    {mantissa}

                    <span className='font-digital'> &#8729; 10^</span>
                    {exp}
                </div>
            ) : (
                <div>{year}</div>
            )}
        </div>
    )
}
