4. Stratégie Marketing & Conversion
Ce qui fonctionne très bien :
L'offre d'appel « Échange téléphonique de 15 min offert » : C'est le meilleur levier possible dans ce secteur. Il élimine le risque perçu et la peur de s'engager financièrement sans connaître la praticienne.
La levée de l'objection du prix via les mutuelles : La carte dédiée aux remboursements par les forfaits "médecines douces" répond immédiatement au frein financier.
Dédramatisation de la créativité : La phrase répétée « Aucun prérequis artistique » et « C'est le processus qui compte, pas l'objet » désamorce le syndrome de l'imposteur chez les patients.

Absence d'un outil de réservation directe : [FAIT / EN ESSAI]
Pour réserver les 15 minutes offertes, l'internaute devait soit oser téléphoner tout de suite, soit attendre d'être rappelé.
=> [FAIT / EN ESSAI] Intégration et harmonisation graphique du système de réservation directe Cal.com (jeremy-clavier/1h) sous forme de modale dédiée spacieuse & fluide :
- Formulaire de contact classique restauré dans son format naturel aéré et complet (sans slider ni contrainte d'espace)
- Modale plein écran élégante (`max-w-4xl`, `h-[92vh]`, flou d'arrière-plan, touche Échap, focus accessible)
- Iframe Cal.com préchargée avec indicateur de chargement chaleureux (skeleton loader) pour une ouverture instantanée
- Injection CSS dynamique via le protocole postMessage de Cal.com (`ui` + `cssVarsPerTheme` : palette Teal `#0f766e`, `#115e59`, fonds `#fafaf9`, bordures stone, typographie harmonisée)
- Clic sur les boutons clés (« Prendre RDV » du Header, du Hero, de la carte tarifs, de la carte contact et de la barre mobile) : ouverture instantanée de la modale
- Suivi télémétrique des ouvertures via PostHog (`booking_modal_opened`, `booking_modal_closed`)
- Déploiement unifié sur index.html et la-baule-pornichet.html (redirection automatique pour ehpad-institutions.html).

Ce qui freine la conversion :
Absence totale de Preuve Sociale (Social Proof) : [FAIT]
Aucun avis client, aucun témoignage d'aidant, aucune recommandation de professionnel de santé ou d'institution (EHPAD).
Dans le domaine de la relation d'aide et de la santé mentale, la recommandation par les pairs est le déclencheur n°1 d'appel. Même 2 ou 3 témoignages anonymisés (ex: « Marc, aidant familial à Guérande », « Cadre de santé en EHPAD ») feraient bondir la confiance.
=> [FAIT] Témoignage officiel de la Résidence EHPAD emeis Les Écrivains (Guérande), complété des témoignages de Marc D. (aidant familial à Guérande) et Sophie L. (particulier burn-out à La Baule), intégrés sur index.html et ehpad-institutions.html.

Opacité sur les tarifs particuliers : [FAIT]
L'encart Particulier indique uniquement « Sur consultation ».
Cette formulation donne souvent l'impression que le tarif est élevé ou variable à la tête du client. Afficher soit le prix exact de la séance (ex: 60 €), soit une base transparente (« À partir de XX € (matériel et déplacement inclus) ») rassurerait davantage.
=> [FAIT] Tarif transparent affiché : 60 € / séance (matériel 100% inclus) + menu déroulant discret par grande commune (Saint-Molf, Guérande, La Baule, Pornichet, etc.) affichant les frais kilométriques réels (0,55 € / km) et le total estimé en direct. Header unifié et strictement identique sur toutes les pages.


