# AP-EAT
API pour service de livraison de nourriture. (Projet pour Faculté des sciences de Montpellier)

* [Pré-requis](#pré-requis)
* [Installation](#installation)
* [Remplir la base de données (optionnal)](#remplir-la-base-de-données-optionnal)
* [Lancer](#lancer)


## Pré-requis
Pour installer l'API, vous devez avoir installé Node.Js 12+ avec npm.

## Installation
```bash
git clone git@github.com:Dorpaxio/AP-EAT.git
cd AP-EAT
npm i
git checkout develop
```

## Remplir la base de données (optionnal)
Au premier démarrage la base de donnée est vide, si vous le souhaitez nous avons ajoutés un script permettant de la remplir.
```bash
cd scripts/
sudo chmod +x fillDatabase.sh
./fillDatabase.sh
cd ..
```

## Lancer
```bash
# Serveur de production
node index.js
```
