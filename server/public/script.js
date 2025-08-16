const form = document.getElementById("userForm");
const messageDiv = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Creating Account...";
  messageDiv.textContent = "";
  messageDiv.className = "message";

  const formData = new FormData(form);
  const userData = {
    username: formData.get("username"),
    email: formData.get("email"),
    dob: formData.get("dob"),
  };

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (response.ok) {
      messageDiv.textContent =
        result.message || "Account created successfully!";
      messageDiv.className = "message success";
      form.reset();
    } else {
      let errorMessage = result.error || "An error occurred";

      if (result.details && Array.isArray(result.details)) {
        errorMessage += ": " + result.details.join(", ");
      } else if (result.field) {
        errorMessage = `${result.field} already exists`;
      }

      messageDiv.textContent = errorMessage;
      messageDiv.className = "message error";
    }
  } catch (error) {
    console.error("Error:", error);
    messageDiv.textContent = "Network error. Please try again.";
    messageDiv.className = "message error";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Create Account";
  }
});
