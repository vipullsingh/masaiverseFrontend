// Function to fetch user data from JSON server
async function getUsers() {
    try {
      const response = await fetch('https://json-mock-kg62.onrender.com/users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }
  
  // Function to display user data
  function displayUserData(users) {
    const userDataContainer = document.getElementById('userData');
    userDataContainer.innerHTML = '';
  
    users.forEach((user) => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');
  
      const userImage = document.createElement('img');
      userImage.src = 'path/to/dummy/image.jpg';
      userImage.alt = 'User Image';
      userCard.appendChild(userImage);
  
      const userName = document.createElement('h3');
      userName.textContent = user.name;
      userCard.appendChild(userName);
  
      const userAge = document.createElement('p');
      userAge.textContent = `Age: ${user.age}`;
      userCard.appendChild(userAge);
  
      const userPlace = document.createElement('p');
      userPlace.textContent = `Place: ${user.place}`;
      userCard.appendChild(userPlace);
  
      const userBatch = document.createElement('p');
      userBatch.textContent = `Batch: ${user.batch_name}`;
      userCard.appendChild(userBatch);
  
      const userProfession = document.createElement('p');
      userProfession.textContent = `Profession: ${user.profession}`;
      userCard.appendChild(userProfession);
  
      const editIcon = document.createElement('i');
      editIcon.classList.add('fas', 'fa-edit');
      editIcon.addEventListener('click', () => {
        // Handle edit functionality
        // Open modal to edit user details
      });
      userCard.appendChild(editIcon);
  
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('fas', 'fa-trash');
      deleteIcon.addEventListener('click', async () => {
        try {
          const response = await fetch(`https://json-mock-kg62.onrender.com/users/${user.id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            // User deleted successfully
            userCard.remove();
          } else {
            throw new Error('Unable to delete user');
          }
        } catch (error) {
          console.log('Error deleting user:', error);
        }
      });
      userCard.appendChild(deleteIcon);
  
      userDataContainer.appendChild(userCard);
    });
  }
  
  // Function to sort user data by age
  function sortUserData(users, sortOrder) {
    const sortedUsers = [...users];
  
    if (sortOrder === 'asc') {
      sortedUsers.sort((a, b) => a.age - b.age);
    } else if (sortOrder === 'desc') {
      sortedUsers.sort((a, b) => b.age - a.age);
    }
  
    return sortedUsers;
  }
  
  // Function to filter user data by profession
  function filterUserData(users, profession) {
    if (!profession) {
      return users;
    }
  
    const filteredUsers = users.filter((user) => user.profession === profession);
    return filteredUsers;
  }
  
  // Function to search user data by name
  function searchUserData(users, searchValue) {
    if (!searchValue) {
      return users;
    }
  
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return filteredUsers;
  }
  
  // Function to calculate the average age of users
  function calculateAverageAge(users) {
    const totalUsers = users.length;
    const totalAge = users.reduce((sum, user) => sum + user.age, 0);
    const averageAge = totalAge / totalUsers;
    return averageAge.toFixed(2);
  }
  
  // Function to handle pagination
  function handlePagination(users, currentPage, usersPerPage) {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);
    return paginatedUsers;
  }
  
  // Function to display pagination buttons
  function displayPaginationButtons(totalUsers, usersPerPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';
  
    const totalPages = Math.ceil(totalUsers / usersPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.addEventListener('click', () => {
        currentPage = i;
        displayUserData(handlePagination(users, currentPage, usersPerPage));
      });
      paginationContainer.appendChild(button);
    }
  }
  
  // Function to handle form submission
  async function handleFormSubmit(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const place = document.getElementById('place').value;
    const batchName = document.getElementById('batchName').value;
    const profession = document.getElementById('profession').value;
  
    const userData = {
      name,
      age: parseInt(age),
      place,
      batch_name: batchName,
      profession,
    };
  
    try {
      const response = await fetch('https://json-mock-kg62.onrender.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        alert('Successfully registered');
        document.getElementById('registrationForm').reset();
        const userData = await getUsers();
        displayUserData(userData);
      } else {
        throw new Error('Unable to register user');
      }
    } catch (error) {
      console.log('Error registering user:', error);
    }
  }
  
  // Function to initialize the Masaiverse application
  async function init() {
    // Fetch user data from JSON server
    const userData = await getUsers();
    const totalUsers = userData.length;
  
    // Set default values for sorting, filtering, and pagination
    let sortOrder = 'asc';
    let professionFilter = '';
    let searchValue = '';
    let currentPage = 1;
    const usersPerPage = 5;
  
    // Display user data and pagination on initial load
    displayUserData(handlePagination(userData, currentPage, usersPerPage));
    displayPaginationButtons(totalUsers, usersPerPage);
  
    // Get form element and add event listener for form submission
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', handleFormSubmit);
  
    // Get sort select element and add event listener for sorting
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', () => {
      sortOrder = sortSelect.value;
      const sortedUserData = sortUserData(userData, sortOrder);
      displayUserData(handlePagination(sortedUserData, currentPage, usersPerPage));
    });
  
    // Get profession filter select element and add event listener for filtering
    const professionFilterSelect = document.getElementById('professionFilterSelect');
    professionFilterSelect.addEventListener('change', () => {
      professionFilter = professionFilterSelect.value;
      const filteredUserData = filterUserData(userData, professionFilter);
      displayUserData(handlePagination(filteredUserData, currentPage, usersPerPage));
    });
  
    // Get search input element and add event listener for searching
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      searchValue = searchInput.value;
      const searchedUserData = searchUserData(userData, searchValue);
      displayUserData(handlePagination(searchedUserData, currentPage, usersPerPage));
    });
  }
  
  // Call the init function to start the Masaiverse application
  init();
  




  