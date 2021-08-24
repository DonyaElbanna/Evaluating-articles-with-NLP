
import axios from 'axios';

// const scoreEl = document.getElementById('title');
// const subjectivityEl = document.getElementById('message');
// const ironyEl = document.getElementById('time');

async function submitForm(event) {
    event.preventDefault()

    // scoreEl.innerHTML = '';
    // subjectivityEl.innerHTML = '';
    // ironyEl.innerHTML = '';

    let url = document.getElementById('form').value
    
    console.log("::: Form Submitted :::")
    console.log(url)

    if(Client.checkURL(url)) {
        // fetch('http://localhost:8081/test')
        axios
        .post('http://localhost:8081/add', {url})

        // .then(res => res.json())
        // .then(res =>  res.data
        // )
        .then((res) => {
            document.getElementById('title').innerHTML = res.data.score_tag
            document.getElementById('message').innerHTML = res.data.subjectivity
            document.getElementById('time').innerHTML = res.data.irony
    })
    // .catch((error)=> console.log('ERROR: ', error))
    } else {
        document.getElementById('title').innerHTML = null
        document.getElementById('message').innerHTML = 'no messages'
        document.getElementById('time').innerHTML = null

    }

    
}

// const updateUI = (res) => {

//     // clear error msg
//     // errorEl.innerHTML = '';
//     // errorEl.classList.remove('error');

//     // insert API results
//     scoreEl.innerHTML = `Sentiment Score: ${res.score_tag}`;
//     subjectivityEl.innerHTML = `Subjectivity: ${res.subjectivity}`;
//     ironyEl.innerHTML = `Irony: ${res.irony}`;
// }

export { submitForm }