document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const response = document.getElementById('response').value;

    fetch('https://congenial-funicular-q74v6qxxggq2qw7-3000.app.github.dev', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);  // Verifica la respuesta que recibes
        alert('Response saved: ' + data.message);  // Muestra un mensaje con el resultado
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
