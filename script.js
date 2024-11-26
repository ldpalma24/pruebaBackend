const apiUrl = "https://prueba-backend-roan.vercel.app/api/survey"; 

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const response = document.getElementById('response').value;

    fetch(apiUrl, {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),  
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Response saved: ' + data.message);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
