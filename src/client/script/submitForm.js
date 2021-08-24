import axios from 'axios';

export async function submitForm(event) {
    event.preventDefault()

    //resetting values after every submit
    document.getElementById('agreement').innerHTML = ''
    document.getElementById('subjectivity').innerHTML = ''
    document.getElementById('confidence').innerHTML = ''
    document.getElementById('irony').innerHTML = ''

    let url = document.getElementById('form').value

    console.log("::: Form Submitted :::", url)

    document.getElementById('evaluating').innerHTML = 'Evaluating...'

    const normalize = word => {
        return word.charAt(0) + word.substring(1).toLowerCase();
    }

    if (Client.checkURL(url)) {
        axios.post('http://localhost:8081/add', {
            url: url,
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then((res) => {
                document.getElementById('evaluating').innerHTML = null
                document.getElementById('agreement').innerHTML = `Agreement: ${normalize(res.data.agreement)}`
                document.getElementById('subjectivity').innerHTML = `Subjectivity: ${normalize(res.data.subjectivity)}`
                document.getElementById('confidence').innerHTML = `Confidence: ${res.data.confidence}%`
                document.getElementById('irony').innerHTML = `Irony: ${normalize(res.data.irony)}`
            })
            .catch((error) => console.log('ERROR: ', error))

    } else {
        document.getElementById('evaluating').innerHTML = 'Not a valid URL!'
    }
}
