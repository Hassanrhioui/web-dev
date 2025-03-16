// Fetch and display trainers
const fetchTrainers = async () => {
    try {
        const response = await fetch('http://localhost:3000/trainers');
        const trainers = await response.json();
        const trainersList = document.getElementById('trainersList');
        trainersList.innerHTML = '';

        trainers.forEach(trainer => {
            const trainerItem = document.createElement('div');
            trainerItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            trainerItem.innerHTML = `
                <div>
                    <h5>${trainer.title}</h5>
                    <p>${trainer.description}</p>
                    <small>Rating: ${trainer.rating}</small>
                </div>
                <div>
                    <button class="btn btn-danger btn-sm me-2" onclick="deleteTrainer(${trainer.id})">Delete</button>
                    <button class="btn btn-warning btn-sm" onclick="openUpdateForm(${trainer.id})">Update</button>
                </div>
                <div id="updateForm-${trainer.id}" class="update-form mt-3" style="display: none;">
                    <form onsubmit="updateTrainer(event, ${trainer.id})">
                        <div class="mb-3">
                            <label for="updateTitle-${trainer.id}" class="form-label">Name</label>
                            <input type="text" class="form-control" id="updateTitle-${trainer.id}" value="${trainer.title}" required>
                        </div>
                        <div class="mb-3">
                            <label for="updateDescription-${trainer.id}" class="form-label">Specialization</label>
                            <textarea class="form-control" id="updateDescription-${trainer.id}" rows="3" required>${trainer.description}</textarea>
                        </div>
                        <div class="mb-3">
                            <label for="updateRating-${trainer.id}" class="form-label">Rating (0-5)</label>
                            <input type="number" class="form-control" id="updateRating-${trainer.id}" value="${trainer.rating}" min="0" max="5" step="0.1" required>
                        </div>
                        <button type="submit" class="btn btn-warning btn-sm">Save Changes</button>
                    </form>
                </div>
            `;
            trainersList.appendChild(trainerItem);
        });
    } catch (error) {
        console.error('Error fetching trainers:', error);
    }
};

// Add a new trainer
document.getElementById('addTrainerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const rating = parseFloat(document.getElementById('rating').value);

    try {
        const response = await fetch('http://localhost:3000/trainers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, rating }),
        });

        if (response.ok) {
            alert('Trainer added successfully!');
            fetchTrainers(); // Refresh the trainers list
            document.getElementById('addTrainerForm').reset(); // Clear the form
        } else {
            alert('Failed to add trainer.');
        }
    } catch (error) {
        console.error('Error adding trainer:', error);
    }
});

// Delete a trainer
const deleteTrainer = async (id) => {
    if (confirm('Are you sure you want to delete this trainer?')) {
        try {
            const response = await fetch(`http://localhost:3000/trainers/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Trainer deleted successfully!');
                fetchTrainers(); // Refresh the trainers list
            } else {
                alert('Failed to delete trainer.');
            }
        } catch (error) {
            console.error('Error deleting trainer:', error);
        }
    }
};

// Open Update Form
const openUpdateForm = (id) => {
    const updateForm = document.getElementById(`updateForm-${id}`);
    updateForm.style.display = updateForm.style.display === 'block' ? 'none' : 'block';
};

// Update a trainer
const updateTrainer = async (e, id) => {
    e.preventDefault();
    const title = document.getElementById(`updateTitle-${id}`).value;
    const description = document.getElementById(`updateDescription-${id}`).value;
    const rating = parseFloat(document.getElementById(`updateRating-${id}`).value);

    try {
        const response = await fetch(`http://localhost:3000/trainers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, rating }),
        });

        if (response.ok) {
            alert('Trainer updated successfully!');
            fetchTrainers(); // Refresh the trainers list
        } else {
            alert('Failed to update trainer.');
        }
    } catch (error) {
        console.error('Error updating trainer:', error);
    }
};

// Load trainers on page load
window.onload = fetchTrainers;