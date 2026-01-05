function deleteModal() {
  const existedModal = document.querySelector('.modal-backdrop');
  if (existedModal) {
    existedModal.remove();
  }
}

function createModal(modalType, ...options) {
  const existedModal = document.querySelector('.modal-backdrop');
  if (existedModal) {
    existedModal.remove();
  }
  
  const backdrop = document.createElement('div');
  backdrop.classList.add('modal-backdrop');
  document.body.append(backdrop);
  
  const modal = document.createElement('div');
  modal.classList.add('modal');
  backdrop.append(modal);
  
  const title = document.createElement('h1');
  title.classList.add('modal-title');
  modal.append(title);
  
  const modalContainer = document.createElement('div');
  modalContainer.classList.add('modal-container');
  modal.append(modalContainer);
  
  const modalButtons = document.createElement('div');
  modalButtons.classList.add('modal-buttons');
  modal.append(modalButtons);
  
  const actionButton = document.createElement('button');
  actionButton.classList.add('cyan-button');
  actionButton.textContent = 'Save';
  modalButtons.append(actionButton);
    
  const closeButton = document.createElement('button');
  closeButton.classList.add('red-button');
  closeButton.textContent = 'Close';
  modalButtons.append(closeButton);
  
  
  if (modalType === "memberView") {
    const emailTitle = document.createElement('h3');
    const emailContent = document.createElement('p');
    
    const phoneTitle = document.createElement('h3');
    const phoneContent = document.createElement('p');
    
    const birthdayTitle = document.createElement('h3');
    const birthdayContent = document.createElement('p');
    
    const noteTitle = document.createElement('h3');
    const noteContent = document.createElement('p');
    
    title.textContent = "Details";
    emailTitle.textContent = 'Email:';
    phoneTitle.textContent = 'Phone:';
    birthdayTitle.textContent = 'Birthday:';
    noteTitle.textContent = 'Note:';
    
    const [email, phone, birthday, note] = options;
    
    emailContent.textContent = email;
    phoneContent.textContent = phone;
    birthdayContent.textContent = birthday;
    noteContent.textContent = note;
    
    actionButton.remove();
    
    modalContainer.append(emailTitle, emailContent, phoneTitle, phoneContent, birthdayTitle, birthdayContent, noteTitle, noteContent);
    
    backdrop.style.display = "flex";
  } else if (modalType === "memberEdit") {
    const form = document.getElementById('memberForm');
    const clonedForm = form.cloneNode(true);
    clonedForm.id = "memberEditForm";
    clonedForm.classList.add('edit-member-form');
    
    const clonedWithId = clonedForm.querySelectorAll('[id]');
    
    clonedWithId.forEach(element => {
      const oldId = element.id;
      let newId = oldId.replace(/^member/, '');
      newId = `editMember${newId}`;
      
      element.id = newId;
      
      if (element.tagName === 'LABEL' && element.hasAttribute('for')) {
        const oldFor = element.getAttribute('for');
        let newFor = oldFor.replace(/^member/, '');
        newFor = `editMember${newFor}`;
        element.setAttribute('for', newFor);
      }
    });
    
    const selectElement = clonedForm.querySelectorAll('.plans-select');
    selectElement.forEach(element => {
      element.remove();
    });
    
    const clonedSubmit = clonedForm.querySelector('#editMembersubmit');
    if (clonedSubmit) {
      clonedSubmit.remove();
    }
      
    actionButton.addEventListener('click', (e) => {
      e.preventDefault();
      clonedForm.requestSubmit();
    });
      
    modalContainer.append(clonedForm);
  
    title.textContent = 'Edit Member';
  } else if (modalType === "memberRenew") {
    const plansOptions = [
      {value: 'monthly', text:'Monthly (30d)'},
      {value: 'yearly', text: 'Yearly (365d)'},
      {value: 'lifetime', text: 'Lifetime (inf)'}
    ];
    
    const renewForm = document.createElement('form');
    renewForm.classList.add('renew-member-form');
    
    modalContainer.append(renewForm);
    
    const renewSelect = document.createElement('select');
    renewSelect.id = 'renew-select';
    
    const renewSelectLabel = document.createElement('label');
    renewSelectLabel.setAttribute('for', 'renew-select');
    renewSelectLabel.textContent = 'Select Plan:';
    
    renewForm.append(renewSelectLabel);
    renewForm.append(renewSelect);
    
    plansOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      renewSelect.append(optionElement);
    });
    
    actionButton.textContent = 'Confirm';
    title.textContent = 'Renew';
    
    actionButton.addEventListener('click', (e) => {
      e.preventDefault();
      renewForm.requestSubmit();
    });
  } else if (modalType === 'memberRemove') {
    const removeWarning = document.createElement('h3');
    removeWarning.textContent = 'Are you sure?';
    
    modalContainer.append(removeWarning);
    
    actionButton.textContent = 'Remove';
    title.textContent = 'Remove';
  } else {
    throw new Error('No type found: ' + Error);
  }
  
  closeButton.addEventListener('click', (e) => {
    backdrop.remove();
  });
}

export { createModal, deleteModal };