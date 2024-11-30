<script setup>
import Navigation from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
    <Navigation />
    <img src="../assets/d1.jpg" class="img"/>

    <Footer />
  </template>
  
  <script>
  // @ is an alias to /src
  
  export default {
    name: "Home",
    components: {},
  };
</script>
  
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700&display=swap');


img {
  position: absolute; /* Ancrer l'image */
  top: 0; /* Coller l'image au haut */
  left: 50%; /* Positionner le centre de l'image au milieu */
  transform: translateX(-50%); /* Recentre l'image en retirant 50% de sa largeur */
  width: 75vw; /* Limite la largeur à 90% de la fenêtre */
  height: auto; /* Ajuste la hauteur automatiquement en respectant les proportions */
  object-fit: cover; /* Remplit le conteneur sans déformer */
  object-position: top; /* Priorise le haut de l'image */
  z-index: -1; /* Place l'image derrière le contenu */
  max-height: 500px; /* Limite la hauteur maximale */
}

body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0;
}

main {
    flex: 1; /* Prend tout l'espace disponible */
}

  
</style>