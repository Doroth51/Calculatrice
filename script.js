// Variables globales
// Eléments memoire et ecran
const memoireElement = document.querySelector("#memoire");
const ecran = document.querySelector("#ecran");

// On stocke la valeur de l'ecran "précédent"
let precedent = 0;

// On stocke l'affichage
let affichage = "";

// On stocke l'opération
let operation = null;

// On initialise la memoire
let memoire;

window.onload = () => {
    // On écoute les clicks sur les touches
    let touches = document.querySelectorAll('span');

    for(let touche of touches){
        touche.addEventListener('click', gererTouches);
    }

    // On ecoute les touches du clavier
    document.addEventListener("keydown", gererTouches);

    // Recupérer de la mémoire depuis la memoire locale
    memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
    if(memoire!=0) memoireElement.getElementsByClassName.style.display = "initial";
}

function gererTouches(e){
    let touche;
    // On liste les touches autorisées
    const listeTouches = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "-", "*", "/", ".", "Enter", "Escape"];
    // ON vérifie si on a l'evenement keydown
    if(e.type === "keydown"){
        // On compare la touche appuyée aux touches autorisées
        if(listeTouches.includes(e.key)){            
            // On empeche l'utilisation "par defaut" de la touche
            e.preventDefault();
            // On stocke la touche choisie dans la variable touche
            touche = e.key;
        }
    }else{
        touche = this.innerText;
    }
    
    // On verifie si c'est un chiffre ou .
    if(parseFloat(touche) >=0 || touche === "."){
        // A verifier pas plusieurs point dans la chaine
        // On met à jour la valeur d'affichage et on affiche sur l'ecran
        affichage = (affichage === "" ? touche.toString() : affichage + touche.toString());
        ecran.innerText = affichage;
    }else{
        switch(touche){
            // Touche C réinitialise tout
            case "C":
            case "Escape":                
                precedent = 0;
                affichage = "";
                operation = null;
                ecran.innerText = 0;
                break;
            // Calculs
            case "+":
            case "-":
            case "*":
            case "/":
                // On calcule la valeur resultat de l'etape précédente
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                // On met à jour l'écran
                ecran.innerText = precedent;
                // On stocke l'opération
                operation = touche;
                // On réinitialise la variable d'affichage
                affichage = "";
                break;
            case "=":
            case "Enter":
                // On calcule la valeur resultat de l'etape précédente
                precedent = (precedent === 0) ? parseFloat(affichage) : calculer(precedent, parseFloat(affichage), operation);
                // On met à jour l'écran
                ecran.innerText = precedent;
                // On stocke le résultat dans la variable d'affichage
                affichage = precedent;
                // On réinitialise le précédent
                precedent = 0;
                break;
            // On gère la mémoire
            case "M+":
                // On stocke en additionnant à la valeur déjà en memoire
                localStorage.memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) + parseFloat(affichage) : parseFloat(affichage);
                // On affiche le M
                memoireElement.style.display = "initial";
                break;
            case "MC":
                // On efface la mémoire
                localStorage.memoire = 0;
                // On efface le M
                memoireElement.style.display = "none";
                break;
            case "MR":
                // On récupère la valeur stockée
                memoire = (localStorage.memoire) ? parseFloat(localStorage.memoire) : 0;
                affichage = memoire;
                ecran.innerText = memoire;
                break;
            default:
                break;

        }
    }
}

/**
 * Effectue le calcul
 * @param {number} nb1 
 * @param {number} nb2 
 * @param {string} operation 
 * @returns float
 */
function calculer(nb1, nb2, operation){
    nb1 = parseFloat(nb1);
    nb2 = parseFloat(nb2);
    if(operation === "+") return nb1 + nb2;
    if(operation === "-") return nb1 - nb2;
    if(operation === "*") return nb1 * nb2;
    if(operation === "/") return nb1 / nb2;
}