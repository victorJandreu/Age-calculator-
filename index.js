
const form = document.getElementById("form")
const dayEl = document.getElementById("day")
const monthEl = document.getElementById("month")
const yearEl = document.getElementById("year")
let yearElValue = ``



let fechaSeleccionada = ``
let problema = false
let fechaActual = new Date();
fechaActual =`${fechaActual.getMonth() + 1}-${fechaActual.getDate()}-${fechaActual.getFullYear()}`


form.addEventListener("submit", function(e){
    yearElValue = yearEl.value
    problema = false

    e.preventDefault()
    removeStyles(document.body);
    removeAdvertParragraf()
    checkIsNumberDate()
    if(problema) return
    fechaSeleccionada = `${monthEl.value}-${dayEl.value}-${yearElValue}`
    checkInsertDate()
    if(problema) return
    compareDate(fechaActual, fechaSeleccionada)
})


function removeStyles(el) {
    el.removeAttribute('style')
    el.childNodes.forEach(x => {
        if(x.nodeType == 1) removeStyles(x)
    })
}

function removeAdvertParragraf(){
   let advert =  document.body.querySelectorAll(".advert")
   if(advert.length > 0) {
    for(let i = 0; i < advert.length; i++){
        advert[i].remove()
    }
   }
}




// Comprobar si hay numeros en los datos introducidos

function checkIsNumberDate(){
   existNumber(dayEl)
   existNumber(monthEl)
   existNumber(yearEl)
}

function existNumber(id){
    if(!id.value || isNaN(Number(id.value)) ) {
        problema = true
        changeColorAndAddText(id, "insert a number")
    } 
}



// COMPROBAR QUE LA FECHA EXISTE Y QUE NO ES EN EL FUTURO


function checkInsertDate(){
    const monthElNumber = Number(monthEl.value)
    const dayElNumber = Number(dayEl.value)
    const yearElNumber = Number(yearElValue)
    if(monthElNumber <= 0 || monthElNumber > 12) {
        changeColorAndAddText(monthEl, "number must be 1-12")
        problema = true
    }
    if(yearElNumber < 100 ) {
        changeColorAndAddText(yearEl, "year must be after 100")
        problema = true
    }
    if(dayElNumber <= 0 || dayElNumber > 31) {
        changeColorAndAddText(dayEl, "day must be 1-31")
        problema = true
    }

    if(problema) return
    if(dayElNumber > numDaysInMonth(monthEl.value)) {
        changeColorAndAddText(dayEl, `day must be 1-${numDaysInMonth(monthEl.value)}`)
        problema = true
    }
    if(problema) return
   

    if(new Date (fechaSeleccionada) >  new Date()) {
        changeColorAndAddText(dayEl, "Please use a past Date not a future Date", "section")
        changeColorAndAddText(monthEl, "")
        changeColorAndAddText(yearEl, "")
        problema = true
    }
    
}

function numDaysInMonth(m) { return new Date(0, m, 0).getDate();
}



// COMPARAR FECHAS



function compareDate(fechaMayor, fechaMenor){
    

    date1 = new Date(fechaMayor)
    date2 = new Date(fechaMenor)

   const DateTime = date1.getTime()
   const DateTime2 = date2.getTime()

   const finalDate = new Date(DateTime - DateTime2)
   const formatedFinalDate = `${finalDate.getDate()}-${finalDate.getMonth() + 1}-${finalDate.getFullYear()}`
   const arrayFinalDate = formatedFinalDate.split("-")
   const days_passed = Number(Math.abs(arrayFinalDate[0]) - 1);
    const months_passed = Number(Math.abs(arrayFinalDate[1]) - 1);
    const years_passed = Number(Math.abs(arrayFinalDate[2]) - 1970);


    const yrsTxt = ["year", "years"];
    const mnthsTxt = ["month", "months"];
    const daysTxt = ["day", "days"];

    const yearSpan = document.getElementById("numberYears")

    //Convert to days and sum together
    const total_days = (years_passed * 365) + (months_passed * 30.417) + days_passed;

    //display result with custom text

    let container = document.getElementById("numbers"); 
             
    while(container.firstChild) { 
        container.removeChild(container.firstChild); 
    } 

   insertCorrectDiferrenceDate(years_passed, "year")
   insertCorrectDiferrenceDate(months_passed, "month")
   insertCorrectDiferrenceDate(days_passed, "day")

}

function insertCorrectDiferrenceDate(valor, texto){
    let container = document.getElementById("numbers"); 
    if(valor == 0) {
        let parrafo = document.createElement("p")
        parrafo.innerHTML = `<p id="numberYears"><span class="dateValue">--</span> ${texto}s</p>`
        container.appendChild(parrafo)
    } else if(valor == 1) {
        let parrafo = document.createElement("p")
        parrafo.innerHTML = `<p id="numberYears"><span class="dateValue">${valor}</span> ${texto}</p>`
        container.appendChild(parrafo)
    
    } else {
        let parrafo = document.createElement("p")
        parrafo.innerHTML = `<p id="numberYears"><span class="dateValue">${valor}</span> ${texto}s</p>`
        container.appendChild(parrafo)
    }
}



// CAMBIAR COLOR Y AÑADIR PARRAFO

function changeColorAndAddText(id, text, padre = "div"){
    id.style.borderColor = "hsl(0, 100%, 67%)"
    const padreDiv = id.closest(padre)
    const parrafo = document.createElement("p")
    parrafo.classList.add("advert")
    parrafo.textContent = text
    if(padre === "div") {
        const label = padreDiv.querySelector("label").style.color = "hsl(0, 100%, 67%)"
        padreDiv.appendChild(parrafo)
    } else if (padre === "section"){
        padreDiv.after(parrafo)
    }
   
    
    
}