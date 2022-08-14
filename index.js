import {data} from "./data.js";

const container = document.querySelector("#container");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const reload = document.querySelector(".reload");
const button = document.querySelector("button");
let vie = 10;
let arr = [];
let newArr = [];
let score = 0;
let bestScore ;

// changement aleatoire de la position des objets dans le tableau
data.sort(() => 0.5 - Math.random());

// fonction permettant de creer des div et images dans le container
function newDivImage (){
    for(let i = 0; i < data.length; i++){
        const card = document.createElement("div");
        const image = document.createElement("img");
        container.appendChild(card);
         card.setAttribute("myId", i);
         card.classList.add("backgroundCard");
         image.setAttribute("myIdImage", `l${i}`);
         image.setAttribute("src", data[i].img);
         image.setAttribute("alt", data[i].name);
         image.classList.add("image");
         card.appendChild(image);  
    }
}
newDivImage ();

const card = document.querySelectorAll(".backgroundCard");


    for (let i = 0; i < card.length; i++){
        card[i].addEventListener("click", flipcard);
     }
    
function flipcard (e){
        let myId = parseInt(e.target.getAttribute("myId")); 
        e.target.style.backgroundColor = "white";
        document.querySelector(`[myIdImage = l${myId}]`).style.visibility = "visible";
        arr.push(data[myId].name);
        newArr.push(myId);
        console.log(arr);
      //  console.log(newArr);
        console.log(container.children.length);
        if (arr.length == 2 & newArr.length == 2){
            if (arr[0] == arr[1]) {
                score += 5;
                h1.innerText = `score:${score}`;
                setTimeout(()=>{
                    removeCard(newArr[0], newArr[1]);
                    newArr.map(item => card[item].style.visibility = "hidden");
                    newArr = [];
                }, 400);
            }
            else
            {
                vie--;
                h2.innerText = `vie: ${vie}`;
                setTimeout(()=>{
                removeCard(newArr[0], newArr[1]);
                newArr.map(item => card[item].style.backgroundColor = "greenyellow");
                newArr = [];
                 },400);
            }
            arr = [];
        }

        if (vie == 0) {
            bestScore = score;

            for (let i = 0; i < card.length; i++){
                card[i].removeEventListener("click", flipcard);
             }
            setTimeout(() =>{
                reload.style.top = "100px";
                reload.style.transition = "top ease-in-out 0.4s";
                document.querySelector(".span").innerText = `Best Score: ${bestScore}`;
            }, 400);
        }
        if (score == 80) {
            setTimeout(() =>{
                reload.style.top = "100px";
                reload.style.transition = "transform ease-in-out 0.4s";
                document.querySelector(".span").innerText = `Congratulation`;
            }, 400);
        }
       
        // permet d'arreter l'evenement passer au parent des images
        document.querySelector(`[myIdImage = l${myId}]`).onclick = (e)=>{
                e.stopPropagation();
        }
    
}


function removeCard (item1, item2) {
  document.querySelector(`[myIdImage = l${item1}]`).style.visibility = "hidden";
  document.querySelector(`[myIdImage = l${item2}]`).style.visibility = "hidden";
  
}

// button onclick to refresh a page

button.onclick = () =>{
    history.go(0);
}