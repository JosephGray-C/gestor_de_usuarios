document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reasonModal").style.display = "none";
});

let selectedVacationId = null;
let selectedUserId = null;
let selectedAction = "";

function openModal(vacationId, userId, action) {
    selectedVacationId = vacationId;
    selectedUserId = userId;
    selectedAction = action;

    // Update modal title dynamically
    document.getElementById("modalTitle").innerText = `Motivo para ${action}`;

    // Show modal
    document.getElementById("reasonModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("reasonModal").style.display = "none";
}

function sendApproval() {
    let reason = document.getElementById("reasonText").value.trim();
    
    if (!reason) {
        alert("Please enter a reason.");
        return;
    }

    fetch(`vacaciones/${selectedAction.toLowerCase()}/${selectedVacationId}/${selectedUserId}/${reason}`, {
        method: "POST"
    })
    .then(response => {
        if (response.ok) {
            window.location.reload(); // Refresh the page to re-render `vacaciones`
        } else {
            console.error("Failed to accept vacation");
        }
    })
    .catch(error => console.error("Error:", error));
}