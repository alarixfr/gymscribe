const toolButtons = document.querySelectorAll('.select-tools-button');
const toolContainer = document.querySelector('.tool-input-container');

let activeTool;

for (const button of toolButtons) {
  button.addEventListener('click', (e) => {
    const selectedTool = e.target.id.toLowerCase();
    activeTool = `${selectedTool}-formula`;
    
    const toolElement = document.createElement(activeTool);
    toolContainer.innerHTML = '';
    toolContainer.append(toolElement);
    
    toolButtons.forEach(btn => btn.classList.remove('selected-tool'));
    e.target.classList.add('selected-tool');
  });
}

toolContainer.innerHTML = '';