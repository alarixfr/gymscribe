const memberContainer = document.getElementById('member-container');
const memberForm = document.getElementById('add-member-form');

let members = [];

function timestamp() {
  return Date.now();
}

function createId() {
  try {
    const t = timestamp();
    const random = Math.random().toString(36).slice(2, 12);
    
    return `${t}-${random}`;
  } catch (e) {
    console.error(e.message);
  }
}

function createMember(memberName, memberAge, memberNote, memberStatus) {
  try {
    const memberId = createId();
    
    return {
      id: memberId,
      name: memberName,
      age: memberAge,
      note: memberNote,
      status: memberStatus
    };
  } catch (e) {
    console.error(e.message);
  }
}

function deleteMember(id) {
  try {
    
  } catch (e) {
    console.error(e.message);
  }
}

function updateMember(id) {
  try {
    
  } catch (e) {
    console.error(e.message);
  }
}

function addMember(name, age, note, status) {
  try {
    const member = createMember(name, age, note, status);
    
    members.push(member);
    
    console.log(members);
    render();
  } catch (e) {
    console.error(e.message);
  }
}

function generateElement(member) {
  try {
    const memberElement = document.createElement('div');
    
    const nameElement = document.createElement('h2');
    const idElement = document.createElement('p');
    const ageStatusElement = document.createElement('p');
    const noteElement = document.createElement('p');
    
    const buttonContainerElement = document.createElement('div');
    const deleteButtonElement = document.createElement('button');
    const updateButtonElement = document.createElement('button');
    
    memberElement.id = member.id;
    memberElement.classList.add('members');
    
    nameElement.textContent = member.name;
    idElement.textContent = member.id;
    ageStatusElement.textContent = `${member.age} - ${member.status}`;
    noteElement.textContent = member.note;
    
    buttonContainerElement.classList.add('members-buttons');
    deleteButtonElement.classList.add('red-buttons');
    updateButtonElement.classList.add('control-buttons');
    deleteButtonElement.textContent = 'Delete';
    updateButtonElement.textContent = 'Update';
    
    buttonContainerElement.append(deleteButtonElement, updateButtonElement);
    
    memberElement.append(nameElement, idElement, ageStatusElement, noteElement, buttonContainerElement);
    
    deleteButtonElement.addEventListener('click', deleteMember(member.id));
    updateButtonElement.addEventListener('click', updateMember(member.id));
    
    return memberElement;
  } catch (e) {
    console.error(e.message);
  }
}

function render() {
  
}

function init() {
  memberContainer.innerHTML = ``;
}

memberForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  try {
    const nameForm = document.getElementById('name').value;
    const ageForm = document.getElementById('age').value;
    const noteForm = document.getElementById('note').value || 'No notes.';
    const statusForm = document.getElementById('status').value;
    
    if (!nameForm || !ageForm || !statusForm) {
      throw new Error('Invalid form input');
    }
    
    addMember(nameForm, ageForm, noteForm, statusForm);
  } catch (e) {
    console.error(e.message);
  } finally {
    memberForm.reset();
  }
});

init();