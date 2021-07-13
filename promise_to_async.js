// // Promise
// function loadJson(url) {
//   return fetch(url)
//     .then(response => response.json());
// }

// function loadGithubUser(name) {
//   return fetch(`https://api.github.com/users/${name}`)
//     .then(response => response.json())
// }

// function showAvatar(githubUser) {
//   return new Promise((res, rej) => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       res(githubUser);
//     }, 3000);
//   });
// }

// loadJson('/article/promise-chaining/user.json')
//   .then(user => loadGithubUser(user.name))
//   .then(showAvatar)
//   .then(githubUser => alert(`Finished showing ${githubUser.name}`));


// async
async function showAvatar() {
  // JSON 읽기
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // github 사용자 정보 읽기
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`)
  let githubUser = await githubResponse.json();

  // 아바타 보여주기
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // 3초 대기
  await new Promise((res, rej) => setTimeout(res, 3000));

  img.remove();
  return githubUser;
}

showAvatar();
