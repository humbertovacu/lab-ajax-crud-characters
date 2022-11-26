class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList () {
    let executed = 'notExecuted';
    if(executed === 'notExecuted') {
    axios.get(`${this.BASE_URL}/characters`)
     .then(data => {
      let charactersContainerOriginal = document.querySelector('div[class=characters-container]');
      let characterCardOriginal = document.querySelector('div[class=character-info]')
      charactersContainerOriginal.removeChild(characterCardOriginal)
      const characters = data.data;
      characters.forEach(character => {
        let charactersContainer = document.querySelector('div[class=characters-container]');
        let characterCard = document.createElement('div')
        characterCard.classList.add("character-info")
        let characterCardId = document.createElement('div');
        characterCardId.classList.add("id")
        let characterCardName = document.createElement('div');
        characterCardName.classList.add("name")
        let characterCardOccupation = document.createElement('div');
        characterCardOccupation.classList.add("occupation");
        let characterCardCartoon = document.createElement('div');
        characterCardCartoon.classList.add("cartoon");
        let characterCardWeapon = document.createElement('div');
        characterCardWeapon.classList.add("weapon");
        characterCardId.innerHTML = `ID: ${character.id}`
        characterCardName.innerHTML = `Name: ${character.name}`;
        characterCardOccupation.innerHTML = `Occupation: ${character.occupation}`;
        characterCardCartoon.innerHTML = `Is a Cartoon? ${character.cartoon}`;
        characterCardWeapon.innerHTML = `Weapon: ${character.weapon}`;
        charactersContainer.appendChild(characterCard)
        characterCard.appendChild(characterCardId)
        characterCard.appendChild(characterCardName)
        characterCard.appendChild(characterCardOccupation)
        characterCard.appendChild(characterCardCartoon)
        characterCard.appendChild(characterCardWeapon)
      })
      executed = 'wasExecuted';
    })}
  }

  getOneRegister (characterId) {
    axios.get(`${this.BASE_URL}/characters/${characterId}`)
    .then(data => {
      const foundCharacter = data.data;
      let characterName = document.querySelector('.name')
      characterName.innerHTML = `Name: ${foundCharacter.name}`
      let characterOccupation = document.querySelector('.occupation')
      characterOccupation.innerHTML = `Occupation: ${foundCharacter.occupation}`
      let characterCartoon = document.querySelector('.cartoon')
      characterCartoon.innerHTML = `Is a Cartoon? ${foundCharacter.cartoon}`
      let characterWeapon = document.querySelector('.weapon')
      characterWeapon.innerHTML = `Weapon: ${foundCharacter.weapon}`
    })
    .catch(err => {
      let idInput = document.querySelector('input[name=character-id]')
      if(err.code === "ERR_BAD_REQUEST") idInput.value = "Character not found"
      else console.log(err)
    })
  }

  createOneRegister (characterData) {
    let newCharacterButton = document.querySelector('#send-data')
    axios.post(`${this.BASE_URL}/characters`, characterData)
    .then(data => {
      newCharacterButton.style.backgroundColor = 'green';
    })
    .catch(err => {
      newCharacterButton.style.backgroundColor = 'red';
    })
  }

  updateOneRegister (characterId, characterData) {
    let updateButton = document.querySelector('#send-data')
    axios.put(`${this.BASE_URL}/characters/${characterId}`, characterData)
    .then(data => {
      updateButton.style.backgroundColor = 'green';
    })
    .catch(err => {
      updateButton.style.backgroundColor = 'red';
    })
  }

  deleteOneRegister (characterId) {
    let deleteButton = document.querySelector('#delete-one')
    axios.delete(`${this.BASE_URL}/characters/${characterId}`)
    .then(()=> {
      deleteButton.style.backgroundColor = 'green';
    })
    .catch(err => {
      deleteButton.style.backgroundColor = 'red';
    })
  }
}
