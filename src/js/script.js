const registrationForm = document.querySelector('.registration');
const registrationNameInput = registrationForm.name;
const registrationButton = document.querySelector('.registration-button');

let userName = '';

registrationButton.addEventListener('click', (e) => {
  e.preventDefault();
  userName = registrationNameInput.value;
  registrationForm.classList.remove('active');
  document.querySelector('.profile').classList.add('active');
  document.querySelector('.profile-status-name').textContent = userName;
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