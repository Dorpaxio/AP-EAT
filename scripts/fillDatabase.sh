mongoimport --db apeat --collection users --file ./jsons/users.json --jsonArray --drop
mongoimport --db apeat --collection products --file ./jsons/products.json --jsonArray --drop
mongoimport --db apeat --collection menus --file ./jsons/menus.json --jsonArray --drop
mongoimport --db apeat --collection carts --file ./jsons/carts.json --jsonArray --drop
mongoimport --db apeat --collection orders --file ./jsons/orders.json --jsonArray --drop