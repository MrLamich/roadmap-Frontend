

export function GetRoadmaps(){
    let res = []
    fetch('http://localhost:8000/roadmaps')
        .then((response) => response.json())
        .then((data) => res.push(data));
    return res;
}