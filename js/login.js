// document.addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.getElementById('loginForm');
  
//     loginForm.addEventListener('submit', function(event) {
//       event.preventDefault();
  
//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;
  
//       fetch('https://reqres.in/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password
//         })
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.token) {
//           window.location.href = 'data.html';
//         } else {
//           alert('Invalid credentials. Please try again.');
//         }
//       })
//       .catch(error => {
//         console.error('Login error:', error);
//         alert('An error occurred while logging in. Please try again later.');
//       });
//     });
//   });
  
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      login({ email, password });
    });
  });
  
  async function login(data) {
    try {
      let response = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...data })
      });
  
      let token = await response.json();
      if (token.token) {
        localStorage.setItem("token", JSON.stringify(token.token));
        alert("Login successful");
        window.location.href = "./data.html";
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in. Please try again later.');
    }
  }
  