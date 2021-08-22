function submitForm(event) {
    event.preventDefault()

    let url = document.getElementById('form').value
    
    // console.log("::: Form Submitted :::")
    // console.log(url)

    if(checkURL(url)) {
        fetch('http://localhost:8081/test')
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('title').innerHTML = res.title
            document.getElementById('message').innerHTML = res.message
            document.getElementById('time').innerHTML = res.time
    })
    } else {
        document.getElementById('message').innerHTML = 'no messages'
    }

    
}