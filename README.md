# Benjamin Bourgouin's Coding Challenge
#### *from Rio Tinto* 

*** 

### Projet : Simple REST API with TypeScript on AWS

*Create a simple REST API using TypeScript that performs basic CRUD operations on a MongoDB database. The API is deployed on a free-tier AWS EC2 instance and the code is committed to this GitHub repository.*

**Technologies and Tools :**
* TypeScript 
* NodeJS
* Express server 
* MongoDB 
* AWS (EC2)
* Git (GitHub)

***

## How to launch the projet ?

* **Public IP :** ==18.220.138.142==
* **Port number :** `8080`
* **API endpoint :** `/api/items`

In your terminal, you can run the command `curl http://18.220.138.142:8080/api/items` to connect to the server. You should get a list of all existing items in the database. 

> [!NOTE]
> This list may be empty, you should then receive an empty array `[]`

<br>


*** 

## How to use the projet ?

You can perform CRUD operations on a simple imitation of an inventory where every items are composed by a `name` and a `description`. 

#### POST - Create an item 

```
curl -X POST -H 'Content-Type: application/json' -d '{
    "name": "New Item", 
    "description": "New Description"
}' http://18.220.138.142:8080/api/items 
```

#### GET - Get all items 

```
curl http://18.220.138.142:8080/api/items
```

> [!NOTE]
> You can see that there is a field `_id` for all item. This field is automatically generated in MongoDB. For the next operations, you'll need an ID in your request, make sure to copy one.

<br>

#### GET - Get an item by its ID

```
curl http://18.220.138.142:8080/api/items/<selected-item-id>
```

#### PUT - Update an item by its ID

```
curl -X PUT -H 'Content-Type: application/json' -d '{
    "name": "Updated Name", 
    "description": "Updated description"
}' http://18.220.138.142:8080/api/items/<selected-item-id> 
```

> [!NOTE]
> You need to provide both name **AND** description. If you don't want to update one of these informations, write the same as it is already saved in the database.

<br>

#### DELETE - Remove an item by its ID

```
curl -X DELETE http://18.220.138.142:8080/api/items/<selected-item-id> 
```

> [!CAUTION]
> Using this command will permanently remove the item from the database ! 

<br>

*** 

## Dev's review 

> *"This project was challenging, in a good way. It was my first time ever using AWS and deployment in general, also the second time using MongoDB, and the first time building an API from scratch using TypeScript. I'm feeling proud of what i did there, it may be not perfect but i have the feeling that i made a lot of progress only with one small project. I am confident on my ability to learn and face challenges, it is a real source of motivation and a perfect way to grow and learn constantly."*


