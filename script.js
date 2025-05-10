// script.js

// Smooth page transition
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("fade-out");
  document.body.classList.add("fade-in");

  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http')) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });
});

// Highlight active nav link
window.addEventListener("DOMContentLoaded", () => {
  const current = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-menu a");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === current) {
      link.classList.add("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const voteBtn = document.querySelector(".cta-button");
  const pollOptions = document.querySelectorAll("input[name='poll']");
  const pollSection = document.querySelector(".poll");

  // Create a reset button
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Промени гласа си";
  resetBtn.classList.add("cta-button");
  resetBtn.style.marginTop = "15px";
  resetBtn.style.backgroundColor = "#666";
  resetBtn.style.display = "none"; // hidden by default
  pollSection.appendChild(resetBtn);

  // If already voted, lock poll
  if (localStorage.getItem("voted")) {
    lockPoll();
  }

  // Voting action
  voteBtn?.addEventListener("click", () => {
    const selected = document.querySelector("input[name='poll']:checked");

    if (!selected) {
      alert("Моля, изберете опция преди да гласувате.");
      return;
    }

    const choice = selected.value;
    localStorage.setItem("voted", choice);

    alert("Благодарим за вота! Вие гласувахте за: " + selected.nextSibling.textContent.trim());
    lockPoll();
  });

  // Reset vote action
  resetBtn.addEventListener("click", () => {
    localStorage.removeItem("voted");
    pollOptions.forEach(opt => {
      opt.disabled = false;
      opt.checked = false;
    });
    voteBtn.disabled = false;
    voteBtn.textContent = "Гласувай";
    voteBtn.style.backgroundColor = "#DA291C";
    voteBtn.style.cursor = "pointer";
    resetBtn.style.display = "none";
  });

  // Lock UI after voting
  function lockPoll() {
    pollOptions.forEach(opt => opt.disabled = true);
    voteBtn.disabled = true;
    voteBtn.textContent = "Гласувано";
    voteBtn.style.backgroundColor = "#999";
    voteBtn.style.cursor = "not-allowed";
    resetBtn.style.display = "inline-block";
  }
});
