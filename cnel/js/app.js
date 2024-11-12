
let horario = null;

function getJson(url, callback) {
    horario = null;
    fetch(url)
        .then(response => response.json())
        .then(json => callback(null, json))
        .catch(error => callback(error, null))
}

function callbackJson(error, data) {
    if (error) {
        console.log(error);
    } else {
        horario = data;
        console.log(horario);
        printCnel();
    }
}

function printCnel(){
    const cnel = document.getElementById("cnel");
    cnel.innerHTML = "";
    let dia = "";
    const items = horario.notificaciones[0].detallePlanificacion;
    //console.log(items);
    let itemsCnel = null;
    for (let index = 0; index < items.length; index++) {
        const item = horario.notificaciones[0].detallePlanificacion[index];
        //console.log(item);
        //console.log(index);
        const divCnel = document.createElement('div');
        if(dia !== item.fechaCorte){
            const divItem = document.createElement('div');
            divItem.classList.add("timeline__item")
            dia = item.fechaCorte;
            divCnel.innerHTML = printDay(dia, index);
            cnel.appendChild(divCnel);
            itemsCnel = document.getElementById("itemsCnel"+index);
            console.log(itemsCnel);
            divItem.innerHTML = printHours(item.horaDesde, item.horaHasta);
            itemsCnel.appendChild(divItem);
        }else{
            const divItem = document.createElement('div');
            divItem.classList.add("timeline__item")
            console.log(itemsCnel);
            divItem.innerHTML = printHours(item.horaDesde, item.horaHasta);
            itemsCnel.appendChild(divItem);
        }
        cnel.appendChild(divCnel);
    }
    dia="";
    for (let index = 0; index < items.length; index++) {
        const item = horario.notificaciones[0].detallePlanificacion[index];
        if(dia !== item.fechaCorte){
            dia = item.fechaCorte;
            printTimeline(index);
        }
    }
}

function printPlace(lugar){
    console.log("ff");
    const cnel = document.getElementById("cnelPlace");
    cnel.innerHTML = "";
    const divCnel = document.createElement('div');
    const card = ''+
    '   <div class="container">'+
    '       <h2>Horarios de: '+lugar+'</h2>'+
    '   </div>';
    divCnel.innerHTML = card;
    cnel.appendChild(divCnel);
}

function printDay(dia, index){
    const card = ''+
    '   <div class="container">'+
    '       <h4>'+dia+'</h4>'+
    '   </div>'+
    '   <div id="timeline'+index+'" class="timeline" data-vertical-start-position="left" data-vertical-trigger="150px">'+
    '       <div class="timeline__wrap">'+
    '           <div class="timeline__items" id="itemsCnel'+index+'">'+
    '           </div>'+
    '       </div>'+
    '   </div>';
    return card;
}

function printHours(inicio, fin){
    const ini = parseInt(inicio, 10);
    const end = parseInt(fin, 10);

    if(ini==0){
        inicio="Media Noche";
    }else if(ini > 0 && ini <= 6){
        inicio=ini+" De La Madrugada";
    }else if(ini >= 7 && ini <= 11){
        inicio=ini+" De La Mañana";
    }else if(ini == 12){
        inicio=ini+" De La Tarde";
    }else if(ini > 12 && ini <= 18){
        inicio=ini-12+" De La Tarde";
    }else if(ini >= 19 && ini <= 23){
        inicio=ini-12+" De La Noche";
    }
    
    if(end==0){
        fin="Media Noche";
    }else if(end > 0 && end <= 6){
        fin=end+" De La Madrugada";
    }else if(end >= 7 && end <= 11){
        fin=end+" De La Mañana";
    }else if(end == 12){
        fin=end+" De La Tarde";
    }else if(end > 12 && end <= 18){
        fin=end-12+" De La Tarde";
    }else if(end >= 19 && end <= 23){
        fin=end-12+" De La Noche";
    }
    const card = ''+
    '   <div class="timeline__content">'+
    '       <p>Sin luz:</p>'+
    '       <p> Desde: <b>'+inicio+'</b>, hasta: <b>'+fin+'</b></p>'+
    '   </div>';
    return card;
}

function printTimeline(index){
    const timeline="#timeline"+index;
    this.timeline(document.querySelectorAll(timeline));
}


function clickPage(e) {
    e.preventDefault();
    document.querySelectorAll(".nav-link").forEach((a) => {
        a.classList.remove("active");
    });
    printPlace(e.target.innerHTML);
    if (e.target.id == "LaJoya") {
        getJson("https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/0911799591/IDENTIFICACION", callbackJson);
    } else {
        getJson("https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/0905577201/IDENTIFICACION", callbackJson);
    }
    e.target.classList.add("active");
}

function setLinkPage() {
    document.querySelectorAll(".nav-link").forEach((item) => {
        item.removeEventListener("click", clickPage);
        item.addEventListener("click", clickPage);
    });
}
