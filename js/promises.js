document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("fetchButton").addEventListener("click", fetchDegrees);
  
    function fetchDegrees() {
      const url = "data/degrees.json";
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
        //added a new Promise wrapper around the processDegrees function
          return new Promise(resolve => {
            processDegrees(data);
            resolve();
          });
        })
        .then(() => {
          /*after processing the degrees data, the promise is resolved, 
          and a new 'then' block is added to apply animation delays to each degree card.*/
          const outputDiv = document.getElementById("result");
          const degreeCards = outputDiv.querySelectorAll(".degree-card");
          degreeCards.forEach((degreeCard, index) => {
            degreeCard.style.animationDelay = `${index * 0.2}s`;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    function processDegrees(data) {
      const outputDiv = document.getElementById("result");
      // Clear previous output  
      outputDiv.innerHTML = ""; 
      const degrees = data.degrees;
      degrees.forEach(degree => {
        const degreeCard = document.createElement("div");
        degreeCard.classList.add("degree-card");

        const degreeInfo = `
          <p class="degree-label">School:</p>
          <p class="degree-data">${degree.degree.school}</p>
          <p class="degree-label">Program/Major:</p>
          <p class="degree-data">${degree.degree.program}</p>
          <p class="degree-label">Type:</p>
          <p class="degree-data degree-type">${degree.degree.type}</p>
          <p class="degree-label">Year Conferred:</p>
          <p class="degree-data degree-year">${degree.degree.year}</p>
        `;
  
        degreeCard.innerHTML = degreeInfo;
        outputDiv.appendChild(degreeCard);
        // Hide the fetchButton
        fetchButton.style.display = "none"; 
      });
    }
  });
  