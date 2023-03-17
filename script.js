const searchBtn = document.querySelector('.btn');
const search = document.querySelector('.search');
const resultList = document.querySelector('.result-list');

async function getData() {
  if (document.getElementsByClassName('result-item').length != 0) {
    let els = document.getElementsByClassName('result-item');
    Array.from(els).forEach((el) => el.remove());
  }

  if (search.value.length < 4) {
    createErrorMassage("Please, enter a few more characters. Otherwise, I'm afraid the results will be enormous");
    return;
  }

  // const regexp = /A-Za-z0-9-_/g;
  //const requestURL = `https://api.github.com/search/repositories?q=${search.value}+name:${search.value}&sort=stars&order=desc&per_page=10`;
  const requestURL = `https://api.github.com/search/repositories?q=${search.value}+in:name&sort=stars&order=desc&per_page=10`;

  try {
    const response = await fetch(requestURL);
    let result = await response.json();
    let currentArr = result.items;

    if (currentArr.length == 0) {
      createErrorMassage("Sorry, we couldn't find anything");
      return;
    }

    currentArr.forEach((el) => {
      createItemContent(el);
    });
  } catch (error) {
    createErrorMassage('Sorry, it was a hard day for our server. It tired, but will wake up soon');
  }
}

function createItemContent(data) {
  const resultItem = document.createElement('li');
  resultItem.className = 'result-item';
  resultList.append(resultItem);

  const resultLink = document.createElement('a');
  resultLink.className = 'repo-link';
  resultLink.textContent = data.name;
  resultLink.setAttribute('href', data.html_url);
  resultLink.setAttribute('target', '_blank');
  resultItem.append(resultLink);

  const owner = document.createElement('p');
  owner.className = 'repo-author';
  owner.textContent = data.owner.login;
  resultItem.append(owner);

  const updDate = document.createElement('p');
  updDate.className = 'repo-update';
  updDate.textContent = data.updated_at.substr(0, 10);
  resultItem.append(updDate);
}

function createErrorMassage(string) {
  const resultItem = document.createElement('li');
  resultItem.className = 'result-item';
  resultItem.textContent = string;
  resultList.append(resultItem);
}

searchBtn.addEventListener('click', getData);
document.addEventListener('keydown', function (e) {
  if (e.code === 'Enter') {
    getData();
  }
});
