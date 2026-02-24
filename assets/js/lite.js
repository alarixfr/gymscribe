const memberContainer = document.getElementById('member-container');
const memberForm = document.getElementById('add-member-form');
const updateModal = document.getElementById('update-modal');
const updateModalForm = document.getElementById('update-modal-form');
const updateModalName = document.getElementById('update-modal-name');
const updateModalAge = document.getElementById('update-modal-age');
const updateModalNote = document.getElementById('update-modal-note');
const updateModalStatus = document.getElementById('update-modal-status');

let members = [];
let updateMemberTarget = null;

function timestamp() {
  return Date.now();
}

function findMember(id) {
  const targetId = members.findIndex(m => m.id === id);
  if (targetId !== -1) return targetId;
  
  return;
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
    const targetMemberIndex = findMember(id);
    members.splice(targetMemberIndex, 1);
    
    render();
  } catch (e) {
    console.error(e.message);
  }
}

function updateMember(id) {
  try {
    updateModal.style.display = 'flex';
    
    const memberIndex = findMember(id);
    updateMemberTarget = members[memberIndex];
    /*
    updateModalName.value = memberTarget.name;
    updateModalAge.value = memberTarget.age;
    updateModalNote.value = memberTarget.note;
    */
    
    updateModalName.setAttribute('value', updateMemberTarget.name);
    updateModalAge.setAttribute('value', updateMemberTarget.age);
    updateModalNote.setAttribute('value', updateMemberTarget.note);
  } catch (e) {
    console.error(e.message);
  }
}

function addMember(name, age, note, status) {
  try {
    const member = createMember(name, age, note, status);
    
    members.push(member);
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
    
    deleteButtonElement.addEventListener('click', () => {
      deleteMember(member.id);
    });
    
    updateButtonElement.addEventListener('click', () => {
      updateMember(member.id);
    });
    
    return memberElement;
  } catch (e) {
    console.error(e.message);
  }
}

function render() {
  try {
    memberContainer.innerHTML = '';
    
    for (const member of members) {
      const memberElement = generateElement(member);
      memberContainer.append(memberElement);
    }
  } catch(e) {
    console.error(e.message);
  }
}

function init() {
  updateModal.style.display = 'none';
  
  render();
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

updateModalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const memberTarget = updateMemberTarget;
  memberTarget.name = updateModalName.value;
  memberTarget.age = updateModalAge.value;
  memberTarget.note = updateModalNote.value;
  if (updateModalStatus.value !== 'nochange') {
    memberTarget.status = updateModalStatus.value;
  }
  
  updateModalForm.reset();
  updateModal.style.display = 'none';
  
  render();
});

init();