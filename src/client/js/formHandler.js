export  function handleSubmit(event) {
    event.preventDefault()
    const api = require('./api');
    
    
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    formText = {
        'article': formText
    }
    



    

      api.dataFetch(formText)
        .then(data => {
           
            
            document.getElementById('results').innerHTML = data;
        })
        .catch(err => {
            document.getElementById('results').innerHTML = err;
        })                                        


}

