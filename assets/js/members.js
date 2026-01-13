import { init, getMembers } from './handler.js';
import { createModal, deleteModal } from './modal.js';

const membersContainer = document.getElementById('member-list');

let members;

async function loadMembers() {
  try {
    membersContainer.innerHTML = '';
    
    const noneElement = document.createElement('p');
    noneElement.style.display = 'block';
    noneElement.textContent = 'Loading members...';
    membersContainer.append(noneElement);
    
    await init();
    
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
        member.isAttended
      );
      
      membersContainer.append(memberElement);
    });
  } catch (error) {
    console.error(error.message);
  }
}

function generateMember(id, name, status, duration, isAttended) {
  const memberContainer = document.createElement('div');
  const memberInfo = document.createElement('div');
  const memberButtons = document.createElement('div');
  const actionButtons = document.createElement('div');
  const attendanceButtons = document.createElement('div');
  
  memberContainer.classList.add('member');
  memberInfo.classList.add('member-info')
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
  memberDuration.textContent = `Expires In ${duration}`;
  
  if (isAttended) {
    memberAttendance.textContent = 'Attendance: Checked-in';
  } else {
    memberAttendance.textContent = 'Attendance: Absence';
  }
  
  memberInfo.append(memberName, memberId, memberStatus, memberDuration, memberAttendance);
  
  memberButtons.classList.add('member-buttons')
  actionButtons.classList.add('action-buttons');
  attendanceButtons.classList.add('attendance-buttons');
  const viewBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  const renewBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  const attendanceBtn = document.createElement('button');
  viewBtn.classList.add('view-btn', 'yellow-btn');
  editBtn.classList.add('edit-btn', 'blue-btn');
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
    attendanceBtn.textContent = 'Mark as Absence'
  }
  
  viewBtn.addEventListener('click', (e) => {
    createModal('memberView', 'Alarixfr', '123', '67/67/6767', "very nice modal i guess");
  })
  
  editBtn.addEventListener('click', (e) => {
    createModal('memberEdit');
  })
  
  renewBtn.addEventListener('click', (e) => {
    createModal('memberRenew');
  })
  
  removeBtn.addEventListener('click', (e) => {
    createModal('memberRemove');
  })
  
  actionButtons.append(viewBtn, editBtn, renewBtn, removeBtn);
  attendanceButtons.append(attendanceBtn);
  memberButtons.append(actionButtons, attendanceButtons);
  memberContainer.append(memberInfo, memberButtons);
  memberContainer.id = id;
  
  return memberContainer;
}

loadMembers();