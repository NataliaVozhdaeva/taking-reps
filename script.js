const searchBtn = document.querySelector('.btn');
const resultLink = document.querySelectorAll('.repo-link');
const owner = document.querySelectorAll('.repo-author');
const updDate = document.querySelectorAll('.repo-update');

async function getData() {
  const requestURL = 'https://api.github.com/search/repositories?q=tetris&sort=stars&order=desc&per_page=10';

  try {
    const response = await fetch(requestURL);
    let result = await response.json();
    let currentArr = result.items;
    console.log(currentArr);

    currentArr.forEach((el, index) => {
      createItemContent(el, index);
    });
  } catch (error) {
    console.log('error');
    return;
  }
}

function createItemContent(data, index) {
  resultLink[index].textContent = data.name;
  resultLink[index].setAttribute('href', data.html_url);
  owner[index].textContent = data.owner.login;
  updDate[index].textContent = data.updated_at.substr(0, 10);
}

searchBtn.addEventListener('click', getData);
