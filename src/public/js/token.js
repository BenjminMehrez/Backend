const url = new URL(window.location.href);
const token = url.pathname.split('/')[url.pathname.split('/').length-1]
const form = document.getElementById("resetPasswordForm");
form.action = `/api/auth/reset-password/${token}`;