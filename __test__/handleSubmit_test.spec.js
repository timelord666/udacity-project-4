describe('Handle submit function', () => {
    jest.mock('../src/client/js/api');
    test('It should do something', () => {
        
        document.body.innerHTML = `
        <form class="" onsubmit="return handleSubmit(event)">
            <label for="input">Insert article</label>
            <input id="name" type="text" name="input" value="test text" onblur="onBlur()" placeholder="Article">
            <input id="btn" type="submit" name="" value="submit"   onsubmit="return handleSubmit(event)">
        </form>
        <section>
            <strong>Form Results:</strong>
            <div id="results"></div>
        </section>
        `;
        //require('../dist/main.js');
        const $ = require('jquery');
        const apiFetch = require('../src/client/js/api');
        require('../src/client/js/formHandler.js');
        const handler = require('../src/client/js/formHandler.js');

        $('#btn').click(event => {
            handler.handleSubmit(event);
        })


        apiFetch.dataFetch.mockImplementation( () => {
           return new Promise((resolve, reject) => {
               resolve({
                   "polarity": "positive",
                   "subjectivity": "subjective",
                   "text": "John is a very good football player",
                   "polarity_confidence": 0.9999936601153382,
                   "subjectivity_confidence": 0.9963778207617525
               })
           }) 
        })


        $('#btn').click();


        expect(apiFetch.dataFetch).toBeCalled();
        //expect($('#results').text()).toEqual('Polarity: positive <br> Subjectivity: subjective <br> Polarity confidence: 99% <br> Subjectivity confidence: 99%');

    })
})