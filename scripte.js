const modal = document.getElementById("flower-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeModal = document.getElementById("close-modal");
const modalImagesContainer = document.getElementById("modal-images");

// Sélectionne toutes les cartes
const cards = document.querySelectorAll(".card");

modal.style.display = "none";

											// Ouverture du modal au clic sur une carte
cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const text = card.getAttribute("data-text");
    const additionalImages = card.getAttribute("data-images");

    modalTitle.textContent = title;
    modalText.textContent = text;

    const mainImage = card.getAttribute("data-image");
    if (mainImage) {
      modalImg.style.display = "block";
      modalImg.src = mainImage;
    } else {
      modalImg.style.display = "none";
    }

    if (additionalImages) {
      const imagesArray = additionalImages.split(",");
      modalImagesContainer.innerHTML = "";
      imagesArray.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl.trim();
        imgElement.alt = title;
        imgElement.classList.add("modal-image");
		document.body.classList.add('modal-open');
        modalImagesContainer.appendChild(imgElement);
      });
    }

    modal.style.display = "flex"; // Affiche le modal
  });
});


						// Fermeture via le bouton close
closeModal.addEventListener("click", closeModalFunction);

function closeModalFunction() {
  // Ajoute l'animation de fermeture
  modal.classList.add("closing");
  document.body.classList.remove('modal-open');
  
  // Masquer le modal après l'animation
  setTimeout(() => {
    modal.style.display = "none"; // Masquer le modal
    modal.classList.remove("closing"); // Retirer la classe 'closing' une fois l'animation terminée
    modalImg.classList.remove("enlarged"); // Réinitialiser l'état agrandi
    modalImagesContainer.querySelectorAll('img').forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });
  }, 500); // Temps d'animation pour la fermeture
}

						// Fermeture du modal via la touche "Espace"
window.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault(); // Empêche le comportement par défaut de l'espace
    closeModalFunction(); // Appel de la fonction pour fermer le modal
  }
});









// Gestion du clic sur les images dans le modal
modalImagesContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    const clickedImage = e.target;
    const isEnlarged = clickedImage.classList.contains("enlarged");

    // Réinitialise toutes les images
    modalImagesContainer.querySelectorAll("img").forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });

    if (!isEnlarged) {
      // Agrandit l'image si elle ne l'était pas
      clickedImage.classList.add("enlarged");
      clickedImage.style.transition = "transform 0.3s ease";
    } else {
      // Sinon la rétrécit
      clickedImage.classList.add("shrink");
    }

    e.stopPropagation(); // Ne propage pas ce clic plus loin
  }
});

// Si clic ailleurs dans le modal → rétrécit l’image agrandie (sans fermer le modal)
modal.addEventListener("click", () => {
  const enlargedImg = modalImagesContainer.querySelector("img.enlarged");
  if (enlargedImg) {
    enlargedImg.classList.remove("enlarged");
    enlargedImg.classList.add("shrink");
  }
});


// Ajoutez un écouteur d'événements pour l'ancrage du lien "À propos"
document.getElementById("about-link").addEventListener("click", function(e) {
  e.preventDefault(); // Empêche le comportement par défaut de # (pas de défilement immédiat)

  // Fait défiler la page jusqu'à l'élément #footer
  const footer = document.getElementById("footer");

  // Utilisation de scrollIntoView pour garantir un défilement fluide
  footer.classList.add("expanded"); // Animation d'agrandissement du footer

  // Affiche le texte du footer avec l'animation d'apparition
  const aboutText = document.getElementById("about-text");
  aboutText.classList.add("visible"); // Applique la classe visible pour afficher le texte

  // Une fois l'animation d'agrandissement terminée, rétrécir le footer
    // Attendre un peu avant de faire défiler vers le bas
    footer.scrollIntoView({
      behavior: "smooth", // Défilement fluide
      block: "end"        // Aligne l'élément en bas du viewport
    });

    // Réduit le footer après l'agrandissement
    footer.classList.remove("expanded");
    footer.classList.add("shrinking");

    // Après un délai, rétrécir le footer
    setTimeout(() => {
      footer.classList.remove("shrinking");
    }, 500); // Durée de l'animation de réduction
 // Temps d'attente avant de faire défiler
});



