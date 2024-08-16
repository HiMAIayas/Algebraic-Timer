import data from '@/libs/output.json';

export function findCity(timezone:string){
    for (const element of data){
        if (element.timezone===timezone){
            return [element.country, element.name]
        }
    }
    return [null,null];
}