# Mario Kart

## Algorithme de pathfinding A* avec optimisation de trajet

### Description

**Mario Kart** est un script **TypeScript** utilisant l'algorithme de **pathfinding A\*** pour générer des trajets optimisés à travers différentes cartes. Le script prend en entrée une carte spécifique et renvoie les coordonnées optimisées en utilisant l'algorithme pour trouver le chemin le plus court.

### En quoi consiste le jeu ?

- :race_car: Le script génère des trajets optimisés pour un kart sur une carte donnée.
- :map: Les cartes sont fournies par défaut dans le dossier du projet, et chaque carte est représentée sous forme de matrice.
- :triangular_flag_on_post: Le script exploite l'algorithme de pathfinding A* pour déterminer les meilleurs trajets sur chaque carte.
- :gear: Une fonction d'optimisation de trajet ajuste le parcours en fonction des obstacles et des objectifs sur la carte.
- :arrow_forward: Le script renvoie les coordonnées optimisées sous la forme `y:x` pour chaque étape du trajet.

### Fonctionnalités

- **Algorithme A\*** : Utilisation de l'algorithme A* pour générer un trajet optimisé d'un point A à un point B sur la carte.
- **Optimisation de trajet** : Une fonction d'optimisation ajuste le chemin pour éviter les obstacles et trouver la route la plus rapide.
- **Cartes par défaut** : Plusieurs cartes sont incluses dans le projet, permettant de tester le pathfinding sur différents types de terrains.
- **Sortie des coordonnées** : Le script renvoie les coordonnées optimisées sous la forme `y:x`, indiquant les étapes successives du trajet.

## Installation

### Installation du projet

1. Téléchargez le projet en cliquant sur le bouton **Code** puis en sélectionnant **Download ZIP**.
2. Accédez au dossier du projet :

  ```cd mario-kart```

3. Installez les dépendances nécessaires avec npm (vous aurez donc besoin de node, que vous pouvez installer avec la commande ```apt install node``` sur le terminal) :

  ```npm install``` ou ```npm i```

### Exécution du script

Pour exécuter le script avec ts-node, utilisez la commande suivante :

  ```ts-node *.ts <maps/mapAuChoix.map>```

Exemple :

  ```ts-node *.ts maps/subject.map```

Cette commande exécutera le script `*.ts`(En l'occurence vu que le seul script du dépôt est algo.ts, celui-là) avec la carte *subject.map* située dans le dossier *maps/* du dépôt.

## Cartes disponibles

Le dossier maps contient plusieurs cartes que vous pouvez utiliser pour tester l'algorithme de pathfinding. Ces cartes sont au format texte et chaque case de la carte est représentée par un caractère spécifique (par exemple, `o` pour un obstacle et `.` pour une case libre).

Le point de départ est spécifié par la lettre `S`, et le point d'arrivée par `E`.

Voici un exemple de carte :

```
ooooSoo
oo...o.
...o..o
oo..o.o
E..o...
```

## Personnalisation

Vous pouvez ajouter vos propres cartes en créant de nouveaux fichiers dans le dossier maps. Assurez-vous que chaque carte soit correctement formatée en matrice pour que l'algorithme de pathfinding fonctionne correctement.

## Prérequis

- Il faut **OBLIGATOIREMENT** que la carte n'aie qu'un seul point d'arrivée et qu'un seul point de départ. (Sans quoi le script ne pourra pas trouver le point `S` et le point `E` si il n'y en a aucun par exemple).
- La map doit avoir un nombre égal de colonnes sur toutes les lignes. (Il n'est pas obilgatoire d'avoir autant de colonnes que de lignes.)
- Il **doit** y avoir un chemin pour atteindre l'arrivée atteignable.
- Le nom de la carte dans la commande doit être valide.
