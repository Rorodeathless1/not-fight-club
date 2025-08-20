const registrationForm = document.querySelector('.registration');
const registrationNameInput = registrationForm.name;
const registrationButton = document.querySelector('.registration-button');
const editNameButton = document.querySelector('.profile-status-edit');
const profileHeroes = document.querySelector('.profile-person');
const nameContainers =  document.querySelectorAll('.profile-status-name');

const heroesArr = profileHeroes.querySelectorAll('img');
const userAvatar = document.querySelector('#hero-avatar');

const capHeader = document.querySelector('.cap');
const homePageBtn = document.querySelector('.cap-svg-home');
const profilePageBtn = document.querySelector('.cap-svg-profile');
const settingsPageBtn = document.querySelector('.cap-svg-setings');

const pages = document.querySelectorAll('.indentation');
const homePage = document.querySelector('.home');
const profilePage = document.querySelector('.profile');
const settingsPage = document.querySelector('.configure');
const profileButtonHero = document.querySelector('.profile-button-hero');
const fightPage = document.querySelector('.fight-container');
const logContainer = document.querySelector('.log-container');
const enemyInputs = document.querySelectorAll('.home-container input');
const enemyBtn = document.querySelector('.home-button');
const heroAvatar =document.querySelector('.fight-hero img');
const loseContainer = document.querySelector('.profile-status-loses-count');
const winContainer = document.querySelector('.profile-status-wins-count');

const saveName = () => localStorage.setItem('userName-roro', userName);
const saveHero = () => localStorage.setItem('hero-roro', hero);
const getName = () => localStorage.getItem('userName-roro') ? localStorage.getItem('userName-roro') : '';
const getHero = () => localStorage.getItem('hero-roro') ? localStorage.getItem('hero-roro') : heroesArr[0].src;
const getLoseCounter = () => localStorage.getItem('loseCounter-roro') ? +localStorage.getItem('loseCounter-roro') : 0;
const getWinCounter = () => localStorage.getItem('winCounter-roro') ? +localStorage.getItem('winCounter-roro') : 0;

let userName = getName();
let isEdited = false;
let enemy = '';
let hero = getHero();
let loseCounter = getLoseCounter();
let winCounter = getWinCounter();

function checkedRegistration() {
  if (userName) {
    registrationForm.classList.remove('active');
    profilePage.classList.add('active');
    nameContainers.forEach((name) => name.textContent = userName);
    capHeader.classList.add('active');
    userAvatar.src = hero;
    heroAvatar.src = hero;
    loseContainer.textContent = loseCounter;
    winContainer.textContent = winCounter;

  }
}

checkedRegistration();

registrationButton.addEventListener('click', (e) => {
  e.preventDefault();
  userName = registrationNameInput.value;
  registrationForm.classList.remove('active');
  profilePage.classList.add('active');
  nameContainers.forEach((name) => name.textContent = userName);
  capHeader.classList.add('active');
  saveName();
  saveHero();
});

editNameButton.addEventListener('click', () => {
  const input = document.querySelector('.configure-content');
  const nameContainer = document.querySelector('.configure-name');
  if (isEdited && input.value && input.value.trim() !== '') {
    userName = input.value;
    editNameButton.textContent = 'Edit';
    input.classList.remove('active');
    nameContainer.classList.add('active');
    nameContainers.forEach((name) => name.textContent = userName);
    saveName();
    isEdited = false;
  } else if (!isEdited) {
    editNameButton.textContent = 'Save';
    input.value = nameContainer.textContent;
    input.classList.add('active');
    nameContainer.classList.remove('active');

    isEdited = true;
  }
})

homePageBtn.addEventListener('click', () => {
  hidePages();
  homePage.classList.add('active');
});

profilePageBtn.addEventListener('click', () => {
  hidePages();
  profilePage.classList.add('active');
});

settingsPageBtn.addEventListener('click', () => {
  hidePages();
  settingsPage.classList.add('active');
});

function hidePages() {
  pages.forEach((page) => {
    page.classList.remove('active');
  });
}

profileButtonHero.addEventListener('click', () => {
  profileHeroes.classList.toggle('active');
});

heroesArr.forEach((avatar) => {
  avatar.addEventListener('click', () => {
    hero = avatar.src;
    userAvatar.src = hero;
    heroAvatar.src = hero;
    saveHero();
  });
});

enemyBtn.addEventListener('click', () => {
  enemyInputs.forEach((input) => {
  if (input.checked) {
    enemy = input.id;
  } 
});
  homePage.classList.remove('active');
  fightPage.classList.add('active');
  logContainer.classList.add('active');
  document.querySelector('.fight-enemy img').src = `/src/assets/img/${enemy}.jpg`;
  document.querySelector('.fight-enemy-name').textContent = enemy
  resetFight();
});



const heroHpEl = document.getElementById('hero-hp');
const enemyHpEl = document.getElementById('enemy-hp');
const fightButton = document.getElementById('fight-button');
const resetButton = document.getElementById('reset-button');
const attackInputs = document.querySelectorAll('input[name="hero-attack"]');
const defenceInputs = document.querySelectorAll('input[name="hero-defence"]');
const battleLog = document.querySelector('#battle-log');

let heroHp = 5;
let enemyHp = 5;
const damage = 1;

function updateFightButton() {
  const selectedAttack = document.querySelector('input[name="hero-attack"]:checked');
  const selectedDefence = document.querySelectorAll('input[name="hero-defence"]:checked');

  if (selectedAttack && selectedDefence.length === 2  && heroHp> 0 && enemyHp > 0) {
      fightButton.disabled = false;
  } else {
      fightButton.disabled = true;
  }
}

attackInputs.forEach(input => input.addEventListener('change', updateFightButton));
defenceInputs.forEach(input => input.addEventListener('change', updateFightButton));

function logAction(text, className) {
  const li = document.createElement('li');
  li.textContent = text;
  
  if (className) {
      li.classList.add(className);
  }
  
  battleLog.appendChild(li);
  
  battleLog.scrollTop = battleLog.scrollHeight;
}

function getEnemyActions() {
  const zones = ['head', 'body', 'legs'];
  let enemyAttack = [];
  let enemyDefence = [];

  if (enemy === 'ice') {
      enemyAttack = zones[Math.floor(Math.random() * zones.length)];
      const defenceZones = [...zones];
      defenceZones.splice(defenceZones.indexOf(enemyAttack), 1);
      enemyDefence = [...defenceZones]
  } else  {
      enemyDefence = [zones[Math.floor(Math.random() * zones.length)]];
      const attackZones = [...zones];
      attackZones.splice(attackZones.indexOf(enemyDefence[0]), 1);
      enemyAttack = [...attackZones]
  }
  return { attack: enemyAttack, defence: enemyDefence };
}

function fight() {
  if (heroHp === 0 || enemyHp === 0) return;
  const heroAttack = document.querySelector('input[name="hero-attack"]:checked').value;
  const heroDefence = Array.from(document.querySelectorAll('input[name="hero-defence"]:checked')).map(el => el.value);
  const enemyActions = getEnemyActions();

  logAction('--- New round ---', ''); 

if (typeof enemyActions.defence === 'string') {
    if (heroAttack !== enemyActions.defence) {
        enemyHp -= damage;
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)} and applied ${damage} damage.`, 'hero-action');
    } else {
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)}, but the ENEMY protected this area. Damage: 0.`, 'hero-action');
    }
} else {
    
    if (!enemyActions.defence.includes(heroAttack)) {
        enemyHp -= damage;
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)} and applied ${damage} damage.`, 'hero-action');
    } else {
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)}, but the ENEMY protected this area. Damage: 0.`, 'hero-action');
    }
}

const enemyAttacks = Array.isArray(enemyActions.attack) ? enemyActions.attack : [enemyActions.attack];
enemyAttacks.forEach(enemyAttackZone => {
    if (!heroDefence.includes(enemyAttackZone)) {
        heroHp -= damage;
        logAction(`The ENEMY attacked the HERO in ${translateZone(enemyAttackZone)} and applied ${damage} damage.`, 'enemy-action');
    } else {
        logAction(`The ENEMY attacked the HERO in ${translateZone(enemyAttackZone)}, but the HERO protected this area. Damage: 0.`, 'enemy-action');
    }
});

  heroHpEl.textContent = `HP: ${heroHp}`;
  enemyHpEl.textContent = `HP: ${enemyHp}`;
  if (heroHp === 0) {
      logAction('--- You lost! ---', 'end-game');
      loseCounter += 1;
      updateGameStat();
  } else if (enemyHp === 0) {
      logAction('--- You won! ---', 'end-game');
      winCounter += 1;
      updateGameStat();
  }
  resetFightInputs();
}

function resetFightInputs() {
  attackInputs.forEach(input => input.checked = false);
  defenceInputs.forEach(input => input.checked = false);
  updateFightButton();
}

function updateGameStat() {
  loseContainer.textContent = loseCounter;
  winContainer.textContent = winCounter;
  saveGameStat();
}

function saveGameStat() {
  localStorage.setItem('loseCounter-roro', loseCounter);
  localStorage.setItem('winCounter-roro', winCounter);
}

function resetFight() {
  heroHp = 5;
  enemyHp = 5;
  
  heroHpEl.textContent = `HP: ${heroHp}`;
  enemyHpEl.textContent = `HP: ${enemyHp}`;

  battleLog.innerHTML = '';
  
  resetFightInputs();
  
  logAction('--- New game ---', 'end-game');
}

fightButton.addEventListener('click', fight);
resetButton.addEventListener('click', resetFight);