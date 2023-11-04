document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      validateUser(username, password);
    });
  
  
    function validateUser(username, password) {
      fetch('users.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then((data) => {
          if (data.success) {
            alert('Connexion réussie!');
          } else {
            alert('Nom d’utilisateur ou mot de passe incorrect!');
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          alert("Erreur lors de la connexion. Veuillez réessayer plus tard.");
        });
    }
  });
  