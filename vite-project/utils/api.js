const cookie = document.getElementById('cookie').value;
const token = document.getElementById('token').value;

document.getElementById('submitButton').addEventListener('click', fetch);

async function fetch() {
  //   try {
  //     let response = await fetch(
  //       'https://www.seaofthieves.com/api/profilev2/reputation',
  //       {
  //         method: 'GET',
  //         headers: {
  //           cookie: cookie,
  //           'x-csrf-token': token,
  //           referer: 'https://www.seaofthieves.com/',
  //         },
  //       }
  //     );
  //     let data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     alert('Error caught: check console');
  //     console.error(error);
  //   }
}
