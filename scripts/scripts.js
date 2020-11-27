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
        th.setAttribute("class", "align-middle");
        th.scope = "row";
        th.innerText = index.toString();
        
        let tdName = document.createElement("td");
        tdName.setAttribute("class", "align-middle");
        tdName.scope = "row";
        tdName.innerText = t.name;

        let tdDescription = document.createElement("td");
        tdDescription.setAttribute("class", "align-middle");
        tdDescription.scope = "row";
        tdDescription.innerText = t.description;


        let tdBtnGrp = document.createElement("td");
        tdBtnGrp.setAttribute("class", "align-middle");
        tdBtnGrp.scope = "row";


        let tdDel = document.createElement("button");
        tdDel.setAttribute("type", "button");
        tdDel.setAttribute("class", "btn btn-danger mr-2");
        let delIcon = document.createElement("i");
        delIcon.setAttribute("class", "fas fa-trash-alt");
        tdDel.appendChild(delIcon);
        tdBtnGrp.appendChild(tdDel);


        //Ought to open a dynamic edit screen
        let tdEdit = document.createElement("button");
        tdEdit.setAttribute("type", "button");
        tdEdit.setAttribute("class", "btn btn-secondary mr-4");
        let editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fas fa-edit");
        tdEdit.appendChild(editIcon);
        tdBtnGrp.appendChild(tdEdit);

        //If the Task is done, it will be removed from display and added to the "Done"-category which cannot be removed.
        let tdCheck = document.createElement("button");
        tdCheck.setAttribute("type", "button");
        tdCheck.setAttribute("class", "btn btn-success");
        let checkIcon = document.createElement("i");
        checkIcon.setAttribute("class", "fas fa-check");
        tdCheck.appendChild(checkIcon);
        tdBtnGrp.appendChild(tdCheck);

        let tr = document.createElement("tr");
        tr.appendChild(th);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription);
        tr.appendChild(tdBtnGrp);

        body.appendChild(tr);
    })
}