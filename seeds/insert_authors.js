"use strict";

exports.seed = function(knex, Promise) {
    return Promise.all([
            knex("authors")
            .del(),
            knex("books_authors")
            .del()
        ])
        .then(function() {
            return Promise.all([
                knex("authors")
                .insert({
                    first_name: "Alex",
                    last_name: "Martelli",
                    auth_bio: "Alex Martelli spent 8 years with IBM Research, winning three Outstanding Technical Achievement Awards.He then spent 13 as a Senior Software Consultant at think3 inc, developing libraries, network protocols, GUI engines, event frameworks, and web access frontends. He has also taught programming languages, development methods, and numerical computing at Ferrara University and other venues. He's a C++ MVP for Brainbench, and a member of the Python Software Foundation. He currently works for AB Strakt, a Python-centered software house in Goteborg, Sweden, mostly by telecommuting from his home in Bologna, Italy. Alex's proudest achievement is the articles that appeared in Bridge World (January/February 2000), which were hailed as giant steps towards solving issues that had haunted contract bridge theoreticians for decades.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/alex_martelli.jpg"
                })
                .returning("id"),
                knex("authors")
                .insert({
                    first_name: "Anna",
                    last_name: "Ravenscroft",
                    auth_bio: "Anna Martelli Ravenscroft is an experienced speaker and trainer, with diverse background developing curricula for church, regional transit, disaster preparedness; developing web applications for therapy, learning, fitness; writing technical bookss, articles and presentations; active member of Open Source community; skilled at translating between IT professionals and end users.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/anna_ravenscroft.jpg"
                })
                .returning("id"),
                knex("authors")
                .insert({
                    first_name: "Steve",
                    last_name: "Holden",
                    auth_bio: "Steve Holden Is a consultant, advising clients on system and network architectures and the design and implementation of programmed web systems. He also teaches classes on TCP/IP, network security, database and programming topics, and is the authors of \"Python Web Programming\", the O'Reilly School of Technology's \"Certificate series in Python\" and O'Reilly Media's \"Intermediate Python\" video series.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/steve_holden.jpg"
                })
                .returning("id"),
                knex("authors")
                .insert({
                    first_name: "Allen B.",
                    last_name: "Downey",
                    auth_bio: "Allen Downey is a Professor of Computer Science at Olin College of Engineering. He has taught at Wellesley College, Colby College and U.C. Berkeley. He has a Ph.D. in Computer Science from U.C. Berkeley and Master's and Bachelor's degrees from MIT.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/allen_downey.jpg"
                })
                .returning("id"),
                knex("authors")
                .insert({
                    first_name: "Bonnie",
                    last_name: "Eisenman",
                    auth_bio: "Bonnie Eisenman is a software engineer at Codecademy, with previous experience at Fog Creek Software and Google. She has spoken at several conferences on topics ranging from ReactJS to musical programming and Arduinos. In her spare time, she enjoys building electronic musical instruments, tinkering with hardware projects, and laser-cutting chocolate. Find her on Twitter as @brindelle.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/bonnie_eisenman.jpg"
                })
                .returning("id"),
                knex("authors")
                .insert({
                    first_name: "Kyle",
                    last_name: "Simpson",
                    auth_bio: "Kyle Simpson is an Open Web Evangelist who's passionate about all things JavaScript. He's an authors, workshop trainer, tech speaker, and OSS contributor/leader.",
                    auth_url: "https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/kyle_simpson.jpg"
                })
                .returning("id")
            ]);
        })
        .then(function(authorsIds) {
            var authorsIds = authorsIds.map(function(currentId) {
                return currentId[0]; // each authorsId is stored as an single-element array
            });
            var booksauthors = [{
                booksTitle: "Python In A Nutshell",
                authorsId: authorsIds[0]
            }, {
                booksTitle: "Python In A Nutshell",
                authorsId: authorsIds[1]
            }, {
                booksTitle: "Python In A Nutshell",
                authorsId: authorsIds[2]
            }, {
                booksTitle: "Think Python",
                authorsId: authorsIds[3]
            }, {
                booksTitle: "Learning React Native",
                authorsId: authorsIds[4]
            }, {
                booksTitle: "You Don't Know JS: ES6 & Beyond",
                authorsId: authorsIds[5]
            }, {
                booksTitle: "You Don't Know JS: Scope & Closures",
                authorsId: authorsIds[5]
            }, {
                booksTitle: "You Don't Know JS: Async & Performance",
                authorsId: authorsIds[5]
            }];

            return Promise.all(booksauthors.map(function(currentbooksauthors) {
                return getbooksIdByTitle(currentbooksauthors.booksTitle, knex, Promise)
                    .then(function(books) {
                        return insertbooksauthors(books.id, currentbooksauthors.authorsId, knex, Promise);
                    });
            }))
        });
}

function getbooksIdByTitle(booksTitle, knex, Promise) {
    return new Promise(function(resolve, reject) {
        knex("books")
            .select("id")
            .where("title", booksTitle)
            .then(function(bookss) {
                resolve(bookss[0]);
            });
    });
}

function insertbooksauthors(booksId, authorsId, knex, Promise) {
    return new Promise(function(resolve, reject) {
        knex("books_authors")
            .insert({
                books_id: parseInt(booksId),
                authors_id: parseInt(authorsId)
            })
            .then(function() {
                resolve();
            });
    });
}
