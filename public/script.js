var numPage=0;
async function getData(id){
    let url = `/comics/${id}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

function onCreate(id){
    const data = getData(id);
    data.then(data=>{
        setData(data);
    })
}

function setData(data){
    numPage=data.num;
    document.getElementById("title").innerText=data.title;
    let imageContent=document.createElement("img");
    imageContent.setAttribute("src", data.img);
    imageContent.setAttribute("alt", data.alt);
    document.getElementById("display-content").innerHTML="";
    document.getElementById("display-content").appendChild(imageContent);

    // let p1=document.createElement("p");
    // p1.innerText="Permanent Link to this comic: ";
    // let aTag1=document.createElement("a");
    // aTag1.setAttribute("href", "https://xkcd.com/"+data.num);
    // aTag1.innerText="https://xkcd.com/"+data.num;
    // document.getElementById("link").innerHTML="";
    // document.getElementById("link").appendChild(p1).appendChild(aTag1);
    
    // let p2=document.createElement("p");
    // p2.innerText="Image URL (for hotlinking/embedding): ";
    // let aTag2=document.createElement("a");
    // aTag2.setAttribute("href", data.img);
    // aTag2.innerText=data.img;
    // document.getElementById("url-image").innerHTML="";
    // document.getElementById("url-image").appendChild(p2).appendChild(aTag2);
}

function getFront(){
    numPage=0;
    const data= getData(numPage);
    setData(data);
}

function prev(){
    numPage--;
    if(numPage <= 0){
        numPage=0;
    }
    const data= getData(numPage);
    data.then(data=>{
        console.log(data);
        setData(data);
    })
}

  