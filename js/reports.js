document.addEventListener('DOMContentLoaded', function() {
    const totalGuestsElement = document.getElementById('totalGuests');
    const studentsAttendingElement = document.getElementById('studentsAttending');
    const professionalsAttendingElement = document.getElementById('professionalsAttending');
    const averageAgeElement = document.getElementById('averageAge');
  
    // Fetch event data from the server
    function fetchEventData() {
      fetch('https://json-mock-kg62.onrender.com/users')
        .then(response => response.json())
        .then(data => {
          calculateReports(data);
        })
        .catch(error => {
          console.error('Data fetch error:', error);
          alert('An error occurred while fetching event data. Please try again later.');
        });
    }
  
    // Calculate and display the reports
    function calculateReports(eventData) {
      const totalGuests = eventData.length;
      const studentsAttending = eventData.filter(event => event.profession === 'Student').length;
      const professionalsAttending = totalGuests - studentsAttending;
  
      const totalAge = eventData.reduce((sum, event) => sum + event.age, 0);
      const averageAge = totalAge / totalGuests;
  
      totalGuestsElement.textContent = totalGuests;
      studentsAttendingElement.textContent = studentsAttending;
      professionalsAttendingElement.textContent = professionalsAttending;
      averageAgeElement.textContent = averageAge.toFixed(2);
    }
  
    // Initialize the reports
    fetchEventData();
  });
  