  // Function to handle button click for user section
  function goToUserSection() {
    window.location.href = 'user.html';
  }
  
  // Function to handle button click for admin section
  function goToAdminSection() {
    window.location.href = 'login.html';
  }
  
  // Get the user and admin buttons
  const userButton = document.getElementById('userButton');
  const adminButton = document.getElementById('adminButton');
  
  // Add event listeners to the buttons
  userButton.addEventListener('click', function(){
    window.location.href = 'user.html'
  });
  adminButton.addEventListener('click', function(){
    window.location.href = 'admin.html'
  });