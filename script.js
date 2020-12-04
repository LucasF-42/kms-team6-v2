const backend = require('./backend');
const Task = backend.Task;
const priorities = backend.priorities;

const buildSpecificTable = (table) => {
    let body = document.getElementById("tableBody");

    body.innerHTML = "";

    table.forEach((t, index) => {
        let th = document.createElement("th");
        th.setAttribute("class", "align-middle");
        th.scope = "row";
        th.innerText = index.toString();

        let tdPrior = document.createElement("td");
        tdPrior.setAttribute("class", "align-middle");
        tdPrior.style.backgroundColor=determineColour(t.priority);
        tdPrior.innerText=t.priority;
        tdPrior.scope = "row";


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
        tdDel.onclick = () => {
            backend.deleteTask(index);
            buildTable();
        }
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
        tdEdit.setAttribute("data-toggle", "modal");
        tdEdit.setAttribute("data-target", "#editMod");
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
        tr.appendChild(tdPrior);
        tr.appendChild(tdName);
        tr.appendChild(tdDescription);
        tr.appendChild(tdBtnGrp);

        tdEdit.onclick = () => {
            setUpEditModal(table[index], tr);
        };
        //This code is so bad, it NEEDS to be refactored later
        //Reacts as soon as the button is pressed. Changes stuff for the current table iteration
        tdCheck.onclick = () => {
            if(!t.isDone){
                tr.style.textDecoration="line-through"
                tr.style.color="grey"
                tdPrior.style.backgroundColor="grey"
                tdPrior.innerText="";
                checkIcon.setAttribute("class", "fas fa-undo-alt");
                t.isDone=1;
            }else{
                tr.style.textDecoration="";
                tr.style.color="black";
                tdPrior.style.backgroundColor=determineColour(t.priority);
                tdPrior.innerText=priorities[t.priority];
                checkIcon.setAttribute("class", "fas fa-check");
                t.isDone=0;
            }
        }
        //Only really applies whenever the table is newly build
        //Resource dump - Exists since a new table item rebuilds the whole table
        if(t.isDone){
            tr.style.textDecoration="line-through"
            tr.style.color="grey"
            tdPrior.style.backgroundColor="grey"
            tdPrior.innerText="";
            checkIcon.setAttribute("class", "fas fa-undo-alt");
        }else{
            tr.style.textDecoration="";
            tr.style.color="black";
            tdPrior.style.backgroundColor=determineColour(t.priority);
            tdPrior.innerText=priorities[t.priority];
            checkIcon.setAttribute("class", "fas fa-check");
        }
        body.appendChild(tr);
    });
    appendCreateTaskRow(body);
}

let buildTable = () => {
    buildSpecificTable(backend.getTasks());
}

function determineColour(priority){
    switch (priority){
        case 0: //very low
            return "#494CA2";
        case 1: //low
            return "#6F975C"
        case 2: //medium
            return "#D2D462";
        case 3: //high
            return "#FF6361"
        case 4: //very high
            return "#AF0F19"
        case 5: //critical
            return "#930717"

    }
}

const setUpEditModal = (task, tableRow) => {
    const modBod = document.getElementById("modBody");
    modBod.innerHTML = "";
    const modBodForm = document.createElement("form");
    let name, desc, prio;

    {
        // Create taskName
        const nameGrp =  document.createElement("div");
        nameGrp.setAttribute("class", "form-group ");

        const nameL = document.createElement("label");
        nameL.setAttribute("for", "editName");
        nameL.innerHTML = "Task:"


        name = document.createElement("input");
        name.setAttribute("type", "text");
        name.setAttribute("class", "form-control");
        name.setAttribute("id", "editName");
        name.value = task.name;

        nameGrp.appendChild(nameL);
        nameGrp.appendChild(name);
        modBodForm.appendChild(nameGrp);
    }
    {
        // Create Priority editor
        const prioDiv = createPriorityDropDown("editPrioSel", true);
        prio = prioDiv.childNodes.item(1);
        prio.selectedIndex = task.priority;
        modBodForm.appendChild(prioDiv);
    }
    {
        //Create task description
        const descGrp = document.createElement("div");
        descGrp.setAttribute("class", "form-group ");

        const descL = document.createElement("label");
        descL.setAttribute("for", "editDesc");
        descL.innerHTML = "Description:"

        desc = document.createElement("textarea");
        desc.setAttribute("class", "form-control");
        desc.setAttribute("id", "editDesc");
        desc.setAttribute("rows", "4");
        desc.value = task.description;

        descGrp.appendChild(descL);
        descGrp.appendChild(desc);
        modBodForm.appendChild(descGrp);
    }
    const subBtn = document.getElementById("modSubmit");
    subBtn.onclick = () => {
        task.name = name.value;
        task.description = desc.value;
        task.priority = prio.selectedIndex;

        tableRow.children.item(2).innerText = task.name;
        tableRow.children.item(3).innerText = task.description;
        tableRow.children.item(1).innerText = priorities[task.priority];
        tableRow.children.item(1).style.backgroundColor = determineColour(task.priority);
    }

    modBod.appendChild(modBodForm);
}

const appendCreateTaskRow = tableBody => {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.scope = "row";
    th.innerText = "*new*";
    tr.appendChild(th);

    {
        const dropdown = createPriorityDropDown("prioSel", false);
        const tdPrio = document.createElement("td");
        tdPrio.scope = "row";
        tdPrio.appendChild(dropdown);

        tr.appendChild(tdPrio);
    }

    {
        const inputName = document.createElement("input");
        inputName.type = "text";
        inputName.id = "inputName";
        inputName.classList.add("form-control");
        inputName.placeholder = "Name";

        const tdName = document.createElement("td");
        tdName.scope = "row";
        tdName.appendChild(inputName);

        tr.appendChild(tdName);
    }

    {
        const inputDescription = document.createElement("input");
        inputDescription.type = "text";
        inputDescription.id = "inputDescription";
        inputDescription.classList.add("form-control");
        inputDescription.placeholder = "Description";

        const tdDescription = document.createElement("td");
        tdDescription.scope = "row";
        tdDescription.appendChild(inputDescription);
        
        tr.appendChild(tdDescription);
    }

    {
        const addIcon = document.createElement("i");
        addIcon.classList.add("fas", "fa-plus");
        
        const buttonAdd = document.createElement("button");
        buttonAdd.type = "button";
        buttonAdd.classList.add("btn", "btn-primary", "mr-4");
        buttonAdd.onclick = () => {
            const taskName = document.getElementById("inputName").value;
            const taskDescription = document.getElementById("inputDescription").value;
            const taskPrio = document.getElementById("prioSel").selectedIndex;

            backend.createTask(new Task(taskName, taskDescription, 0, taskPrio, 0));

            buildTable();
        }
        buttonAdd.appendChild(addIcon);

        const tdFunction = document.createElement("td");
        tdFunction.scope = "row";
        tdFunction.classList.add("align-middle");
        tdFunction.appendChild(buttonAdd);

        tr.appendChild(tdFunction);
    }

    tableBody.appendChild(tr);
}

const createPriorityDropDown = (id, doLabel) => {
    const dropdown = document.createElement("div");
    dropdown.setAttribute("class", "form-group form-inline");
    if(doLabel) {
        const lbl = document.createElement("label");
        lbl.setAttribute("for", "id")
        lbl.innerText = "Priority:";
        dropdown.appendChild(lbl);
    }
    const dSel = document.createElement("select");
    dSel.setAttribute("class", "form-control");
    dSel.setAttribute("id", id);
    dropdown.appendChild(dSel);
    priorities.forEach((elem) => {
        let opt = document.createElement("option");
        opt.innerText = elem;
        dSel.appendChild(opt);
    });
    dSel.selectedIndex = 0;
    return dropdown;
};

//TODO remove idx & arr?
window.onload = () => {
    let navSearchField = document.getElementById("navsearchform");
    navSearchField.oninput = () => {
        let searchWord = navSearchField.value.toLowerCase();
        let filteredTaskList = tasklist.filter((val, idx, arr) => {
            if(searchWord==="") return true;
            return val.name.toLowerCase().includes(searchWord);
        });
        buildSpecificTable(filteredTaskList);
    }
    buildTable();
};