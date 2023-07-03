document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      const nameInput = document.getElementById('name');
      const ageInput = document.getElementById('age');
      const placeInput = document.getElementById('place');
      const batchInput = document.getElementById('batch');
      const professionInput = document.getElementById('profession');
  
      const user = {
        name: nameInput.value.trim(),
        age: parseInt(ageInput.value),
        place: placeInput.value.trim(),
        batch_name: batchInput.value,
        profession: professionInput.value
      };
  
      if (!validateUser(user)) {
        return; // Stop processing if validation fails
      }
  
      registerUser(user);
    });
  
    function validateUser(user) {
      if (user.name === '') {
        alert('Please enter a valid name.');
        return false;
      }
  
      if (isNaN(user.age) || user.age <= 0) {
        alert('Please enter a valid age.');
        return false;
      }
  
      if (user.place === '') {
        alert('Please enter a valid place.');
        return false;
      }
  
      if (user.batch_name === '') {
        alert('Please select a valid batch.');
        return false;
      }
  
      if (user.profession === '') {
        alert('Please select a valid profession.');
        return false;
      }
  
      return true; // Validation passed
    }

    function registerUser(user) {
      fetch('https://json-mock-kg62.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(response => {
          if (response.ok) {
            alert('User registered successfully.');
            registrationForm.reset(); // Clear form inputs
          } else {
            throw new Error('User registration failed.');
          }
        })
        .catch(error => {
          console.error('User registration error:', error);
          alert('An error occurred during user registration. Please try again later.');
        });
    }
  });
  