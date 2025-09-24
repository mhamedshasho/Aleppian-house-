function login(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    alert("❌ بيانات الدخول غير صحيحة");
    return;
  }
  if (user.isBanned) {
    window.location.href = "banned.html";
    return;
  }
  localStorage.setItem("currentUserEmail", email);
  window.location.href = "dashboard.html";
}

function signup(name, email, password, phone) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.email === email)) {
    alert("❌ هذا البريد مستخدم مسبقًا");
    return;
  }
  users.push({ name, email, password, phone, isBanned: false });
  localStorage.setItem("users", JSON.stringify(users));
  alert("✅ تم إنشاء الحساب بنجاح");
  window.location.href = "login.html";
}

function logout() {
  localStorage.removeItem("currentUserEmail");
  window.location.href = "login.html";
}

function addToFavorites(propertyId) {
  const email = localStorage.getItem("currentUserEmail");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (!favorites[email]) favorites[email] = [];
  if (!favorites[email].includes(propertyId)) {
    favorites[email].push(propertyId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("✅ تمت إضافة العقار إلى المفضلة");
  } else {
    alert("⚠️ العقار موجود بالفعل في المفضلة");
  }
}

function shareProperty(propertyId) {
  const url = window.location.origin + "/index.html#" + propertyId;
  navigator.clipboard.writeText(url);
  alert("📤 تم نسخ رابط العقار للمشاركة");
}

function showMap(lat, lng) {
  const mapDiv = document.getElementById("map");
  mapDiv.innerHTML = `<iframe width="100%" height="300" frameborder="0"
    src="https://maps.google.com/maps?q=${lat},${lng}&hl=ar&z=14&output=embed"></iframe>`;
}

function banUser(email, reason) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email);
  if (user) {
    user.isBanned = true;
    user.banReason = reason;
    localStorage.setItem("users", JSON.stringify(users));
  }
}

function unbanUser(email) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email);
  if (user) {
    user.isBanned = false;
    delete user.banReason;
    localStorage.setItem("users", JSON.stringify(users));
  }
}
