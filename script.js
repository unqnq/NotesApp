document.addEventListener('DOMContentLoaded', () => 
{
    let savedTheme = localStorage.getItem('theme');
    if (savedTheme === null)
    {
        savedTheme = 'light';
    }
    applyTheme(savedTheme);
    populateThemeSelector(savedTheme);

    let savedSort = localStorage.getItem('sortMode') || 'default';
    document.getElementById('sortSelector').value = savedSort;
    showNotes();

    document.getElementById('sortSelector').addEventListener('change', (e) => {
      localStorage.setItem('sortMode', e.target.value);
      showNotes();
    });
});
    
function applyTheme(theme)
{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeSelector(theme);
}
    
function updateThemeSelector(theme)
{
    const select = document.getElementById('themeSelector');
    if (select)
    {
        select.value = theme;
    }
}

function populateThemeSelector(selectedTheme)
{
    const select = document.getElementById('themeSelector');
    if (!select) 
    {
        return;
    }
    
    const themes = 
    [
        { name: 'light', color: '#ffffff', text: '#000000' },
        { name: 'dark', color: '#121212', text: '#e0e0e0' },
        { name: 'blue', color: '#007BFF', text: '#ffffff' },
        { name: 'pink', color: '#FF69B4', text: '#ffffff' },
        { name: 'yellow', color: '#FFD700', text: '#000000' },
        { name: 'orange', color: '#FF8C00', text: '#ffffff' },
        { name: 'purple', color: '#800080', text: '#ffffff' },
        { name: 'green', color: '#28a745', text: '#ffffff' },
        { name: 'red', color: '#dc3545', text: '#ffffff' },
        { name: 'cyan', color: '#17a2b8', text: '#ffffff' }
    ];
    
    select.innerHTML = '';
    
    themes.forEach(theme => 
    {
        const option = document.createElement('option');
        option.value = theme.name;
        option.textContent = theme.name.toUpperCase();
    
        option.style.backgroundColor = theme.color;
        option.style.color = theme.text;
    
        if (theme.name === selectedTheme)
        {
            option.selected = true;
        }
    
        select.appendChild(option);
    });
    
    select.addEventListener('change', (e) => 
    {
        changeTheme(e.target.value);
    });
}
    
function changeTheme(theme)
{
    switch (theme)
    {
        case 'dark':
            applyTheme('dark');
            break;
        case 'light':
            applyTheme('light');
            break;
        case 'blue':
            applyTheme('blue');
            break;
        case 'pink':
            applyTheme('pink');
            break;
        case 'yellow':
            applyTheme('yellow');
            break;
        case 'orange':
            applyTheme('orange');
            break;
        case 'purple':
             applyTheme('purple');
            break;
        case 'green':
             applyTheme('green');
             break;
        case 'red':
             applyTheme('red');
            break;
        case 'cyan':
            applyTheme('cyan');
             break;
        default:
            applyTheme('light');
    }
}


const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = popupBox.querySelector("input"),
  descTag = popupBox.querySelector("textarea"),
  addBtn = popupBox.querySelector("button");

const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
  popupTitle.innerText = "Add a new Note";
  addBtn.innerText = "Add Note";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});

function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach(li => li.remove());

  let sortMode = document.getElementById('sortSelector')?.value || 'default';

  let notesToShow = [];

  if (sortMode === 'activeFirst') {
    let activeNotes = notes.filter(n => !n.archived);
    let archivedNotes = notes.filter(n => n.archived);
    notesToShow = [...activeNotes, ...archivedNotes];
  } else if (sortMode === 'archivedFirst') {
    let activeNotes = notes.filter(n => !n.archived);
    let archivedNotes = notes.filter(n => n.archived);
    notesToShow = [...archivedNotes, ...activeNotes];
  } 


  notesToShow.forEach((note, displayIndex) => {
    let realId = notes.indexOf(note);

    let filterDesc = note.description.replaceAll("\n", '<br/>');
    let noteClass = note.archived ? "archived" : "";
    let liTag = `<li class="note ${noteClass}">
                        <div class="details">
                            <p>${note.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${realId}, '${note.title}', \`${filterDesc}\`)"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${realId})"><i class="uil uil-trash"></i>Delete</li>
                                    <li onclick="toggleArchive(${realId})"><i class="uil uil-archive"></i>${note.archived ? "Unarchive" : "Archive"}</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend", liTag);
  });

  console.log(notes);
}


showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}

function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll('<br/>', '\r\n');
  updateId = noteId;
  isUpdate = true;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addBtn.innerText = "Update Note";
}

addBtn.addEventListener("click", e => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  if (title || description) {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear();
    let noteInfo = { title, description, date: `${month} ${day}, ${year}` }
    if (!isUpdate) {
      notes.push(noteInfo);
    } else {
      isUpdate = false;
      notes[updateId] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
    closeIcon.click();
  }
});


function toggleArchive(noteId) {
  // Перемикаємо архівований стан
  notes[noteId].archived = !notes[noteId].archived;

  // Вирізаємо запис з масиву
  let movedNote = notes.splice(noteId, 1)[0];

  let newIndex;
  // Якщо архівований — додаємо на початок
  if (movedNote.archived) {
    notes.unshift(movedNote);
    newIndex = 0; // Тепер він на початку
  } else {
    notes.push(movedNote);
    newIndex = notes.length - 1; // Тепер він в кінці
  }

  showNotes();
  localStorage.setItem("notes", JSON.stringify(notes));

  console.log("Новий індекс запису:", newIndex);
  console.log(notes);

  return newIndex; // Повертаємо новий індекс
}

