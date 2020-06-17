export function dataFetch(text) {
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8081/evaluate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(text)
            })
            .then(res => res.json())
            .then(function (res) {
                

                 if (res.err === true) {
                     reject(res.data);
                 } else {
                    resolve(
                    `
                            Polarity: ${res.polarity} <br>
                            Subjectivity: ${res.subjectivity} <br>
                            Polarity confidence: ${(Math.round((res.polarity_confidence)*100)/100) * 100}% <br>
                            Subjectivity confidence: ${(Math.round((res.subjectivity_confidence)*100)/100) * 100}%
                        `
                    )
                   }







            })
            .catch(e => {
                reject({
                    'err': true,
                    'data': 'server is unavailable'
                });

            })
    })
    
}