# :rocket: Laboratorio 6 - Server Side :rocket:
**Gustavo Adolfo Cruz Bardales          #22779**
---
*Laboratorio 06*:  Los objetivos del laboratorio 6 de Sistemas y Tecnologias WEB, consisten en:
- Practicar conceptos básicos de javascript del lado del server
- Aprender a configurar una base de datos para ser consumida por un cliente
- Aprender a construir y probar endpoints RESt
---
## :gear: Repositorio de Github :gear:
Link de [Lab06](https://github.com/G2309/lab06-SW)
---
## :paperclip: Documentacion consultada :paperclip:
Formato de README.md: [Click aqui](https://learnxinyminutes.com/docs/markdown/)
Swagger: [Click aqui](https://www.youtube.com/watch?v=RayDPBYou4I&t=349s)
---

## Comandos para ejecutar el servidor Express:

**Importante, dependiendo de la configuracion de docker en tu computadora, sera necesario que utilices "sudo" antes de los siguientes comandos**

Dirigete al directorio **lab06-SW** y ejecuta:
    docker build -t blog-gustavocruz-db .
Luego ejecuta el siguiente ejecuta:
    docker run --name gustavo-db -e MYSQL_ROOT_PASSWORD=toor -e MYSQL_DATABASE=post_db -e MYSQL_USER=gustavo -e MYSQL_PASSWORD=gus -p 3306:3306 -d blog-gustavocruz-db
Luego, para iniciar el contenedor utiliza:
    docker start gustavo-db
Una vez hayas ejecutado sin errores la imagen de docker, ejecuta:
    npm start
Si deseas ver los errores de estilo del codigo puedes usar:
    npm run lint
Por ultimo, si deseas ver la documentacion con **Swagger** primero ejecuta el codigo *npm start* y luego en el navegador coloca:
    http://localhost:3000/api-docs/#/default/get_posts

---
## :computer: Pruebas en postman :computer:
- /GET
![imagen](https://github.com/G2309/lab06-SW/assets/106942151/e69b65ec-131d-420d-a477-2ad8df48f0f9)
- /POST
![imagen](https://github.com/G2309/lab06-SW/assets/106942151/d293127d-60b6-454f-9088-0a08e4c660a0)
- /PUT
![imagen](https://github.com/G2309/lab06-SW/assets/106942151/ec863ece-df47-4cbc-aae4-1480c09ed29f)
- /DELETE
![imagen](https://github.com/G2309/lab06-SW/assets/106942151/b830b343-a0ac-4bb0-a924-527b50a1acbf)
- /GET after DELETE
![imagen](https://github.com/G2309/lab06-SW/assets/106942151/09e857b4-098b-4cf9-b1e1-490452d62657)
