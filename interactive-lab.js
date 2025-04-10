// interactive-lab.js

document.addEventListener("DOMContentLoaded", function() {
  const plastic = document.getElementById("plastic");
  const mechZone = document.getElementById("mechanical-zone");
  const chemZone = document.getElementById("chemical-zone");
  const labFeedback = document.getElementById("lab-feedback");

  // Set up draggable plastic item
  plastic.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text/plain", "plastic");
    plastic.classList.add("dragging");
  });

  plastic.addEventListener("dragend", function() {
    plastic.classList.remove("dragging");
  });

  // Allow drop on both zones with enhanced visual feedback
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
      let dropTarget = this.id;
      
      // Trigger a quick scale animation on the drop zone
      this.classList.add("dropped");

      // Launch confetti animation in the drop zone
      createConfetti(this);
      
      setTimeout(() => {
        this.classList.remove("dropped");
      }, 300);
      
      // Animate the plastic bottle vanishing and then reappearing for another try
      plastic.style.transform = "scale(0)";
      setTimeout(() => {
        plastic.style.transform = "scale(1)";
        labFeedback.innerHTML = dropTarget === "mechanical-zone"
          ? "<p>Mechanical Recycling complete! The plastic has been shredded and processed.</p>"
          : "<p>Chemical Recycling complete! The plastic has been broken down into its monomers.</p>";
      }, 500);
    });
  });

  // Function for creating a confetti effect within a drop zone
  function createConfetti(zone) {
    const confettiCount = 20;
    for (let i = 0; i < confettiCount; i++) {
      let confetti = document.createElement("div");
      confetti.classList.add("confetti");
      // Set random horizontal position within the zone (avoiding the very edges)
      confetti.style.left = Math.random() * 90 + "%";
      confetti.style.top = "0";
      zone.appendChild(confetti);
      // Remove each confetti element after the animation completes
      setTimeout(() => {
        confetti.remove();
      }, 1000);
    }
  }
});
