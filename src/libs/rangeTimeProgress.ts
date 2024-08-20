export function getRangeYear(){
    const year = new Date().getFullYear();
    const startYear = new Date("January 1, "+year);
    const endYear = new Date("January 1, "+year+1);
    const range = startYear.getTime()-endYear.getTime()
    return [startYear,range];
}

export function getRangeMonth(){
    
}