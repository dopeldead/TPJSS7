# iti-network


## Démarrage
- `WINDOWS SEULEMENT`: exécuter `npm install -g webpack webpack-dev-server typescript`
- exécuter `npm install` pour installer les modules
- exécuter `npm start` pour lancer le serveur de développement
- lancer le serveur node iti-network-server
- ouvrir chrome à l'adresse [`http://localhost:3000`](http://localhost:3000)

## Outils
- installer le plugin chrome [augury](https://chrome.google.com/webstore/detail/augury/elgalmkoelokbchhkhacckoklkejnhcd)
- installer le plugin (VS CODE) [angular2-snipet](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
- installer le plugin (VS CODE) [angular2-snipet](https://plugins.jetbrains.com/idea/plugin/8395-angular-2-typescript-live-templates)

## TP

### Login

#### Level II


### Register

#### Level II


### Post 

### Level II
9. Retirer les urls des messages parsés pour ne restituer que son contenu

### Level III
10. Pouvoir parser plusieurs type de contenus dans un seul poste
11. Remplacer les liens http par des balises <a>...</a>.

### Activités et notifications 

### Level I
1. Créer un NotificationService
2. Lister les activités dans le menu à droite
3. Ajouter une activté lors d'un nouveau poste via le NotificationService
4. Ajouter une activté lors d'un commentaire sur un poste via le NotificationService
5. Ajouter une activté lorsqu'un membre se connecte via le NotificationService
6. Ajouter une activité lors d'un like via le NotificationService
7. Ajouter une activité lors de l'ajout d'un channel via le NotificationService

### Level II
8. Afficher une popup de notification avec [angular2-notifications](https://github.com/flauc/angular2-notifications)
9. Persister les activités dans le [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

### Level III
10. utiliser [angular2-notifications](https://github.com/flauc/angular2-notifications) pour afficher des notifications avec chrome
11. Si l'activité concerne un poste (nouveau poste, commentaire sur un poste, like d'un poste) rendre l'activité clicable. 
Le clic doit rediriger sur le bon channel et scroller jusqu'au poste concerné


### Reminder

- Tous les composants ajoutés doivent être réexportés dans src/app/components/index.ts
- les composants créer (via snipet) ne doivent pas avoir de moduleId
- documentation [angular](https://angular.io/docs/ts/latest/)
- tous services créé doit être ajouter au providers dans src/app/app.module.ts