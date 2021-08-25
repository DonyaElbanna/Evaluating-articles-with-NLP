import axios from 'axios';

export async function submitForm(event) {
    event.preventDefault()

    const Eval = document.getElementById('evaluating');
    const agr = document.getElementById('agreement');
    const subj = document.getElementById('subjectivity');
    const conf = document.getElementById('confidence');
    const irony = document.getElementById('irony');

    //resetting values after every submit
    agr.innerHTML = ''
    subj.innerHTML = ''
    conf.innerHTML = ''
    irony.innerHTML = ''

    let url = document.getElementById('form').value

    console.log("::: Form Submitted :::", url)

    Eval.innerHTML = 'Evaluating...'

    const normalize = word => {
        return word.charAt(0) + word.substring(1).toLowerCase();
    }

    if (Client.checkURL(url)) {
        axios.post('http://localhost:8081/add', {url})

            .then((res) => {
                Eval.innerHTML = null
                agr.innerHTML = `Agreement: ${normalize(res.data.agreement)}`
                subj.innerHTML = `Subjectivity: ${normalize(res.data.subjectivity)}`
                conf.innerHTML = `Confidence: ${res.data.confidence}%`
                irony.innerHTML = `Irony: ${normalize(res.data.irony)}`
            })
            .catch((error) => console.log('ERROR: ', error))

    } else {
        Eval.innerHTML = 'Not a valid URL!'
    }
}
