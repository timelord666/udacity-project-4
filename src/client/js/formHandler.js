export function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    formText = {
        'article': formText
    }
    //Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    fetch('http://localhost:8081/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formText)
    })
    .then(res => res.json())
    .then(function(res) {
        if (res.err) {
            document.getElementById('results').innerHTML = res.data;
        } else {
            document.getElementById('results').innerHTML = `
            Polarity: ${res.polarity} <br>
            Subjectivity: ${res.subjectivity} <br>
            Polarity confidence: ${(Math.round((res.polarity_confidence)*100)/100) * 100}% <br>
            Subjectivity confidence: ${(Math.round((res.subjectivity_confidence)*100)/100) * 100}%
        `;
        }
            
            
        


        
        
    })
    .catch(e => {
        console.log(e);
        
    })
}

