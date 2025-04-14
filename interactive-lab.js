// interactive-lab.js
document.addEventListener("DOMContentLoaded", function() {
  const plastic = document.getElementById("plastic");
  const mechZone = document.getElementById("mechanical-zone");
  const chemZone = document.getElementById("chemical-zone");
  const labFeedback = document.getElementById("lab-feedback");

  // Set up draggable plastic bottle
  plastic.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text/plain", "plastic");
    plastic.classList.add("dragging");
  });

  plastic.addEventListener("dragend", function() {
    plastic.classList.remove("dragging");
  });

  // Set up drop zones for both mechanical and chemical recycling
  [mechZone, chemZone].forEach(zone => {
    zone.addEventListener("dragover", function(e) {
      e.preventDefault();
      this.classList.add("zone-hover");
    });
    zone.addEventListener("dragleave", function(e) {
      this.classList.remove("zone-hover");
    });
    zone.addEventListener("drop", function(e) {
      e.preventDefault();
      this.classList.remove("zone-hover");
      const dropTarget = this.id;
      this.classList.add("dropped");

      // Launch confetti animation within the drop zone
      createConfetti(this);

      setTimeout(() => {
        this.classList.remove("dropped");
      }, 300);

      // Animate the plastic bottle to vanish then reappear, with feedback text
      plastic.style.transform = "scale(0)";
      setTimeout(() => {
        plastic.style.transform = "scale(1)";
        labFeedback.innerHTML = dropTarget === "mechanical-zone"
          ? "<p>Mechanical Recycling complete! The plastic is shredded and prepared for reuse.</p>"
          : "<p>Chemical Recycling complete! The plastic is broken down into its original monomers.</p>";
      }, 500);
    });
  });

  // Function to create a confetti burst in the drop zone
  function createConfetti(zone) {
    const confettiCount = 20;
    for (let i = 0; i < confettiCount; i++) {
      let confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 90 + "%";
      confetti.style.top = "0";
      zone.appendChild(confetti);
      setTimeout(() => {
        confetti.remove();
      }, 1000);
    }
  }
});
