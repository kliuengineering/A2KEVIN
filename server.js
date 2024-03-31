// import express into this file
const express = require('express');

// initialize an instance of express
const app = express();

// define the port that the web server should run on
const port = 3000;

// add ejs
app.set('view engine', 'ejs');

// adds static directory for images, I know it is not mentioned in the class, but I hope to use it such that the images are always loading
app.use(express.static('public'));





// global variable -> index pointer to MUSIC object literal
let indexPtr = null;

// array of songs called MUSIC
const MUSIC = 
[
    {
        title: "Playing God",
        artist: "Polyphia",
        artistImage: "./img/Polyphia.jpg",
    },

    {
        title: "Goose",
        artist: "Polyphia",
        artistImage: "./img/Polyphia.jpg",
    },

    {
        title: "Silence Followed by a Deafening Roar",
        artist: "PaulGilbert",
        artistImage: "./img/PG.png",
    },

    {
        title: "Eudaimonia Overture",
        artist: "PaulGilbert",
        artistImage: "./img/PG.png",
    },

    {
        title: "BWV 1004 Chaconne",
        artist: "J.S.Bach",
        artistImage: "./img/Bach.png",
    },

    {
        title: "BWV 847 Fugue in C minor",
        artist: "J.S.Bach",
        artistImage: "./img/Bach.png",
    },
]

// empty array called PLAYLIST
const PLAYLIST = 
[

]





// home endpoint
app.get('/', (req, res) => 
{
   console.log("Request received at the / endpoint...")
   return res.render('home', {musicList: MUSIC});
});


// find endpoint
app.get('/find/:artistName', (req, res) => 
{
    console.log("Request received at the /find endpoint...")

    let result = [];
    const searchName = req.params.artistName.toLowerCase();

    // O(n) search from the dictionary
    for (let itr of MUSIC)
    {
        if (itr.artist.toLowerCase() === searchName)
        {
            result.push(itr);
        }
    }

    // DEBUG: check array length
    console.log("result array length is ->", result.length);

    // CASE 1: not found
    if (result.length === 0)
    {
        console.log("No result is found...");
        return res.send("No result is found...");
    }

    // CASE 2: found -> render
    else
    {
        console.log("Result is found, rendering...");
        return res.render('find', {musicList: MUSIC, musicResult: result, artistName: req.params.artistName});
    }
});


// add endpoint
app.get('/add/:index', (req, res) =>
{
    console.log("Request received at the /add endpoint...")

    const index = req.params.index;

    let flag = null;

    // error handling
    if (index < 0 || index > MUSIC.length)
    {
        console.log("Index is out of range...");
        flag = false;
    }

    else
    {
        // O(1) search from the dictionary
        console.log("Song added to the playlist...");
        PLAYLIST.push(MUSIC[index]);
        flag = true;
    }

    return res.render('add', {myFlag: flag});
});


// playlist endpoint
app.get('/playlist', (req, res) =>
{
    let myFlag = null;

    // checks if the playlist is empty or not
    if (PLAYLIST.length === 0)
    {
        myFlag = false;
    }
    else
    {
        myFlag = true;
    }

    return res.render('playlist', {myPlayList: PLAYLIST, playListFlag: myFlag});

});





// Start the server
app.listen(port, () => 
{
   console.log(`Server is running on port ${port}...`)
});