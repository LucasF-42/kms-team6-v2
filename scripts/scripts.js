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
    let body = document.getElementById("tableBody");
    
    tasklist.forEach((t, index) => {
        let th = document.createElement("th");
        th.scope = "row";
        th.innerText = index;
        
        let tdName = document.createElement("td");
        tdName.scope = "row";
        tdName.innerText = t.name;

        let tdDescription = document.createElement("td");
        tdDescription.scope = "row";
        tdDescription.innerText = t.description;

        //Ought to open a dynamic edit screen
        let tdEdit = document.createElement("input");
        tdEdit.setAttribute("type", "button");
        tdEdit.setAttribute("value", "Edit");

        //If the Task is done, it will be removed from display and added to the "Done"-category which cannot be removed.
        let tdCheck = document.createElement("input");
        tdCheck.setAttribute("type", "button");
        tdCheck.setAttribute("value", "Done");

        let tr = document.createElement("tr");
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription);
        tr.appendChild(tdEdit);
        tr.appendChild(tdCheck);

        body.appendChild(tr);
    })
}