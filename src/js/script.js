const registrationForm = document.querySelector('.registration');
const registrationNameInput = registrationForm.name;
const registrationButton = document.querySelector('.registration-button');
const editNameButton = document.querySelector('.profile-status-edit');

let userName = '';
let isEdited = false;
let enemy = '';
let hero = '';
let loseCounter = 0;
let winCounter = 0;

registrationButton.addEventListener('click', (e) => {
  e.preventDefault();
  userName = registrationNameInput.value;
  registrationForm.classList.remove('active');
  document.querySelector('.profile').classList.add('active');
  document.querySelectorAll('.profile-status-name').forEach((name) => name.textContent = userName);
  document.querySelector('.cap').classList.add('active');
  document.querySelector('.fight-hero-name').textContent = userName;
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
    document.querySelector('.fight-hero-name').textContent = input.value;

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
const fightPage = document.querySelector('.fight-container');
const logContainer = document.querySelector('.log-container');
const enemyInputs = document.querySelectorAll('.home-container input');
const enemyBtn = document.querySelector('.home-button');

homePageBtn.addEventListener('click', () => {
  homePage.classList.add('active');
  profilePage.classList.remove('active');
  settingsPage.classList.remove('active');
  fightPage.classList.remove('active');
  logContainer.classList.remove('active');
});

profilePageBtn.addEventListener('click', () => {
  profilePage.classList.add('active');
  homePage.classList.remove('active');
  settingsPage.classList.remove('active');
  fightPage.classList.remove('active');
  logContainer.classList.remove('active');
});

settingsPageBtn.addEventListener('click', () => {
  settingsPage.classList.add('active');
  homePage.classList.remove('active');
  profilePage.classList.remove('active');
  fightPage.classList.remove('active');
  logContainer.classList.remove('active');
});

profileButtonHero.addEventListener('click', () => {
  profileHeroes.classList.toggle('active');
});

const heroesArr = profileHeroes.querySelectorAll('img');
heroesArr.forEach((avatar) => {
  avatar.addEventListener('click', () => {
    hero = avatar.src;
    userAvatar.src = hero;
    document.querySelector('.fight-hero img').src = hero;
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
});



const heroHpEl = document.getElementById('hero-hp');
const enemyHpEl = document.getElementById('enemy-hp');
const fightButton = document.getElementById('fight-button');
const resetButton = document.getElementById('reset-button');
const attackInputs = document.querySelectorAll('input[name="hero-attack"]');
const defenceInputs = document.querySelectorAll('input[name="hero-defence"]');
const battleLog = document.getElementById('battle-log');

let heroHp = 5;
let enemyHp = 5;
const maxDamage = 1;

function updateFightButton() {
  const selectedAttack = document.querySelector('input[name="hero-attack"]:checked');
  const selectedDefence = document.querySelectorAll('input[name="hero-defence"]:checked');

  if (selectedAttack && selectedDefence.length === 2) {
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
  if (heroHp <= 0 || enemyHp <= 0) return;
  const heroAttack = document.querySelector('input[name="hero-attack"]:checked').value;
  const heroDefence = Array.from(document.querySelectorAll('input[name="hero-defence"]:checked')).map(el => el.value);
  const enemyActions = getEnemyActions();
  const heroDamage = 0;
  const enemyDamage = 0;


  logAction('--- New round ---', ''); 

if (typeof enemyActions.defence === 'string') {
    if (heroAttack !== enemyActions.defence) {
        enemyHp -= maxDamage;
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)} and applied ${maxDamage} damage.`, 'hero-action');
    } else {
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)}, but the ENEMY protected this area. Damage: 0.`, 'hero-action');
    }
} else {
    
    if (!enemyActions.defence.includes(heroAttack)) {
        enemyHp -= maxDamage;
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)} and applied ${maxDamage} damage.`, 'hero-action');
    } else {
        logAction(`HERO attacked the ENEMY in ${translateZone(heroAttack)}, but the ENEMY protected this area. Damage: 0.`, 'hero-action');
    }
}

const enemyAttacks = Array.isArray(enemyActions.attack) ? enemyActions.attack : [enemyActions.attack];
enemyAttacks.forEach(enemyAttackZone => {
    if (!heroDefence.includes(enemyAttackZone)) {
        heroHp -= maxDamage;
        logAction(`The ENEMY attacked the HERO in ${translateZone(enemyAttackZone)} and applied ${maxDamage} damage.`, 'enemy-action');
    } else {
        logAction(`The ENEMY attacked the HERO in ${translateZone(enemyAttackZone)}, but the HERO protected this area. Damage: 0.`, 'enemy-action');
    }
});

  heroHpEl.textContent = `HP: ${heroHp}`;
  enemyHpEl.textContent = `HP: ${enemyHp}`;
  if (heroHp <= 0) {
      logAction('--- You lost! ---', 'end-game');
      fightButton.disabled = true;
      loseCounter += 1;
      document.querySelector('.profile-status-loses-count').textContent = loseCounter;
  } else if (enemyHp <= 0) {
      logAction('--- You won! ---', 'end-game');
      fightButton.disabled = true;
      winCounter += 1;
      document.querySelector('.profile-status-wins-count').textContent = winCounter;
  }
  attackInputs.forEach(input => input.checked = false);
  defenceInputs.forEach(input => input.checked = false);
  updateFightButton();
}

// function resetFight() 

function translateZone(zone) {
  const translations = {
      'head': 'голову',
      'body': 'тело',
      'legs': 'ноги'
  };
  return translations[zone];
}

fightButton.addEventListener('click', fight);
updateFightButton(); 
