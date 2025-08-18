const registrationForm = document.querySelector('.registration');
const registrationNameInput = registrationForm.name;
const registrationButton = document.querySelector('.registration-button');
const editNameButton = document.querySelector('.profile-status-edit');

let userName = '';
let isEdited = false;

registrationButton.addEventListener('click', (e) => {
  e.preventDefault();
  userName = registrationNameInput.value;
  registrationForm.classList.remove('active');
  document.querySelector('.profile').classList.add('active');
  document.querySelectorAll('.profile-status-name').forEach((name) => name.textContent = userName);
  document.querySelector('.cap').classList.add('active');
});

editNameButton.addEventListener('click', () => {
  const input = document.querySelector('.configure-content');
  const nameContainers = document.querySelectorAll('.profile-status-name');
  const nameContainer = document.querySelector('.configure-name');
  if (isEdited && input.value && input.value.trim() !== '') {
    editNameButton.textContent = 'Edit';
    input.classList.remove('active');
    nameContainer.classList.add('active');
    nameContainers.forEach((name) => name.textContent = input.value);
    isEdited = false;

  } else if (!isEdited) {
    editNameButton.textContent = 'Save';
    input.value = nameContainer.textContent;
    input.classList.add('active');
    nameContainer.classList.remove('active');

    isEdited = true;
  }
})

const homePage = document.querySelector('.cap-svg-home');
const profilePage = document.querySelector('.cap-svg-profile');
const settingsPage = document.querySelector('.cap-svg-setings');


homePage.addEventListener('click', () => {
  homePage.classList.add('active');
  profilePage.classList.remove('active');
  settingsPage.classList.remove('active');
  document.querySelector('.home').classList.add('active');
  document.querySelector('.profile').classList.remove('active');
  document.querySelector('.configure').classList.remove('active');
});

profilePage.addEventListener('click', () => {
  profilePage.classList.add('active');
  homePage.classList.remove('active');
  settingsPage.classList.remove('active');
  document.querySelector('.profile').classList.add('active');
  document.querySelector('.home').classList.remove('active');
  document.querySelector('.configure').classList.remove('active');
});

settingsPage.addEventListener('click', () => {
  settingsPage.classList.add('active');
  homePage.classList.remove('active');
  profilePage.classList.remove('active');
  document.querySelector('.configure').classList.add('active');
  document.querySelector('.home').classList.remove('active');
  document.querySelector('.profile').classList.remove('active');
});


const profileButtonHero = document.querySelector('.profile-button-hero');
const profileHeroes = document.querySelector('.profile-person');
const userAvatar = document.querySelector('#hero-avatar');

profileButtonHero.addEventListener('click', () => {
  profileHeroes.classList.toggle('active');
});

  const heroesArr = profileHeroes.querySelectorAll('img');

  heroesArr.forEach((hero) => {
    hero.addEventListener('click', () => {
      userAvatar.src = hero.src;
    });
  });
