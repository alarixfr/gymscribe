import { LITE_KEY } from './handler.js';

const memberContainer = document.getElementById('member-container');
const memberForm = document.getElementById('add-member-form');

const updateModal = document.getElementById('update-modal');
const updateModalForm = document.getElementById('update-modal-form');
const updateModalName = document.getElementById('update-modal-name');
const updateModalAge = document.getElementById('update-modal-age');
const updateModalNote = document.getElementById('update-modal-note');
const updateModalStatus = document.getElementById('update-modal-status');

const loadJSONButton = document.getElementById('loadJSON');
const exportJSONButton = document.getElementById('exportJSON');
const exportCSVButton = document.getElementById('exportCSV');
const clearDataButton = document.getElementById('clearData');

const totalCount = document.getElementById('total-count');
const activeCount = document.getElementById('active-count');
const expiresSoonCount = document.getElementById('expires-soon-count');
const expiredCount = document.getElementById('expired-count');

let members = [];
let updateMemberTarget = null;
let memberChart = null;

function isStorageExist() {
  if (typeof Storage !== 'undefined') return true;
  return false;
}

function loadData() {
  try {
    if (!isStorageExist()) throw new Error('Storage Not Exist');
    
    const loadedData = localStorage.getItem(LITE_KEY);
    if (!loadedData) throw new Error('Storage Empty');
    
    const parsedData = JSON.parse(loadedData);
    
    members = parsedData;
  } catch (e) {
    members = [];
  }
}

function saveData() {
  try {
    const stringifiedData = JSON.stringify(members);
    
    localStorage.setItem(LITE_KEY, stringifiedData);
  } catch (e) {
    console.error('Failed to save');
  }
}

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
    saveData();
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
    saveData();
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

function renderChart() {
  try {
    const activeMembers = members.filter((m) => m.status === 'active').length;
    const expiresSoonMembers = members.filter((m) => m.status === 'expiressoon').length;
    const expiredMembers = members.filter((m) => m.status === 'expired').length;
    
    const chartContainer = document.querySelector('.chart-container');
    
    if (memberChart) {
      memberChart.destroy();
    }
    
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      chartContainer.innerHTML = '';
      chartContainer.append(canvas);
    }
    
    const ctx = canvas.getContext('2d');
    
    memberChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Expires Soon', 'Expired'],
        datasets: [
          {
            data: [
              activeMembers,
              expiresSoonMembers,
              expiredMembers,
            ],
            backgroundColor: [
              'rgba(60, 180, 120, 0.8)',
              'rgba(255, 200, 10, 0.8)',
              'rgba(255, 90, 90, 0.8)',
            ],
            borderColor: [
              'rgba(60, 180, 120, 1)',
              'rgba(255, 200, 10, 1)',
              'rgba(255, 90, 90, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
              font: {
                size: 14
              }
            }
          },
          title: {
            display: true,
            text: 'Members Data',
            color: '#fff',
            font: {
              size: 16
            }
          }
        }
      }
    });
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
    
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.status === 'active').length;
    const expiresSoonMembers = members.filter((m) => m.status === 'expiressoon').length;
    const expiredMembers = members.filter((m) => m.status === 'expired').length;
    
    totalCount.textContent = totalMembers;
    activeCount.textContent = activeMembers;
    expiresSoonCount.textContent = expiresSoonMembers;
    expiredCount.textContent = expiredMembers;
    
    renderChart();
  } catch(e) {
    console.error(e.message);
  }
}

function init() {
  updateModal.style.display = 'none';
  loadData();
  
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
  saveData();
});

loadJSONButton.addEventListener('click', () => {
  try {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const loadedMembers = JSON.parse(event.target.result);
          
          if (!Array.isArray(loadedMembers)) {
            throw new Error('Invalid Format');
          }
          
          loadedMembers.forEach((m) => {
            if (!m.id || !m.name || !m.age || !m.status) {
              throw new Error('Missing Required Fields');
            }
          });
          
          members = loadedMembers;
          saveData();
          render();
          alert('Loaded!');
        } catch (e) {
          alert(e.message);
          console.error(e.message);
        }
      };
      
      reader.onerror = () => {
        alert('Failed to read file');
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  } catch (e) {
    console.error(e.message);
  }
});

exportJSONButton.addEventListener('click', () => {
  try {
    const dataString = JSON.stringify(members, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `members-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e.message);
  }
});

exportCSVButton.addEventListener('click', () => {
  try {
    const headers = ['Name', 'ID', 'Age', 'Status', 'Note'];
    const rows = members.map((m) => [
      m.name,
      m.id,
      m.age,
      m.status,
      m.note,
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${cell}"`).join(',')
        ),
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `members-${Date.now()}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e.message);
  }
});

clearDataButton.addEventListener('click', () => {
  const confirmation = confirm('Are you sure? (erase all local data)');
  
  if (confirmation) {
    members = [];
    render();
    localStorage.removeItem(LITE_KEY);
  } else {
    return;
  }
});

init();