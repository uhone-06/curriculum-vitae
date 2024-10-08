 // Function to set the theme and update UI
 function setTheme(theme) {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    var switchThemeBtn = document.getElementById('switchTheme');
    if (switchThemeBtn) {
        switchThemeBtn.innerHTML = theme === 'dark' ?  '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-stars-fill"></i>';
    }
    //console.log(`Switched to ${theme} theme`);
}

var currentTheme = localStorage.getItem('theme') || 'dark';
setTheme(currentTheme);

// Event listener for the switch theme button
var switchThemeBtn = document.getElementById('switchTheme');
if (switchThemeBtn) {
    switchThemeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

//AOS Initiliaze
AOS.init();

// Fixed Header & back to top button on Scroll
window.addEventListener('scroll', () => {
    // fixed header
    const header = document.getElementById('header');
    if (window.scrollY > 30 && !header.classList.contains('fixed-top')) {
        header.classList.add('fixed-top');
        document.getElementById('offcanvasNavbar').classList.add('fixedHeaderNavbar');
    } else if (window.scrollY <= 30 && header.classList.contains('fixed-top')) {
        header.classList.remove('fixed-top');
        document.getElementById('offcanvasNavbar').classList.remove('fixedHeaderNavbar');
    }

    //backtotop
    const backToTopButton = document.getElementById("backToTopButton");
    if (window.scrollY > 400 && backToTopButton.style.display === 'none') {
        backToTopButton.style.display = 'block';
    } else if (window.scrollY <= 400 && backToTopButton.style.display === 'block') {
        backToTopButton.style.display = 'none';
    }
});


//jumping to top function
function scrollToTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//Testimonial Slider
$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        nav:true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1,
            },
            768:{
                items:2,
            },
            1170:{
                items:3,
            }
        }
    });
});



// Function to add a new skill
    document.getElementById('add-skill-btn').addEventListener('click', function() {
        const skillName = document.getElementById('skill-name').value;
        const skillImage = document.getElementById('skill-image').value;

        if (skillName && skillImage) {
            const skillsList = document.getElementById('skills-list');
            
            // Create a new skill card (editable)
            const skillCard = document.createElement('div');
            skillCard.classList.add('col', 'editable');
            skillCard.innerHTML = `
                <div class="skill">
                    <img class="skill-image" src="${skillImage}" alt="${skillName}">
                    <p class="skill-name">${skillName}</p>
                    <button class="btn btn-sm btn-warning edit-btn">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn">Delete</button>
                </div>
            `;

            // Append to the skills list
            skillsList.appendChild(skillCard);

            // Add event listeners for edit and delete buttons
            skillCard.querySelector('.edit-btn').addEventListener('click', function() {
                editSkill(skillCard);
            });
            skillCard.querySelector('.delete-btn').addEventListener('click', function() {
                skillCard.remove();
            });

            // Clear input fields after adding
            document.getElementById('skill-name').value = '';
            document.getElementById('skill-image').value = '';
        }
    });

    // Function to edit an existing skill
    function editSkill(skillCard) {
        const skillNameElement = skillCard.querySelector('.skill-name');
        const skillImageElement = skillCard.querySelector('.skill-image');

        const newSkillName = prompt('Edit skill name:', skillNameElement.textContent);
        const newSkillImage = prompt('Edit skill image URL:', skillImageElement.src);

        if (newSkillName) skillNameElement.textContent = newSkillName;
        if (newSkillImage) skillImageElement.src = newSkillImage;
    }

    // Add delete functionality to existing editable skills
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            button.closest('.col').remove();
        });
    });

    // Add edit functionality to existing editable skills
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const skillCard = button.closest('.col');
            editSkill(skillCard);
        });
    });



    
    
    
    
    
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
        const educationList = document.getElementById('educationList');
        const addEducationBtn = document.getElementById('addEducationBtn');
    
        // Function to create a new education card
        function createEducationCard(title, university, year, description) {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 education-card';
            card.innerHTML = `
                <div class="card education">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="col-2">
                                <img src="https://via.placeholder.com/100" class="img-fluid icon" alt="University Logo">
                            </div>
                            <div class="col-7 p-0">
                                <span class="card-title title">${title}</span>
                                <p class="stacks m-0">${university}</p>
                                <p class="stacks m-0">${year}</p>
                            </div>
                            <div class="col-3 align-middle">
                                <button class="btn btn-warning btn-sm me-2 edit-btn">Edit</button>
                                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                            </div>
                        </div>
                        <div class="description-container">
                            <p class="description">${description}</p>
                        </div>
                    </div>
                    <div class="banner-container">
                        <img src="https://via.placeholder.com/500x200" class="card-img-top banner" alt="Education Banner">
                    </div>
                </div>
            `;
            educationList.appendChild(card);
        }
    
        // Event listener for Add Education button
        addEducationBtn.addEventListener('click', function () {
            const title = prompt('Enter the degree title:');
            const university = prompt('Enter the university name:');
            const year = prompt('Enter the year:');
            const description = prompt('Enter a description:');
            
            if (title && university && year) {
                createEducationCard(title, university, year, description);
            }
        });
    
        // Event delegation for Edit and Delete buttons
        educationList.addEventListener('click', function (e) {
            if (e.target.classList.contains('delete-btn')) {
                const card = e.target.closest('.education-card');
                if (card) {
                    card.remove();
                }
            }
    
            if (e.target.classList.contains('edit-btn')) {
                const card = e.target.closest('.education-card');
                const titleElement = card.querySelector('.title');
                const descriptionElement = card.querySelector('.description');
    
                // For demonstration, prompting user for new values
                const newTitle = prompt('Enter new title:', titleElement.textContent);
                const newDescription = prompt('Enter new description:', descriptionElement.textContent);
    
                if (newTitle) titleElement.textContent = newTitle;
                if (newDescription) descriptionElement.textContent = newDescription;
            }
        });
    });
    



    // Function to add a new education entry
document.getElementById('add-education-btn').addEventListener('click', function() {
    const educationTitle = prompt('Enter Education Title:');
    const educationInstitution = prompt('Enter Institution Name:');
    const educationYear = prompt('Enter Year(s):');
    const educationImage = prompt('Enter Image URL:');
    const educationDescription = prompt('Enter Description:');

    if (educationTitle && educationInstitution && educationYear && educationImage && educationDescription) {
        const educationList = document.getElementById('education-list');

        // Create a new education card
        const educationCard = document.createElement('div');
        educationCard.classList.add('col-lg-4', 'col-md-6');
        educationCard.innerHTML = `
            <div class="card education">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div class="col-2">
                            <img src="${educationImage}" class="img-fluid icon" alt="${educationTitle}">
                        </div>
                        <div class="col-7 p-0">
                            <span class="card-title title">${educationTitle}</span>
                            <p class="stacks m-0">${educationInstitution}</p>
                            <p class="stacks m-0">${educationYear}</p>
                        </div>
                        <div class="col-3 align-middle">
                            <button class="btn btn-warning btn-sm me-2 edit-btn">Edit <i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm delete-btn">Delete <i class="bi bi-trash"></i></button>
                        </div>
                    </div>
                    <div class="description-container">
                        <p class="description">${educationDescription}</p>
                    </div>
                </div>
                <div class="banner-container">
                    <img src="${educationImage}" class="card-img-top banner" alt="${educationTitle}">
                </div>
            </div>
        `;

        // Append to the education list
        educationList.appendChild(educationCard);

        // Add event listeners for the new edit and delete buttons
        educationCard.querySelector('.edit-btn').addEventListener('click', function() {
            editEducation(educationCard);
        });
        educationCard.querySelector('.delete-btn').addEventListener('click', function() {
            educationCard.remove();
        });
    }
});

// Function to edit an existing education entry
function editEducation(educationCard) {
    const titleElement = educationCard.querySelector('.title');
    const institutionElement = educationCard.querySelector('.stacks:nth-child(2)');
    const yearElement = educationCard.querySelector('.stacks:nth-child(3)');
    const descriptionElement = educationCard.querySelector('.description');

    const newTitle = prompt('Edit Education Title:', titleElement.textContent);
    const newInstitution = prompt('Edit Institution Name:', institutionElement.textContent);
    const newYear = prompt('Edit Year(s):', yearElement.textContent);
    const newDescription = prompt('Edit Description:', descriptionElement.textContent);

    if (newTitle) titleElement.textContent = newTitle;
    if (newInstitution) institutionElement.textContent = newInstitution;
    if (newYear) yearElement.textContent = newYear;
    if (newDescription) descriptionElement.textContent = newDescription;
}

// Optional: Add functionality to existing education cards
document.querySelectorAll('.education').forEach(card => {
    card.querySelector('.delete-btn').addEventListener('click', function() {
        card.remove();
    });
    card.querySelector('.edit-btn').addEventListener('click', function() {
        editEducation(card);
    });
});
