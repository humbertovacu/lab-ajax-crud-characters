const charactersAPI = new APIHandler('http://localhost:8000');

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', function (event) {
      charactersAPI.getFullList()
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('input[name=character-id]').value;
    charactersAPI.getOneRegister(characterId)
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    const characterId = document.querySelector('input[name="character-id-delete"]').value;
    charactersAPI.deleteOneRegister(characterId)
    event.preventDefault();
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    const characterId = document.querySelector('#edit-character-form input[name=chr-id]').value;
    const characterNameEdit = document.querySelector('#edit-character-form input[name=name]').value;
    const characterOccEdit = document.querySelector('#edit-character-form input[name=occupation]').value;
    const characterWeaponEdit = document.querySelector('#edit-character-form input[name=weapon').value;
    let cartoonEdit = document.querySelector('#edit-character-form input[name=cartoon]');
    let cartoonEditCheck = cartoonEdit.checked ? true : false;

    const characterData = {
      name: characterNameEdit,
      occupation: characterOccEdit,
      weapon: characterWeaponEdit,
      cartoon: cartoonEditCheck
    };

    charactersAPI.updateOneRegister(characterId, characterData);

  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    const characterName = document.querySelector('#new-character-form input[name=name]').value;
    const characterOccupation = document.querySelector('#new-character-form input[name=occupation]').value;
    const characterWeapon = document.querySelector('#new-character-form input[name=weapon]').value;
    let characterCartoon = document.querySelector('#new-character-form input[name=cartoon]');
    let characterCartoonCheck = characterCartoon.checked ? true : false; 

    const characterData = {
      name: characterName,
      occupation: characterOccupation,
      weapon: characterWeapon,
      cartoon: characterCartoonCheck
    };

    charactersAPI.createOneRegister(characterData);

  });
});
