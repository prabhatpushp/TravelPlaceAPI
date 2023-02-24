// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const API_ENDPOINT = "http://localhost:5035/api";

$(document).ready(function () {
  setLogin();
});

const setLogin = () => {
  let path = window.location.pathname;
  let loginKey = localStorage.getItem("loginKey") || false;
  if (path.match("/admin") && !loginKey) {
    window.location.href = "/";
  }
  if (loginKey) {
    document.querySelector("#logoutcontainer").classList.remove("d-none");
    document.querySelector("#logincontainer").classList.add("d-none");
  } else {
    document.querySelector("#logoutcontainer").classList.add("d-none");
    document.querySelector("#logincontainer").classList.remove("d-none");
  }
};

const logout = () => {
  localStorage.removeItem("loginKey");
  window.location.href = "../";
};
