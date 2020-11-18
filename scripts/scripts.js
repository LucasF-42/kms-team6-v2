class task{
    constructor(name, description, category, status) {
        this.name= name;
        this.description = description;
        this.category = status;
        this.status=status;
    }
}

let tasklist = [];
let mytask = new task("Example", "Test", 0, 0);
tasklist.push(mytask);



let buildTable = () => {
    let body = document.getElementById("tableBody")
    
    tasklist.forEach((t, index) => {
        let th = document.createElement("th");
        th.scope = "row"
        th.innerText = index
        
        let tdName = document.createElement("td");
        tdName.scope = "row"
        tdName.innerText = t.name

        let tdDescription = document.createElement("td");
        tdDescription.scope = "row"
        tdDescription.innerText = t.description

        let tr = document.createElement("tr");
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription)

        body.appendChild(tr);
    })
}