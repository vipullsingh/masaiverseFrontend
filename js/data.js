document.addEventListener('DOMContentLoaded', function() {
    const userDataElement = document.getElementById('userData');
    const sortSelect = document.getElementById('sort');
    const filterSelect = document.getElementById('filter');
    const searchInput = document.getElementById('search');
    const pagination = document.getElementById('pagination');
  
    let currentPage = 1;
    const usersPerPage = 5;
    let totalUsers = 0;
    let userData = [];
    let filteredUsers = [];
  
    // Fetch user data from JSON server
    function fetchUserData() {
      fetch('https://json-mock-kg62.onrender.com/users')
        .then(response => response.json())
        .then(data => {
          userData = data;
          totalUsers = userData.length;
          filteredUsers = [...userData];
          renderUserData();
          renderPagination();
        })
        .catch(error => {
          console.error('Data fetch error:', error);
          alert('An error occurred while fetching user data. Please try again later.');
        });
    }
  
    // Render user data
    function renderUserData() {
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      const usersToShow = filteredUsers.slice(startIndex, endIndex);
  
      if (usersToShow.length === 0) {
        userDataElement.innerHTML = '<p>No users found.</p>';
        return;
      }
  
      userDataElement.innerHTML = usersToShow.map(user => generateUserCard(user)).join('');
      attachDeleteButtonListeners();
    }
  
    // Generate HTML for a user card
    function generateUserCard(user) {
      return `
        <div class="user-card">
          <img src="images/user-placeholder.jpg" alt="User Image">
          <h3>${user.name}</h3>
          <p>Age: ${user.age}</p>
          <p>Place: ${user.place}</p>
          <p>Batch Name: ${user.batch_name}</p>
          <p>Profession: ${user.profession}</p>
          <div class="card-actions">
            <button class="edit-btn" data-id="${user.id}">Edit</button>
            <button class="delete-btn" data-id="${user.id}">Delete</button>
          </div>
        </div>
      `;
    }
  
    // Attach event listeners to delete buttons
    function attachDeleteButtonListeners() {
      const deleteButtons = document.getElementsByClassName('delete-btn');
      Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
          const userId = this.getAttribute('data-id');
          handleDeleteUser(userId);
        });
      });
    }
  
    // Handle delete user
    function handleDeleteUser(userId) {
      fetch(`https://json-mock-kg62.onrender.com/users/${userId}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            // User deleted successfully
            // Remove the user from filteredUsers array
            filteredUsers = filteredUsers.filter(user => user.id !== userId);
            totalUsers--;
            // Re-render the user data and pagination
            renderUserData();
            renderPagination();
          } else {
            throw new Error('Failed to delete user.');
          }
        })
        .catch(error => {
          console.error('Delete user error:', error);
          alert('An error occurred while deleting the user. Please try again later.');
        });
    }
  
    // Render pagination
    function renderPagination() {
      const totalPages = Math.ceil(totalUsers / usersPerPage);
  
      if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
      }
  
      let paginationHTML = '';
  
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'active' : '';
        paginationHTML += `<button class="${isActive}" data-page="${i}">${i}</button>`;
      }
  
      pagination.innerHTML = paginationHTML;
  
      // Add event listener to pagination buttons
      const pageButtons = pagination.querySelectorAll('button');
      pageButtons.forEach(button => {
        button.addEventListener('click', function() {
          currentPage = parseInt(this.dataset.page);
          renderUserData();
          setActiveButton();
        });
      });
  
      setActiveButton();
    }
  
    // Set active button styling
    function setActiveButton() {
      const pageButtons = pagination.querySelectorAll('button');
      pageButtons.forEach(button => {
        button.classList.remove('active');
        if (parseInt(button.dataset.page) === currentPage) {
          button.classList.add('active');
        }
      });
    }
  
    // Handle sorting
    sortSelect.addEventListener('change', function() {
      const sortOrder = this.value;
      filteredUsers.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.age - b.age;
        } else {
          return b.age - a.age;
        }
      });
      currentPage = 1;
      renderUserData();
      renderPagination();
    });
  
    // Handle filtering
    filterSelect.addEventListener('change', function() {
      const professionFilter = this.value;
      if (professionFilter) {
        filteredUsers = userData.filter(user => user.profession === professionFilter);
      } else {
        filteredUsers = [...userData];
      }
      currentPage = 1;
      renderUserData();
      renderPagination();
    });
  
    // Handle searching
    searchInput.addEventListener('input', function() {
      const searchValue = this.value.toLowerCase().trim();
      filteredUsers = userData.filter(user => user.name.toLowerCase().includes(searchValue));
      currentPage = 1;
      renderUserData();
      renderPagination();
    });
  
    // Fetch user data on page load
    fetchUserData();
  });
  