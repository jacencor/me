
let horario = null;
const url1="https://api.cnelep.gob.ec/servicios-linea/v1/notificaciones/consultar/"

function init(){
    setLinkPage();
}

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
        printPlace(" Cortes de luz...");
        printError("Para variar, hay problemas al consultar al CNEL...");
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
    const noti  = horario.notificaciones;
    let itemsCnel = null;
    for (let indexA = 0; indexA < noti.length; indexA++){
        console.log(indexA);
        const items = horario.notificaciones[indexA].detallePlanificacion;
        if( 0 == items.length){
            const divCnel = document.createElement("div");
            const error = "Para variar, No hay horarios registrados aun por CNEL...";
            divCnel.innerHTML = printDay(noti[indexA].direccion, error, "0-0");
            cnel.appendChild(divCnel);
        }
        for (let index = 0; index < items.length; index++) {
            const item = horario.notificaciones[indexA].detallePlanificacion[index];
            const divCnel = document.createElement("div");
            if(dia !== item.fechaCorte){
                const divItem = document.createElement("div");
                divItem.classList.add("timeline__item");
                dia = item.fechaCorte;
                divCnel.innerHTML = printDay(noti[indexA].direccion, dia, indexA+"-"+index);
                cnel.appendChild(divCnel);
                itemsCnel = document.getElementById("itemsCnel"+indexA+"-"+index);
                console.log(itemsCnel);
                divItem.innerHTML = printHours(item.horaDesde, item.horaHasta);
                itemsCnel.appendChild(divItem);
            }else{
                const divItem = document.createElement("div");
                divItem.classList.add("timeline__item");
                console.log(itemsCnel);
                divItem.innerHTML = printHours(item.horaDesde, item.horaHasta);
                itemsCnel.appendChild(divItem);
            }
            cnel.appendChild(divCnel);
        }
    }
    
    dia="";
    for (let indexA = 0; indexA < noti.length; indexA++){
        const items = horario.notificaciones[indexA].detallePlanificacion;
        for (let index = 0; index < items.length; index++) {
            const item = horario.notificaciones[indexA].detallePlanificacion[index];
            if(dia !== item.fechaCorte){
                dia = item.fechaCorte;
                printTimeline(indexA+"-"+index);
            }
        }
    }
    printPlace("Cortes de luz...");
}

function printPlace(lugar){
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

function printDay(lugar, dia, index){
    let card = '';
    if(index.includes("-0")){
        card = card +
        '   <div class="container">'+
        '       <h4>'+lugar+'</h4>'+
        '   </div>';
    }
    card = card +
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
        fin="Medio día";
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

function setLinkPage() {
    document.getElementById("searchForm").addEventListener("submit", searchProduct);
}

const searchProduct = function (e) {
    e.preventDefault();
    const search = cleanSearch(document.getElementById("searchInput").value);
    if(search==atob("Sk9ZQQ==")){
        getJson(url1+atob("MDkxMTc5OTU5MQ==")+"/IDENTIFICACION", callbackJson);
        printPlace(atob("Sk9ZQQ=="));
    }else if(search==atob("VFJJVU5GTw==")){
        getJson(url1+atob("MDkwNTU3NzIwMQ==")+"/IDENTIFICACION", callbackJson);
        printPlace(atob("VFJJVU5GTw=="));
    }else if(search==atob("U0FNQU5FUw==")){
        getJson(url1+atob("MTMwMzUwNDY0OQ==")+"/IDENTIFICACION", callbackJson);
        printPlace(atob("U0FNQU5FUw=="));
    }else if(isValidCI(search)){
        getJson(url1+search+"/IDENTIFICACION", callbackJson);
        
    }else{
        console.log("fail!");
        printPlace(" Cortes de luz...");
        printError("Cédula invalida...");
    }
}

function printError(error){
    const cnel = document.getElementById("cnel");
    cnel.innerHTML = "";
    const pCnel = document.createElement("p");
    pCnel.classList.add("card-text")
    pCnel.innerHTML = error;
    cnel.appendChild(pCnel);
}

function cleanSearch(words) {
    return words.toUpperCase()
        .normalize('NFD')
        .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi, "$1")
        .normalize();
}

/**
 * Comprueba si el número de cédula ingresado es valido.
 * @param  {string|integer}  ci Número de cédula
 * @return {Boolean}
 */
function isValidCI(ci) {
	var isNumeric = true;
	var total = 0, 
		individual;	

	for (var position = 0 ; position < 10 ; position++) {
		// Obtiene cada posición del número de cédula
		// Se convierte a string en caso de que 'ci' sea un valor numérico
		individual = ci.toString().substring(position, position + 1)

		if(isNaN(individual)) {
			console.log(ci, position,individual, isNaN(individual))
			isNumeric=false;				
			break;			
		} else {
			// Si la posición es menor a 9
			if(position < 9) {
				// Si la posición es par, osea 0, 2, 4, 6, 8.
				if(position % 2 == 0) {
					// Si el número individual de la cédula es mayor a 5
					if(parseInt(individual)*2 > 9) {
						// Se duplica el valor, se obtiene la parte decimal y se aumenta uno 
						// y se lo suma al total
						total += 1 + ((parseInt(individual)*2)%10);
					} else {
						// Si el número individual de la cédula es menor que 5 solo se lo duplica
						// y se lo suma al total
						total += parseInt(individual)*2;
					}
				// Si la posición es impar (1, 3, 5, 7)
				}else {
					// Se suma el número individual de la cédula al total
					total += parseInt(individual);		    		
				}
			} 
		}
	}

	if((total % 10) != 0) {
		total =  (total - (total%10) + 10) - total;		
	} else {
		total = 0 ; 	
	}


	if(isNumeric) {	
		// El total debe ser igual al último número de la cédula
		console.log(ci, total, individual);
		console.log(ci, typeof ci, ci.length)
		// La cédula debe contener al menos 10 dígitos
		if(ci.toString().length != 10) { 
			console.log("La c\u00E9dula debe ser de: 10 d\u00EDgitos.");
			return false; 
		}

		// El número de cédula no debe ser cero
		if (parseInt(ci, 10) == 0) { 
			console.log("La c\u00E9dula ingresada no puede ser cero.");
			return false;
		}

		// El total debe ser igual al último número de la cédula
		if(total != parseInt(individual)) { 
			console.log("La c\u00E9dula ingresada no es v\u00E1lida.");
			return false;
		} 

		console.log("cédula válida");
		return true;			
	}

	// Si no es un número  
	console.log("El dato solo puede contener numeros.");
	return false;
}