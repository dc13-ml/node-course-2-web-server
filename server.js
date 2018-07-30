const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//
// When run locally, the port will be set to 3000.
//
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});

// Uncomment this code if the site is in maintenance.
// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to Dennis Webiste.',
        pageTitle: 'Home page title'
    })
});

app.get('/project', (req,res)=>{
    res.render('project.hbs', {
        pageTitle: 'Project page title',
        projectMessage: 'Portfolio page.'
    });
});

app.get('/about', (req,res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page Title'
    });
});

app.get('/bad', (req,res)=>{
    res.send({
        error: '401',
        message: 'Bad data'
    });
});

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});
