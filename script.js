document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorBox = document.getElementById("error");

  errorBox.textContent = "";

  if (username.length < 3) {
    errorBox.textContent = "Username must be at least 3 characters.";
    return;
  }
  if (!email.includes("@")) {
    errorBox.textContent = "Enter a valid email.";
    return;
  }
  if (password.length < 6) {
    errorBox.textContent = "Password must be at least 6 characters.";
    return;
  }
  if (password !== confirmPassword) {
    errorBox.textContent = "Passwords do not match.";
    return;
  }

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message);
    } else {
      errorBox.textContent = result.error;
    }
  } catch (err) {
    errorBox.textContent = "Something went wrong.";
  }
});
