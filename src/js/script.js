const registrationForm = document.querySelector('.registration');
const registrationNameInput = registrationForm.name;
const registrationButton = document.querySelector('.registration-button');
const editNameButton = document.querySelector('.profile-status-edit');

let userName = '';
let isEdited = false;
let enemy = '';

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

const homePageBtn = document.querySelector('.cap-svg-home');
const profilePageBtn = document.querySelector('.cap-svg-profile');
const settingsPageBtn = document.querySelector('.cap-svg-setings');

const homePage = document.querySelector('.home');
const profilePage = document.querySelector('.profile');
const settingsPage = document.querySelector('.configure');
const profileButtonHero = document.querySelector('.profile-button-hero');
const profileHeroes = document.querySelector('.profile-person');
const userAvatar = document.querySelector('#hero-avatar');
const fightPage = document.querySelector('.fight');
const enemyInputs = document.querySelectorAll('.home-container input');
const enemyBtn = document.querySelector('.home-button');

homePageBtn.addEventListener('click', () => {
  homePage.classList.add('active');
  profilePage.classList.remove('active');
  settingsPage.classList.remove('active');
  fightPage.classList.remove('active');
});

profilePageBtn.addEventListener('click', () => {
  profilePage.classList.add('active');
  homePage.classList.remove('active');
  settingsPage.classList.remove('active');
  fightPage.classList.remove('active');
});

settingsPageBtn.addEventListener('click', () => {
  settingsPage.classList.add('active');
  homePage.classList.remove('active');
  profilePage.classList.remove('active');
  fightPage.classList.remove('active');
});

profileButtonHero.addEventListener('click', () => {
  profileHeroes.classList.toggle('active');
});

const heroesArr = profileHeroes.querySelectorAll('img');
heroesArr.forEach((hero) => {
  hero.addEventListener('click', () => {
    userAvatar.src = hero.src;
  });
});

enemyInputs.forEach((input) => {
  input.addEventListener('click', () => {
    enemy = `/src/assets/img/${input.id}.jpg`;
  });
});

enemyBtn.addEventListener('click', () => {
  homePage.classList.remove('active');
  fightPage.classList.add('active');
});

