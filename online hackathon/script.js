// HAMBURGER MENU FUNCTIONALITY
function toggleMenu() {
    const menuLinks = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    
    menuLinks.classList.toggle('open');
    hamburgerIcon.classList.toggle('open');
}

document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.querySelector('.profile-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
            
// Toggle dropdown visibility
profileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    dropdownContent.classList.toggle('show');
});
            
// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!profileBtn.contains(e.target) && !dropdownContent.contains(e.target)) {
        dropdownContent.classList.remove('show');
    }
});
            
// Close dropdown when clicking on a dropdown item
const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            dropdownContent.classList.remove('show');
            });
    });
});

// GPA CALCULATOR
document.addEventListener('DOMContentLoaded', function() {
    const coursesContainer = document.getElementById('courses-container');
    const addCourseBtn = document.getElementById('add-course');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const gpaValue = document.getElementById('gpa-value');
    const gpaMessage = document.getElementById('gpa-message');
    const courseCount = document.getElementById('course-count');
            
    let courseCounter = 1;
            
    // Function to update course count
    function updateCourseCount() {
        const count = document.querySelectorAll('.course-item').length;
        courseCount.textContent = `(${count} ${count === 1 ? 'course' : 'courses'})`;
    }
            
    // Add new course field
    addCourseBtn.addEventListener('click', function() {
        courseCounter++;
        const courseItem = document.createElement('div');
        courseItem.className = 'course-item';
        courseItem.innerHTML = `
            <input type="text" class="course-input" placeholder="Course name">
            <select class="grade-select">
                <option value="4">A (4.0)</option>
                <option value="3.7">A- (3.7)</option>
                <option value="3.3">B+ (3.3)</option>
                <option value="3">B (3.0)</option>
                <option value="2.7">B- (2.7)</option>
                <option value="2.3">C+ (2.3)</option>
                <option value="2">C (2.0)</option>
                <option value="1.7">C- (1.7)</option>
                <option value="1.3">D+ (1.3)</option>
                <option value="1">D (1.0)</option>
                <option value="0">F (0.0)</option>
            </select>
            <select class="credit-select">
                <option value="1">1 credit</option>
                <option value="2">2 credits</option>
                <option value="3" selected>3 credits</option>
                <option value="4">4 credits</option>
                <option value="5">5 credits</option>
            </select>
                <button class="remove-btn"><i class="fas fa-times"></i></button>
            `;
                
        coursesContainer.appendChild(courseItem);
        updateCourseCount();
                
    // Enable remove button for all but the first course
        const removeButtons = document.querySelectorAll('.remove-btn');
        if (removeButtons.length > 1) {
            removeButtons[0].disabled = false;
            removeButtons[0].innerHTML = '<i class="fas fa-times"></i>';
        }
                
    // Add event to remove button
        const removeBtn = courseItem.querySelector('.remove-btn');
            removeBtn.addEventListener('click', function() {
                    coursesContainer.removeChild(courseItem);
                    updateCourseCount();
                    
                // If only one course remains, disable its remove button
                    const remainingCourses = document.querySelectorAll('.course-item');
                    if (remainingCourses.length === 1) {
                        remainingCourses[0].querySelector('.remove-btn').disabled = true;
                        remainingCourses[0].querySelector('.remove-btn').innerHTML = '<i class="fas fa-lock"></i>';
                    }
                });
            });
            
        // Calculate GPA
        calculateBtn.addEventListener('click', function() {
            const courseItems = document.querySelectorAll('.course-item');
            let totalPoints = 0;
            let totalCredits = 0;
            let allFieldsFilled = true;
                
            courseItems.forEach(item => {
                const courseName = item.querySelector('.course-input').value;
                const grade = parseFloat(item.querySelector('.grade-select').value);
                const credits = parseFloat(item.querySelector('.credit-select').value);
                    
                if (!courseName) {
                    allFieldsFilled = false;
                    item.querySelector('.course-input').style.borderColor = '#f94144';
                } else {
                    item.querySelector('.course-input').style.borderColor = '#ced4da';
                }
                    
                totalPoints += grade * credits;
                totalCredits += credits;
            });
                
            if (!allFieldsFilled) {
                alert('Please enter names for all courses');
                return;
            }
                
            if (totalCredits === 0) {
                alert('Please add at least one course with credits');
                return;
            }
                
            const gpa = totalPoints / totalCredits;
            gpaValue.textContent = gpa.toFixed(2);
                
                // Set message based on GPA
                if (gpa >= 3.7) {
                    gpaMessage.textContent = 'Excellent! Keep up the good work!';
                    gpaMessage.style.background = '#d4edda';
                    gpaMessage.style.color = '#155724';
                } else if (gpa >= 3.0) {
                    gpaMessage.textContent = 'Good job! You\'re doing well!';
                    gpaMessage.style.background = '#d1ecf1';
                    gpaMessage.style.color = '#0c5460';
                } else if (gpa >= 2.0) {
                    gpaMessage.textContent = 'You\'re doing okay, but there\'s room for improvement.';
                    gpaMessage.style.background = '#fff3cd';
                    gpaMessage.style.color = '#856404';
                } else {
                    gpaMessage.textContent = 'You might need to focus more on your studies.';
                    gpaMessage.style.background = '#f8d7da';
                    gpaMessage.style.color = '#721c24';
                }
            });
            
            // Reset calculator
            resetBtn.addEventListener('click', function() {
                coursesContainer.innerHTML = `
                    <div class="course-item">
                        <input type="text" class="course-input" placeholder="Course name">
                        <select class="grade-select">
                            <option value="4">A (4.0)</option>
                            <option value="3.7">A- (3.7)</option>
                            <option value="3.3">B+ (3.3)</option>
                            <option value="3">B (3.0)</option>
                            <option value="2.7">B- (2.7)</option>
                            <option value="2.3">C+ (2.3)</option>
                            <option value="2">C (2.0)</option>
                            <option value="1.7">C- (1.7)</option>
                            <option value="1.3">D+ (1.3)</option>
                            <option value="1">D (1.0)</option>
                            <option value="0">F (0.0)</option>
                        </select>
                        <select class="credit-select">
                            <option value="1">1 credit</option>
                            <option value="2">2 credits</option>
                            <option value="3" selected>3 credits</option>
                            <option value="4">4 credits</option>
                            <option value="5">5 credits</option>
                        </select>
                        <button class="remove-btn" disabled><i class="fas fa-lock"></i></button>
                    </div>
                `;
                
                gpaValue.textContent = '4.0';
                gpaMessage.textContent = 'Excellent! Keep up the good work!';
                gpaMessage.style.background = '#e9ecef';
                gpaMessage.style.color = '#343a40';
                updateCourseCount();
            });
            
            // Initialize course count
            updateCourseCount();
        });




        // motivational quote 


        // Motivational quotes array
        const quotes = [
            {
                text: "The only way to do great work is to love what you do.",
                author: "Steve Jobs"
            },
            {
                text: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            },
            {
                text: "Your time is limited, so don't waste it living someone else's life.",
                author: "Steve Jobs"
            },
            {
                text: "It does not matter how slowly you go as long as you do not stop.",
                author: "Confucius"
            },
            {
                text: "Everything you've ever wanted is on the other side of fear.",
                author: "George Addair"
            },
            {
                text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                author: "Winston Churchill"
            },
            {
                text: "The future belongs to those who believe in the beauty of their dreams.",
                author: "Eleanor Roosevelt"
            },
            {
                text: "The only limit to our realization of tomorrow will be our doubts of today.",
                author: "Franklin D. Roosevelt"
            },
            {
                text: "The harder you work for something, the greater you'll feel when you achieve it.",
                author: "Unknown"
            },
            {
                text: "Don't stop when you're tired. Stop when you're done.",
                author: "Unknown"
            },
            {
                text: "Education is the most powerful weapon which you can use to change the world.",
                author: "Nelson Mandela"
            },
            {
                text: "The beautiful thing about learning is that no one can take it away from you.",
                author: "B.B. King"
            },
            {
                text: "The expert in anything was once a beginner.",
                author: "Helen Hayes"
            },
            {
                text: "Success is the sum of small efforts, repeated day in and day out.",
                author: "Robert Collier"
            },
            {
                text: "The secret of getting ahead is getting started.",
                author: "Mark Twain"
            }
        ];

        // Function to display a random quote
        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const quote = quotes[randomIndex];
            
            document.getElementById('quote-text').textContent = quote.text;
            document.getElementById('quote-author').textContent = `- ${quote.author}`;
        }

        // Display a random quote when the page loads
        document.addEventListener('DOMContentLoaded', displayRandomQuote);


    // NOTES SECTION

    document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const notesGrid = document.getElementById('notes-grid');
    const notesModal = document.getElementById('notes-modal');
    const notesForm = document.getElementById('notes-form');
    const noteId = document.getElementById('note-id');
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const modalTitle = document.getElementById('notes-modal-title');
    const addBtn = document.getElementById('notes-add-btn');
    const closeBtn = document.getElementById('notes-modal-close');
    const cancelBtn = document.getElementById('notes-form-cancel');
    const searchInput = document.getElementById('notes-search-input');
    
    // Sample notes data
    let notes = [
        {
            id: 1,
            title: 'Mathematics Formulas',
            content: 'Quadratic formula: x = [-b ± √(b² - 4ac)] / 2a\nPythagorean theorem: a² + b² = c²\nArea of circle: A = πr²',
            date: '2023-02-15'
        },
        {
            id: 2,
            title: 'History Exam Notes',
            content: 'Key dates:\n- 1776: Declaration of Independence\n- 1861-1865: American Civil War\n- 1969: Moon Landing\n- 2001: September 11 attacks',
            date: '2023-04-12'
        },
        {
            id: 3,
            title: 'Literature Quotes',
            content: '"To be, or not to be: that is the question." - Hamlet\n"All that glitters is not gold." - Merchant of Venice\n"It was the best of times, it was the worst of times." - A Tale of Two Cities',
            date: '2024-09-10'
        },
        {
            id: 4,
            title: 'Chemistry Elements',
            content: 'Periodic Table:\n- H: Hydrogen\n- O: Oxygen\n- C: Carbon\n- N: Nitrogen\n- Na: Sodium\n- Cl: Chlorine',
            date: '2024-10-08'
        },
        {
            id: 5,
            title: 'Programming Concepts',
            content: 'OOP Principles:\n1. Encapsulation\n2. Inheritance\n3. Polymorphism\n4. Abstraction\n\nData Structures:\n- Arrays\n- Linked Lists\n- Stacks\n- Queues',
            date: '2025-01-05'
        },
        {
            id: 6,
            title: 'Biology Terms',
            content: 'Photosynthesis: process by which plants convert light energy into chemical energy\nMitosis: cell division process\nDNA: deoxyribonucleic acid, carrier of genetic information',
            date: '2023-08-03'
        }
    ];
    
    // Display notes function
    function displayNotes(notesToDisplay = null) {
        const notesArray = notesToDisplay || notes;
        notesGrid.innerHTML = '';
        
        if (notesArray.length === 0) {
            notesGrid.innerHTML = `
                <div class="notes-empty">
                    <div class="notes-empty-icon">
                        <i class="fas fa-sticky-note"></i>
                    </div>
                    <p class="notes-empty-text">No notes found.</p>
                    <button class="notes-add-btn" id="notes-empty-add-btn">
                        <i class="fas fa-plus"></i> Create Your First Note
                    </button>
                </div>
            `;
            
            // Add event listener to the empty state button
            document.getElementById('notes-empty-add-btn').addEventListener('click', () => {
                noteId.value = '';
                noteTitle.value = '';
                noteContent.value = '';
                modalTitle.textContent = 'Add New Note';
                notesModal.style.display = 'flex';
            });
            
            return;
        }
        
        notesArray.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.className = 'notes-card';
            noteElement.innerHTML = `
                <div class="notes-card-header">
                    <h3 class="notes-card-title">${note.title}</h3>
                    <div class="notes-card-menu">
                        <button class="notes-card-menu-btn">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="notes-card-menu-content">
                            <button type="button" onclick="editNote(${note.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button type="button" onclick="deleteNote(${note.id})">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
                <div class="notes-card-content">
                    ${note.content.replace(/\n/g, '<br>')}
                </div>
                <div class="notes-card-footer">
                    <span>${formatDate(note.date)}</span>
                    <div class="notes-card-actions">
                        <i class="fas fa-edit" onclick="editNote(${note.id})"></i>
                        <i class="fas fa-trash" onclick="deleteNote(${note.id})"></i>
                    </div>
                </div>
            `;
            notesGrid.appendChild(noteElement);
        });
        
        // Add event listeners to menu buttons
        const menuButtons = document.querySelectorAll('.notes-card-menu-btn');
        menuButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const menuContent = this.nextElementSibling;
                const isVisible = menuContent.style.display === 'block';
                
                // Close all other menus
                document.querySelectorAll('.notes-card-menu-content').forEach(menu => {
                    menu.style.display = 'none';
                });
                
                // Toggle this menu
                menuContent.style.display = isVisible ? 'none' : 'block';
            });
        });
        
        // Close menus when clicking elsewhere
        document.addEventListener('click', function(e) {
            if (!e.target.matches('.notes-card-menu-btn')) {
                document.querySelectorAll('.notes-card-menu-content').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });
    }
    
    // Format date function
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Open modal for adding new note
    addBtn.addEventListener('click', () => {
        noteId.value = '';
        noteTitle.value = '';
        noteContent.value = '';
        modalTitle.textContent = 'Add New Note';
        notesModal.style.display = 'flex';
    });
    
    // Close modal function
    function closeModal() {
        notesModal.style.display = 'none';
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Form submission handler
    notesForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = noteTitle.value.trim();
        const content = noteContent.value.trim();
        
        if (title && content) {
            if (noteId.value) {
                // Edit existing note
                const id = parseInt(noteId.value);
                const noteIndex = notes.findIndex(note => note.id === id);
                
                if (noteIndex !== -1) {
                    notes[noteIndex].title = title;
                    notes[noteIndex].content = content;
                    notes[noteIndex].date = new Date().toISOString().split('T')[0];
                }
            } else {
                // Add new note
                const newNote = {
                    id: notes.length > 0 ? Math.max(...notes.map(note => note.id)) + 1 : 1,
                    title,
                    content,
                    date: new Date().toISOString().split('T')[0]
                };
                
                notes.unshift(newNote);
            }
            
            displayNotes();
            closeModal();
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            displayNotes();
            return;
        }
        
        const filteredNotes = notes.filter(note => {
            return (
                note.title.toLowerCase().includes(searchTerm) ||
                note.content.toLowerCase().includes(searchTerm)
            );
        });
        
        displayNotes(filteredNotes);
    });
    
    // Edit note function (attached to window for HTML onclick)
    window.editNote = function(id) {
        const note = notes.find(note => note.id === id);
        
        if (note) {
            noteId.value = note.id;
            noteTitle.value = note.title;
            noteContent.value = note.content;
            modalTitle.textContent = 'Edit Note';
            notesModal.style.display = 'flex';
        }
    };
    
    // Delete note function (attached to window for HTML onclick)
    window.deleteNote = function(id) {
        if (confirm('Are you sure you want to delete this note?')) {
            notes = notes.filter(note => note.id !== id);
            displayNotes();
        }
    };
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === notesModal) {
            closeModal();
        }
    });
    
    // Initial display of notes
    displayNotes();
});

// CALENDAR AND TIMETABLE FUNCTIONALITY

// Global variables for calendar and timetable
let currentDate = new Date();
let selectedDate = new Date();
let todos = {};
let timetable = {};
let selectedDay = '';

const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Initialize calendar and timetable
function initCalendarAndTimetable() {
    renderCalendar();
    updateSelectedDate();
    renderTimetable();
}

// Calendar functions
function navigateMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

function formatDateKey(date) {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function selectDate(date) {
    selectedDate = date;
    updateSelectedDate();
    renderCalendar();
    renderTodoList();
}

function updateSelectedDate() {
    const selectedDateElement = document.getElementById('selected-date');
    if (selectedDateElement) {
        selectedDateElement.textContent = 
            selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}

function renderCalendar() {
    const title = document.getElementById('calendar-title');
    if (!title) return;
    
    title.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

    const grid = document.getElementById('calendar-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        grid.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const isSelected = selectedDate.toDateString() === date.toDateString();
        const isToday = new Date().toDateString() === date.toDateString();
        
        if (isSelected) dayElement.classList.add('selected');
        if (isToday) dayElement.classList.add('today');

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-todos" id="day-todos-${formatDateKey(date)}"></div>
        `;

        dayElement.addEventListener('click', () => selectDate(date));
        grid.appendChild(dayElement);

        // Render todo previews
        renderTodoPreviews(date);
    }

    renderTodoList();
}

function renderTodoPreviews(date) {
    const dateKey = formatDateKey(date);
    const todosContainer = document.getElementById(`day-todos-${dateKey}`);
    if (!todosContainer) return;
    
    const dayTodos = todos[dateKey] || [];

    todosContainer.innerHTML = '';
    dayTodos.slice(0, 3).forEach(todo => {
        const todoPreview = document.createElement('div');
        todoPreview.className = `todo-item-preview ${todo.completed ? 'completed' : ''}`;
        todoPreview.textContent = todo.text;
        todosContainer.appendChild(todoPreview);
    });

    if (dayTodos.length > 3) {
        const moreIndicator = document.createElement('div');
        moreIndicator.className = 'todo-item-preview';
        moreIndicator.textContent = `+${dayTodos.length - 3} more`;
        moreIndicator.style.background = '#6c757d';
        todosContainer.appendChild(moreIndicator);
    }
}

function renderTodoList() {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;
    
    const dateKey = formatDateKey(selectedDate);
    const dayTodos = todos[dateKey] || [];

    if (dayTodos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>No to-dos for this date</p>
                <p style="font-size: 0.9rem;">Click the + button to add one!</p>
            </div>
        `;
        return;
    }

    todoList.innerHTML = '';
    dayTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        todoItem.innerHTML = `
            <div class="todo-content">
                <div class="todo-checkbox ${todo.completed ? 'completed' : ''}" onclick="toggleTodo('${dateKey}', ${todo.id})">
                    ${todo.completed ? '✓' : ''}
                </div>
                <div class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</div>
            </div>
            <button class="delete-btn" onclick="deleteTodo('${dateKey}', ${todo.id})">🗑️</button>
        `;
        todoList.appendChild(todoItem);
    });
}

// Todo functions
function openTodoModal() {
    const modal = document.getElementById('todo-modal');
    if (modal) {
        modal.classList.add('active');
        const input = document.getElementById('todo-input');
        if (input) input.focus();
    }
}

function closeTodoModal() {
    const modal = document.getElementById('todo-modal');
    if (modal) {
        modal.classList.remove('active');
        const input = document.getElementById('todo-input');
        if (input) input.value = '';
    }
}

function addTodo() {
    const input = document.getElementById('todo-input');
    if (!input) return;
    
    const text = input.value.trim();
    
    if (text) {
        const dateKey = formatDateKey(selectedDate);
        if (!todos[dateKey]) todos[dateKey] = [];
        
        todos[dateKey].push({
            id: Date.now(),
            text: text,
            completed: false
        });
        
        renderCalendar();
        renderTodoList();
        closeTodoModal();
    }
}

function toggleTodo(dateKey, todoId) {
    if (todos[dateKey]) {
        todos[dateKey] = todos[dateKey].map(todo => 
            todo.id === todoId ? {...todo, completed: !todo.completed} : todo
        );
        renderCalendar();
        renderTodoList();
    }
}

function deleteTodo(dateKey, todoId) {
    if (todos[dateKey]) {
        todos[dateKey] = todos[dateKey].filter(todo => todo.id !== todoId);
        renderCalendar();
        renderTodoList();
    }
}

// Timetable functions
function renderTimetable() {
    const grid = document.getElementById('timetable-grid');
    if (!grid) return;
    
    grid.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">
                <div class="day-name">${day}</div>
                <button class="add-subject-btn" onclick="openSubjectModal('${day}')">➕</button>
            </div>
            <div class="subject-list" id="subjects-${day}"></div>
        `;
        grid.appendChild(dayCard);
        renderSubjects(day);
    });
}

function renderSubjects(day) {
    const container = document.getElementById(`subjects-${day}`);
    if (!container) return;
    
    const subjects = timetable[day] || [];

    if (subjects.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <p>No subjects for ${day}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = '';
    subjects.forEach(subject => {
        const subjectItem = document.createElement('div');
        subjectItem.className = 'subject-item';
        subjectItem.innerHTML = `
            <div class="subject-info">
                <div class="subject-icon">📖</div>
                <div class="subject-details">
                    <h4>${subject.name}</h4>
                    <div class="subject-time">🕐 ${subject.startTime} - ${subject.endTime}</div>
                </div>
            </div>
            <button class="delete-btn" onclick="deleteSubject('${day}', ${subject.id})">🗑️</button>
        `;
        container.appendChild(subjectItem);
    });
}

function openSubjectModal(day) {
    selectedDay = day;
    const modalDayElement = document.getElementById('modal-day');
    if (modalDayElement) {
        modalDayElement.textContent = day;
    }
    
    const modal = document.getElementById('subject-modal');
    if (modal) {
        modal.classList.add('active');
        const input = document.getElementById('subject-name');
        if (input) input.focus();
    }
}

function closeSubjectModal() {
    const modal = document.getElementById('subject-modal');
    if (modal) {
        modal.classList.remove('active');
        const nameInput = document.getElementById('subject-name');
        const startTimeInput = document.getElementById('start-time');
        const endTimeInput = document.getElementById('end-time');
        
        if (nameInput) nameInput.value = '';
        if (startTimeInput) startTimeInput.value = '';
        if (endTimeInput) endTimeInput.value = '';
    }
    selectedDay = '';
}

function addSubject() {
    const nameInput = document.getElementById('subject-name');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    
    if (!nameInput || !startTimeInput || !endTimeInput) return;
    
    const name = nameInput.value.trim();
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (name && startTime && endTime && selectedDay) {
        if (!timetable[selectedDay]) timetable[selectedDay] = [];
        
        timetable[selectedDay].push({
            id: Date.now(),
            name: name,
            startTime: startTime,
            endTime: endTime
        });
        // Sort by start time
        timetable[selectedDay].sort((a, b) => a.startTime.localeCompare(b.startTime));
        
        renderSubjects(selectedDay);
        closeSubjectModal();
    }
}

function deleteSubject(day, subjectId) {
    if (timetable[day]) {
        timetable[day] = timetable[day].filter(subject => subject.id !== subjectId);
        renderSubjects(day);
    }
}

// Event listeners for calendar and timetable
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const todoModal = document.getElementById('todo-modal');
        const subjectModal = document.getElementById('subject-modal');
        
        if (todoModal && todoModal.classList.contains('active')) {
            addTodo();
        } else if (subjectModal && subjectModal.classList.contains('active')) {
            addSubject();
        }
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        if (e.target.id === 'todo-modal') {
            closeTodoModal();
        } else if (e.target.id === 'subject-modal') {
            closeSubjectModal();
        }
    }
});

// Initialize calendar and timetable when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize calendar and timetable after a short delay to ensure all elements are loaded
    setTimeout(initCalendarAndTimetable, 100);
});