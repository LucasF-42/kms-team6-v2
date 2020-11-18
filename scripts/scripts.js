class task{
    constructor(name, description, category, status) {
        this.name= name;
        this.description = description;
        this.category = status;
        this.status=status;
    }
}

let tasklist = [];
tasklist.push(new task("Example0", "Test", 0, 0));
tasklist.push(new task("Example1", "Test", 0, 0));
tasklist.push(new task("Example2", "Test", 0, 0));
tasklist.push(new task("Example3", "Test", 0, 0));



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