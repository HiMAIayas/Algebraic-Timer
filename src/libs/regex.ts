import data from "@/libs/output.json";

export function getMatching(query:string){
    return data.filter((element)=>{
    
        if (element.name.indexOf(query) > -1) return true; //if it's -1 => not match
        if (element.country){
            if (element.country.indexOf(query) > -1) return true;
        }
        return false;
            
    })
}