 <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.
 </p>

## Description
Write a simple REST service with CRUD operations for User entity.•To create REST service

* Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL.
* Write SQL script which will create Users table in the DB and fill it in with predefined users’ collection.
* Configure your REST service to work with PostgreSQL. Use the [sequelize](http://docs.sequelizejs.com/) as ORM to work with PostgreSQL.
* As an alternative to sequelizeyou can use more low-level query-builder library [KnexJS](http://knexjs.org/).
* The service should adhere to [3-layer architecture principles](https://softwareontheroad.com/ideal-nodejs-project-structure/).
* Update the existing Solvencies System using TypeORM, Nest.js, Sequelize Frameworks, TypeScript and PHP programming languages, Node.js development environment, PostgreSQL database migration, according to the respective web development fields for its use in the backend area.
* Implement CRUD modules for students, users, loans, loan details, locations, faculties, schools, office and office type. Implement endpoints for the academic view and endpoints for the loan view.
* Performed periodic updates to improve the functionality and security of the application.
* Integrated an administrative panel that allows administrators to update their details of the loan of materials from the university library.
  
In Spanish:

* Actualice el Sistema existente Solvencias utilice Frameworks de TypeORM, Nest.js , Sequelize, lenguaje de programación TypeScript y PHP,  entorno de desarrollo Node.js, la migración de la base de datos PostgreSQL, de acuerdo en los respectivos campos de desarrollo web para su utilidad en la area de backend.
* Implemente módulos de CRUD de alumnos, usuarios, prestamo, detalles del prestamo, sedes, facultades, escuelas, oficina y tipo oficina. Implemente endpoints para la vista académico y endpoints para la vista prestamos.
* Realicé actualizaciones periódicas para mejorar la funcionalidad y la seguridad de la aplicación.
* Integré un panel administrativo que permite a los administradores actualizar sus detalles del prestamo de materiales de la biblioteca de la universidad.


## Installation
```bash
$ git clone https://gitlab.com/jgraos/backend-base.git
```


## Running the app
- cd into `backend-base`
- run `npm install`
- set up your postgres database
- rename `.env.sample` to `.env` and populate the required parameters
- run `npm run start:dev`

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger Documentation
```bash
$ http://localhost:5200/documentation
```

## Migration & Seeding
Migrations is a script to run SQL command to create / change database table schema.

Seeding is a script to run SQL for providing the initial data to the database.

After setting up your DB, migrate DB and seed the tables. Run the following commands:
```bash
# Create the tables
$ npm run db:migrate

# Fill the tables with data
$ npm run db:seed-dev
```


## Swagger API docs
This project uses the Nest swagger module for API documentation. [NestJS Swagger](https://github.com/nestjs/swagger) - [www.swagger.io](https://swagger.io/)
Swagger docs will be available at __[localhost:3000/documentation](localhost:3000/documentation)__ after running `npm run start`.


## License
[MIT licensed](LICENSE).

---

#### [The detailed guide to the project](https://www.freecodecamp.org/news/build-web-apis-with-nestjs-beginners-guide/)

#### [Similar project](https://github.com/kentloog/nestjs-sequelize-typescript)

#### [Sequelize migration example](https://github.com/codeburn-io/1-sequelize-typescript-migrations-example)
