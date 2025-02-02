document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth < 768 && !localStorage.getItem("dismissedMobileWarning")) {
        document.getElementById("mobile-warning").style.display = "block";
    }
});

function closeWarning() {
    document.getElementById("mobile-warning").style.display = "none";
    localStorage.setItem("dismissedMobileWarning", "true"); // Save state
}
