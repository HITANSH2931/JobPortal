
export  function getSalary(salary){

    if(salary < 100000) return `${(salary/1000.0).toFixed(2)} K`; 
    else if(salary < 10000000) return`${(salary/100000.0).toFixed(2)} Lpa`;
    else return `${(salary/10000000.0).toFixed(2)} Cr`


}