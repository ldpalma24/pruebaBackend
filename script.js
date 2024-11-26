document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const response = document.getElementById('response').value;

    fetch('https://congenial-funicular-q74v6qxxggq2qw7-3000.app.github.dev/api/survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: "sí" }),  // Puedes probar con "sí" o "no"
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    })
