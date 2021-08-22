function submitForm(event) {
    event.preventDefault()

    let formText = document.getElementById('form').value
    checkURL(formText)

    console.log("::: Form Submitted :::")
    console.log(formText)
    document.getElementById('result').innerHTML = formText
    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
}