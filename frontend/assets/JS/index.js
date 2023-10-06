
let works = ("http://localhost:5678/api/works");
let categories = ("http://localhost:5678/api/categories");

const gallery = document.getElementById('gallery')
const portfolio = document.querySelector('#portfolio');

async function getWorks() {
    const response = await fetch(works) 
    const responseWork = await response.json()

for (let i = 0 ; i < responseWork.length; i++){
console.log(responseWork [i])
}}

getWorks()

async function getCategories() {
    const response = await fetch(categories) 
    const responseCategorie = await response.json()

for (let i = 0 ; i < responseCategorie.length; i++){
console.log(responseCategorie [i])
}}

getCategories()


/* for (let i = 0; i < ######.length; i++) {
const imageElement = document.createElement("img");
imageElement.src = idk.image;
#####.appendChild(###); */

