export default function createModal(modalType, ...options) {
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
    
    modalContainer.append(emailTitle, emailContent, phoneTitle, phoneContent, birthdayTitle, birthdayContent, noteTitle, noteContent);
    
    backdrop.style.display = "flex";
  } else {
    throw new Error('No type found: ' + Error);
  }
  
  closeButton.addEventListener('click', (e) => {
    backdrop.remove();
  });
}