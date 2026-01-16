import { init, getMembers, createMember, updateMember, deleteMember, renewMember, toggleAttendance } from './handler.js';
import { createModal, deleteModal } from './modal.js';

const membersContainer = document.getElementById('member-list');

let members;

const form = document.getElementById('memberForm');
const nameInput = document.getElementById('memberNameInput');
const emailInput = document.getElementById('memberEmailInput');
const phoneInput = document.getElementById('memberPhoneInput');
const birthdayInput = document.getElementById('memberBirthdayInput');
const noteInput = document.getElementById('memberNoteInput');
const plansInput = document.getElementById('memberPlansInput');
const submitBtn = document.getElementById('submit');
const exportBtn = document.getElementById('exportBtn');

async function convertToCSV(list) {
  const headers = [
    "id",
    "name",
    "email",
    "phone",
    "birthday",
    "note",
    "plans",
    "status",
    "duration",
    "isAttended",
    "timestamp"
  ];
  
  const rows = [
    headers,
    ...list.map(m => [
      m.id ?? "",
      m.name ?? "",
      m.details?.email ?? "",
      m.details?.phone ?? "",
      m.details?.birthday ?? "",
      m.details?.note ?? "",
      m.plan ?? "",
      m.status ?? "",
      m.duration ?? "",
      m.isAttended ?? "",
      m.timestamp ?? ""
    ])
  ];
  
  const csv = rows.map(row => row
    .map(value => `"${String(value).replace(/"/g, '""')}"`)
    .join(",")
  )
  .join("\n");
  
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = "members.csv";
  a.click();
  
  URL.revokeObjectURL(url);
}

async function newMember() {
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Adding Member...';
    
    if (nameInput.value === '') throw new Error('Name is required');
    
    const memberJSON = {
      fullname: nameInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
      birthday: birthdayInput.value,
      note: noteInput.value,
      plans: plansInput.value
    };
    
    const newMember = await createMember(memberJSON);
    
    if (newMember?.error) throw new Error(newMember.error);
  } catch (error) {
    console.error(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Add Member';
    form.reset();
    
    await loadMembers();
  }
}

async function loadMembers() {
  try {
    membersContainer.innerHTML = '';
    
    const noneElement = document.createElement('p');
    noneElement.style.display = 'block';
    noneElement.classList.add('member-list-info');
    noneElement.textContent = 'Loading members...';
    membersContainer.append(noneElement);
    
    const memberData = await getMembers();
    
    if (memberData?.error) throw new Error(memberData.error);
    
    members = memberData.membersList;
    
    if (members.length <= 0) {
      noneElement.textContent = 'No members found!';
      
      return;
    }
    
    noneElement.remove();
    
    members.forEach((member) => {
      const memberElement = generateMember(
        member.id,
        member.name,
        member.status,
        member.duration,
        member.isAttended,
        member.details.email,
        member.details.phone,
        member.details.birthday,
        member.details.note
      );
      
      membersContainer.append(memberElement);
    });
  } catch (error) {
    console.error(error.message);
  } finally {
    ScrollReveal().clean('.load-hidden');
    ScrollReveal().reveal('.load-hidden');
  }
}

function generateMember(id, name, status, duration, isAttended, email, phone, birthday, note) {
  const memberContainer = document.createElement('div');
  const memberInfo = document.createElement('div');
  const memberButtons = document.createElement('div');
  const actionButtons = document.createElement('div');
  const attendanceButtons = document.createElement('div');
  
  memberContainer.classList.add('member', 'load-hidden');
  memberInfo.classList.add('member-info');
  const memberName = document.createElement('h3');
  const memberId = document.createElement('p');
  const memberStatus = document.createElement('p');
  const memberDuration = document.createElement('p');
  const memberAttendance = document.createElement('p');
  
  memberName.classList.add('member-name');
  memberId.classList.add('member-id');
  memberStatus.classList.add('member-status');
  memberDuration.classList.add('member-duration');
  memberAttendance.classList.add('member-attendance');
  memberName.textContent = name;
  memberId.textContent = `ID: ${id}`;
  memberStatus.textContent = `Status: ${status}`;
  if (duration === null) {
    memberDuration.textContent = 'Expires in: Never (Lifetime)';
  } else if (duration < 0) {
    memberDuration.textContent = `Expired ${Math.abs(duration)} days ago`;
  } else {
    memberDuration.textContent = `Expires in ${duration} days`;
  }
  
  if (isAttended) {
    memberAttendance.textContent = 'Attendance: Checked-in';
  } else {
    memberAttendance.textContent = 'Attendance: Absence';
  }
  
  memberInfo.append(memberName, memberId, memberStatus, memberDuration, memberAttendance);
  
  memberButtons.classList.add('member-buttons');
  actionButtons.classList.add('action-buttons');
  attendanceButtons.classList.add('attendance-buttons');
  const viewBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  const renewBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  const attendanceBtn = document.createElement('button');
  viewBtn.classList.add('view-btn', 'yellow-button');
  editBtn.classList.add('edit-btn', 'blue-button');
  renewBtn.classList.add('renew-btn', 'cyan-button');
  removeBtn.classList.add('remove-btn', 'red-button');
  attendanceBtn.classList.add('attendance-btn');
  viewBtn.textContent = 'View Details';
  editBtn.textContent = 'Edit';
  renewBtn.textContent = 'Renew';
  removeBtn.textContent = 'Remove';
  
  if (!isAttended) {
    attendanceBtn.textContent = 'Mark As Attended';
  } else {
    attendanceBtn.textContent = 'Mark As Absence';
  }
  
  viewBtn.addEventListener('click', (e) => {
    createModal('memberView', name, email, phone, birthday, note);
  });
  
  editBtn.addEventListener('click', (e) => {
    createModal('memberEdit', id, name, email, phone, birthday, note);
  });
  
  renewBtn.addEventListener('click', (e) => {
    createModal('memberRenew', id);
  });
  
  removeBtn.addEventListener('click', (e) => {
    createModal('memberRemove', id, name);
  });
  
  attendanceBtn.addEventListener('click', async (e) => {
    try {
      attendanceBtn.disabled = true;
      attendanceBtn.textContent = 'Updating...';
      const toggleStatus = await toggleAttendance(id);
      if (toggleStatus?.error) throw new Error(toggleStatus.error);
      isAttended = toggleStatus.isAttended;
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        if (isAttended) {
          attendanceBtn.textContent = 'Mark As Absence';
        } else {
          attendanceBtn.textContent = 'Mark As Attended';
        }
        if (isAttended) {
          memberAttendance.textContent = 'Attendance: Checked-in';
        } else {
          memberAttendance.textContent = 'Attendance: Absence';
        }
        attendanceBtn.disabled = false;
      }, 2000);
    }
  });
  
  actionButtons.append(viewBtn, editBtn, renewBtn, removeBtn);
  attendanceButtons.append(attendanceBtn);
  memberButtons.append(actionButtons, attendanceButtons);
  memberContainer.append(memberInfo, memberButtons);
  memberContainer.id = `member-${id}`;
  
  return memberContainer;
}

document.addEventListener('DOMContentLoaded', async () => {
  await init();
  await loadMembers();
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    newMember();
  });
  
  exportBtn.addEventListener('click', async (event) => {
    exportBtn.disabled = true
    try {
      if (!members || members.length === 0) {
        exportBtn.textContent = 'Members list is blank!';
        throw new Error('Members list is blank');
      } 
      
      exportBtn.textContent = 'Downloading...';
      await convertToCSV(members);
    } catch (error) {
      console.error(error.message);
    } finally {
      setTimeout(() => {
        exportBtn.textContent = 'Export To .CSV';
        exportBtn.disabled = false;
      }, 2000);
    }
  });
});

export { loadMembers };