<template>
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-section">
                <h4>Contactez-nous</h4>
                <p>
                    Adresse : 17 Rue du Château, 09100 Les Pujols <br>
                    Ville : Les Pujols<br>
                    Téléphone : 05 61 68 71 44<br>
                    Email : 581747@footoccitanie.fr
                </p>
            </div>
            <div class="footer-section links">
                <h4>Liens utiles</h4>
                <div class="links-columns">
                    <ul>
                        <li><a target="_blank" class="nav-link" href="https://ariegefoot.fff.fr/">
                            <img class="logo" src="../assets/district_ariege.webp" alt="District de l'Ariège" /> 
                            District de l'Ariège
                        </a></li>
                        <li><a target="_blank" class="nav-link" href="https://occitanie.fff.fr/">
                            <img class="logo" src="../assets/Ligue_de_Football_d'Occitanie.webp" alt="Ligue d'Occitanie" /> 
                            Ligue d'Occitanie
                        </a></li>
                    </ul>
                    <ul>
                        <li><a target="_blank" class="nav-link" href="https://lespujols.fr/">
                            <img class="logo" src="../assets/mairie_pujol.webp" alt="Mairie des Pujols" /> 
                            Mairie des Pujols
                        </a></li>
                        <li><a target="_blank" class="nav-link" href="http://www.mairie-coussa.fr/">
                            <img class="logo" src="../assets/mairie_coussa.webp" alt="Mairie de Coussa" /> 
                            Mairie de Coussa
                        </a></li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
</template>


<script>
export default {
    name: 'Footer',
    // Add your component logic here
}
</script>

<style lang="scss" scoped>

.footer {
    background-color: #000; /* Couleur identique au header */
    color: #fff;
    position: absolute; /* Permet de coller au bas */
    text-align: center;
    left: 0;
    width: 100%;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 1140px; /* Centrer avec une largeur fixe */
    margin: 0 auto;
    padding: 0 20px;
}

.footer-section {
    flex: 1;
    min-width: 260px; /* Ajuste la taille minimale */
    margin-bottom: 20px;
}

.links-columns {
    display: flex;
    justify-content: space-between;
}

.links ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.links ul li {
    margin-bottom: 10px;
}

.nav-link {
    text-decoration: none;
    color: #fff;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: color 0.3s;
}

.nav-link:hover {
    color: #00afea; /* Ajoute un effet de survol */
}

.logo {
    display: inline-block;
    height: 30px; /* Taille des logos */
    margin-right: 10px;
    vertical-align: middle;
}

</style>