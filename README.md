# AP-EAT
API pour service de livraison de nourriture. (Projet pour Faculté des sciences de Montpellier)

* [Pré-requis](#pré-requis)
* [Installation](#installation)
* [Remplir la base de données (optionnal)](#remplir-la-base-de-données-optionnal)
* [Lancer](#lancer)


## Pré-requis
Pour installer l'API, vous devez avoir installé Node.Js 12+ avec npm ainsi que MongoDB.

**NodeJS :** [https://nodejs.org/fr/](https://nodejs.org/fr/)
Vous pouvez vérifier que Node.JS est bien installé en exécutant la commande `node -v` dans un terminal.
Vous devez aussi vérifier que NPM est bien disponible avec `npm -v` (la version est différente de Node).

**MongoDB Community Server :** [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
Le serveur MongoDB doit être lancé et vous pouvez vérifier sa bonne exécution en exécutant la commande `mongo` dans un terminal pour ouvrir le mongo-cli.

On utilisera le serveur mongo sans utilisateur donc il n'est pas nécessaire de devoir rentrer un mot de passe.

## Installation
```bash
git clone git@github.com:Dorpaxio/AP-EAT.git
cd AP-EAT
npm install # Pour installer les dépendances
```

## Remplir la base de données (optionnal)
Au premier démarrage la base de donnée est vide, si vous le souhaitez nous avons ajouté un script permettant de la remplir.
```bash
cd scripts/
sudo chmod +x fillDatabase.sh
./fillDatabase.sh
cd ..
```

Ce script permet l'initialistation de plusieurs utilisateurs pour effectuer des tests.

**Un client**
```
identifiant: patrick@test.com
mot de passe: testpassword
```

**Un restaurant**
```
identifiant: grandslam@test.com
mot de passe: testpassword
```

**Un livreur**
```
identifiant: test123@test.com
mot de passe: testpassword
```

## Lancer
```bash
node index.js
```
