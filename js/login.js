document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Perform login request using AJAX or fetch
      // Example using fetch:
      fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          // Successful login, redirect to data.html
          window.location.href = 'data.html';
        } else {
          // Invalid login, show error message
          alert('Invalid credentials. Please try again.');
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        alert('An error occurred while logging in. Please try again later.');
      });
    });
  });
  