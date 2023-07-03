document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Get form input values
      const nameInput = document.getElementById('name');
      const ageInput = document.getElementById('age');
      const placeInput = document.getElementById('place');
      const batchInput = document.getElementById('batch');
      const professionInput = document.getElementById('profession');
  
      // Create user object with form input values
      const user = {
        name: nameInput.value.trim(),
        age: parseInt(ageInput.value),
        place: placeInput.value.trim(),
        batch_name: batchInput.value,
        profession: professionInput.value
      };
  
      // Validate user input
      if (!validateUser(user)) {
        return; // Stop processing if validation fails
      }
  
      // Perform user registration (replace with your own logic)
      registerUser(user);
    });
  
    // Function to validate user input
    function validateUser(user) {
      // Validate name
      if (user.name === '') {
        alert('Please enter a valid name.');
        return false;
      }
  
      // Validate age
      if (isNaN(user.age) || user.age <= 0) {
        alert('Please enter a valid age.');
        return false;
      }
  
      // Validate place
      if (user.place === '') {
        alert('Please enter a valid place.');
        return false;
      }
  
      // Validate batch
      if (user.batch_name === '') {
        alert('Please select a valid batch.');
        return false;
      }
  
      // Validate profession
      if (user.profession === '') {
        alert('Please select a valid profession.');
        return false;
      }
  
      return true; // Validation passed
    }
  
    // Function to perform user registration (replace with your own logic)
    function registerUser(user) {
      // You can perform AJAX request to submit the user data to the server
      // For example:
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
  