const form = document.getElementById("signupForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const successMessage = document.getElementById("successMessage");

function validatePasswords() {
  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      password.classList.add("error");
      confirmPassword.classList.add("error");
    } else {
      password.classList.remove("error");
      confirmPassword.classList.remove("error");
    }
  }
}

password.addEventListener("input", validatePasswords);
confirmPassword.addEventListener("input", validatePasswords);

form.addEventListener("submit", function (e) {  
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match.");
    return;
  }

  const formData = {
    firstName: form.first_name.value,
    lastName: form.last_name.value,
    email: form.email.value,
    phone: form.phone.value,
    password: form.password.value,
  };

  localStorage.setItem("userData", JSON.stringify(formData));
  successMessage.textContent = "✅ It's successful";
  console.table(formData);
  form.reset();
});

const loginBox = document.getElementById("loginBox");
const loginLink = document.getElementById("loginLink");
const closeLogin = document.getElementById("closeLogin");
const loginMessage = document.getElementById("loginMessage");

loginLink.addEventListener("click", function(e) {
  e.preventDefault();
  loginBox.style.display = "flex";
});

closeLogin.addEventListener("click", function() {
  loginBox.style.display = "none";
});

// Giriş işlemi
document.getElementById("loginSubmit").addEventListener("click", function() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const storedData = JSON.parse(localStorage.getItem("userData"));

  if (storedData && storedData.email === email && storedData.password === password) {
    loginMessage.textContent = "✅ Login successful!";
    loginMessage.style.color = "green";
  } else {
    loginMessage.textContent = "❌ Invalid email or password.";
    loginMessage.style.color = "red";
  }
});
