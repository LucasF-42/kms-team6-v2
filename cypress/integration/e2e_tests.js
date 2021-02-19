describe('E2E-Testing', () => {

  beforeEach(() => {
    cy.reload();
  });

  it('load IOKE', () => {
    cy.visit('/');
  });

  it('input fields are accessible', () => {
    const name = "TestTask1";
    const desc = "TestDescription";
    const prio = "medium";

    cy.get('#inputName').type(name)
        .should('have.value', name);
    cy.get('#inputDescription').type(desc)
        .should('have.value', desc);
    cy.get('#prioSel').select(prio)
        .should('have.value', prio);
  });

  it('create a new task via the ui', () => {
    const name = "TestTask1";
    const desc = "TestDescription";
    const prio = "medium";

    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();

    let table = cy.get('#tableBody');
    let insertedRow = table.children().eq(0);

    // priority
    insertedRow.children().eq(1).should('have.text', prio);
    // task name
    insertedRow.next().should('have.text', name);
    // task description
    insertedRow.next().should('have.text', desc);
  });

  it('delete a task via ui', () => {
    const name = "testTask";
    const desc = "testDescription";
    const prio = "medium";
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();

    cy.contains('testTask');
    cy.get('#tableBody').within(() => {
      cy.get('.btn-danger:first').click();
    });
    cy.get('#tableBody').within(() => {
      cy.get('.btn:first').should('not.have.class', 'btn-danger');
    });
  });

  it('mark a task as done via ui', () => {
    const name = "testTask";
    const desc = "testDescription";
    const prio = "medium";
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();

    cy.contains('testTask');
    cy.get('#tableBody').within(() => {
      cy.get('.btn-success:first').click();
    });
    cy.get('#tableBody').within(() => {
      cy.get('tr:first').should('have.css', 'text-decoration')
          .and('match', /\.*line-through\.*/);
      cy.get('tr:first>td:last').children().children().last()
          .should('have.class', 'fa-undo-alt');
    });
  });

  it('unmark a task currently marked as "done" via ui', () => {
    const name = "testTask";
    const desc = "testDescription";
    const prio = "medium";
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();

    cy.contains('testTask');
    cy.get('#tableBody').within(() => {
      cy.get('.btn-success:first').click();
    });
    // task now marked as done
    cy.get('#tableBody').within(() => {
      cy.get('.btn-info:first').click();
    });
    cy.get('#tableBody').within(() => {
      cy.get('tr:first').should('have.css', 'text-decoration')
          .and('not.match', /\.*line-through\.*/);
      cy.get('tr:first>td:last').children().children().last()
          .should('have.class', 'fa-check');
    });
  });

  it('edit a tasks name', () => {
    const editedName = "editedTestTaskName";
    const editedDesc = "editedTestTaskDesc";
    const editedPrio = "critical";
    const name = "testTask";
    const desc = "testDescription";
    const prio = "medium";
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();
    cy.contains('testTask');

    // edit task
    cy.get('#tableBody').within(() => {
      cy.get('.btn-secondary:first').click();
    });
    let modal = cy.get('#editMod');
    modal.within(() => {
      cy.get('#editName').clear().type(editedName);
      cy.get('#editDesc').clear().type(editedDesc);
      cy.get('#editPrioSel').select(editedPrio);
      cy.get('#modSubmit').click();
    });

    //check if edited
    cy.get('#tableBody>tr:first').children().eq(1).should('have.text', editedPrio);
    cy.get('#tableBody>tr:first').children().eq(2).should('have.text', editedName);
    cy.get('#tableBody>tr:first').children().eq(3).should('have.text', editedDesc);
  });

  it('editing tasks can be canceled without changes', () => {
    const editedName = "editedTestTaskName";
    const editedDesc = "editedTestTaskDesc";
    const editedPrio = "critical";
    const name = "testTask";
    const desc = "testDescription";
    const prio = "medium";
    cy.get('#inputName').type(name);
    cy.get('#inputDescription').type(desc);
    cy.get('#prioSel').select(prio);
    cy.get('#createSubmit').click();
    cy.contains('testTask');

    // edit task
    cy.get('#tableBody').within(() => {
      cy.get('.btn-secondary:first').click();
    });
    let modal = cy.get('#editMod');
    modal.within(() => {
      cy.get('#editName').clear().type(editedName);
      cy.get('#editDesc').clear().type(editedDesc);
      cy.get('#editPrioSel').select(editedPrio);
      cy.get('#modCancel').click();
    });

    //check if unedited
    cy.get('#tableBody>tr:first').children().eq(1).should('have.text', prio);
    cy.get('#tableBody>tr:first').children().eq(2).should('have.text', name);
    cy.get('#tableBody>tr:first').children().eq(3).should('have.text', desc);
  });

});
