const notes = JSON.parse(localStorage.getItem('notes')) || {};
let currentDate = new Date();

function buildCalendar(date) {
    const monthName = date.toLocaleString('default', { month: 'long' });
    document.getElementById("month-name").innerText = `${monthName} ${date.getFullYear()}`;

    const daysElement = document.getElementById("days");
    daysElement.innerHTML = '';

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    for (let i = 1; i < firstDayOfMonth.getDay(); i++) {
        daysElement.innerHTML += '<div class="day"></div>';
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
        const key = dayDate.toISOString().split('T')[0];
        const hasNote = notes[key] ? 'has-note' : '';

        daysElement.innerHTML += `<div class="day ${hasNote}" onclick="showNote('${key}')">${i}</div>`;
    }
}

function changeMonth(amount) {
    currentDate.setMonth(currentDate.getMonth() + amount);
    buildCalendar(currentDate);
}

function showNote(dateString) {
    document.getElementById("calendar").style.display = 'none';
    document.getElementById("note").style.display = 'block';

    const noteText = notes[dateString] || '';
    document.getElementById("note-date").innerText = dateString;
    document.getElementById("note-text").value = noteText;
}

function hideNote() {
    document.getElementById("calendar").style.display = 'block';
    document.getElementById("note").style.display = 'none';
}

function saveNote() {
    const dateString = document.getElementById("note-date").innerText;
    const noteText = document.getElementById("note-text").value;
    notes[dateString] = noteText;
    localStorage.setItem('notes', JSON.stringify(notes));
    hideNote();
    buildCalendar(currentDate);
}

buildCalendar(currentDate);
