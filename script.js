document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const response = document.getElementById('response').value;

    fetch('http://localhost:3000/api/survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});