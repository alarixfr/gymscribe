import { GB_JOURNALS_KEY } from '../assets/js/handler.js';

const journalsForm = document.getElementById('journalsForm');
const exportCSVButton = document.getElementById('exportCSV');
const exportJSONButton = document.getElementById('exportJSON');

let journals = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    return false;
  }
  return true;
}

function save() {
  if (!isStorageExist()) return;
  localStorage.setItem(GB_JOURNALS_KEY, JSON.stringify(journals));
}

function load() {
  if (!isStorageExist()) return;
  const stored = localStorage.getItem(GB_JOURNALS_KEY);
  if (stored) {
    journals = JSON.parse(stored);
    return;
  }
}

function generateTimestamp() {
  return Date.now();
}

function findJournalIndex(id) {
  for (const index in journals) {
    if (journals[index].id === id) {
      return index;
    }
  }
  return -1;
}

function journalObject(id, title, content, weight, mood, timestamp) {
  return {
    id,
    title,
    content,
    weight,
    mood,
    timestamp
  };
}

function createJournal(title, content, weight, mood) {
  const timestamp = generateTimestamp();
  
  const journalId = `${timestamp}-${Math.random().toString(36).slice(2)}`;
  const journal = journalObject(journalId, title, content, weight, mood, timestamp);
  
  journals.push(journal);
  render();
  save();
}

function removeJournal(id) {
  const journalIndex = findJournalIndex(id);
  
  if (journalIndex === -1) return;
  
  journals.splice(journalIndex, 1);
  render();
  save();
}

function generateElement(journal) {
  const journalContainer = document.createElement('div');
  const journalTitle = document.createElement('h3');
  const journalContent = document.createElement('p');
  const journalId = document.createElement('p');
  const removeButton = document.createElement('button');
  
  journalTitle.textContent = journal.title;
  journalContent.textContent = journal.content;
  journalId.textContent = `${journal.id} - ${journal.weight} ${journal.mood}`;
  removeButton.textContent = 'Delete Journal';
  removeButton.setAttribute('type', 'button');
  
  journalContainer.append(
    journalTitle,
    journalContent,
    journalId,
    removeButton,
  );
  journalContainer.classList.add('journal');
  
  removeButton.addEventListener('click', (e) => {
    removeJournal(journal.id);
  });
  
  return journalContainer;
}

function render() {
  const journalsContainer = document.getElementById('journals-list');
  journalsContainer.innerHTML = '';
  
  for (const journal of journals) {
    const journalElement = generateElement(journal);
    journalsContainer.append(journalElement);
  }
}

function exportCSV(list) {
  try {
    const headers = [
      "id",
      "title",
      "content",
      "weight",
      "mood",
      "timestamp",
    ];
    
    const rows = [
      headers,
      ...list.map((m) => [
        m.id ?? "",
        m.title ?? "",
        m.content ?? "",
        m.weight ?? "",
        m.mood ?? "",
        m.timestamp ?? "",
      ])
    ];
    
    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    
    const blob = new Blob([csv], {
      type: "text/csv",
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `journals-${Date.now()}.csv`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e.message);
  }
}

function exportJSON(list) {
  try {
    const dataString = JSON.stringify(list, null, 2);
    
    const blob = new Blob([dataString], {
      type: "application/json",
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.download = `journals-${Date.now()}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e.message);
  }
}

journalsForm.addEventListener('submit', (e) => {
  e.preventDefault();
    
  const journalTitleInput = document.getElementById('journalsTitle').value;
  const journalContentInput = document.getElementById('journalsContent').value;
  const journalWeightInput = document.getElementById('journalsWeight').value;
  const journalMoodInput = document.getElementById('journalsMood').value;
    
  if (!journalTitleInput || !journalContentInput || !journalWeightInput || !journalMoodInput) return;
    
  createJournal(journalTitleInput, journalContentInput, journalWeightInput, journalMoodInput);
  journalsForm.reset();
});

exportCSVButton.addEventListener('click', (e) => {
  if (journals.length <= 0) {
    alert('Journals Empty!');
    return;
  }
  
  exportCSV(journals);
});

exportJSONButton.addEventListener('click', (e) => {
  if (journals.length <= 0) {
    alert('Journals Empty!');
    return;
  }
  
  exportJSON(journals);
});

load();
render();