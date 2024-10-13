# Portal-de-Opiniones

Este proyecto consiste en crear una API que funcione como un portal donde la gente pueda dar su opinión sobre cualquier tema.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.
2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.
3. Ejecutar `npm run initDb` para crear las tablas necesarias en la base de datos anteriormente creada.
4. Ejecutar `npm run dev` para lanzar el servidor.

## Entidades

### User

| Campo      | Tipo     | Descripción                           |
| ---------- | -------- | ------------------------------------- |
| id         | INT      | Identificador único del usuario.      |
| email      | VARCHAR  | Dirección de correo electrónico.      |
| username   | VARCHAR  | Nombre de usuario.                    |
| password   | VARCHAR  | Contraseña del usuario.               |
| createdAt  | DATETIME | Fecha y hora de creación del usuario. |
| modifiedAt | DATETIME | Fecha y hora de última modificación.  |

### Posts

| Campo     | Tipo     | Descripción                                   |
| --------- | -------- | --------------------------------------------  |
| id        | INT      | Identificador único del post.                 |
| userId    | INT      | Identificador del usuario que creó el post.   |
| text      | VARCHAR  | Texto del post.                               |
| createdAt | DATETIME | Fecha y hora de creación del post.            |

### Likes

| Campo     | Tipo     | Descripción                                   |
| --------- | -------- | --------------------------------------------  |
| id        | INT      | Identificador único del like.                 |
| userId    | INT      | Identificador del usuario que dio el like.    |
| postId    | INT      | Identificador del post que recibió el like.   |
| createdAt | DATETIME | Fecha y hora de creación del like.            |

### Dislikes

| Campo     | Tipo     | Descripción                                   |
| --------- | -------- | --------------------------------------------  |
| id        | INT      | Identificador único del dislike.              |
| userId    | INT      | Identificador del usuario que dio el dislike. |
| postId    | INT      | Identificador del post que recibió el dislike.|
| createdAt | DATETIME | Fecha y hora de creación del dislike.            |

## Endpoints

### Usuarios:

-   POST `/users/register` - Registro de usuario.
-   POST `/users/login` - Login de usuario (devuelve token).
-   GET `/users` - Devuelve información del usuario del token.
-   PUT `/users/update` - Editar informacion de usuario.

### Posts:

-   POST `/posts` - Permite publicar una opinión.
-   GET `/posts` - Lista de todos los posts.
-   POST `/posts/:postId/likes` - Añade un like a un post.
-   DELETE `/posts/:postId/likes` - Deshace un like de un post.
-   POST `/posts/:postId/dislikes` - Añade un dislike a un post.
-   DELETE `/posts/:postId/dislikes` - Deshace un dislike de un post.
-   DELETE `/posts/:postId` - Borra un post solo si eres quien lo creó.
