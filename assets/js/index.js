const formulario = document.querySelector("#formulario")

const obtenerData =async(moneda)=>{
  try {
  const res = await fetch(`https://mindicador.cl/api/${moneda}`)
  const data = await res.json()
  return data
} catch (e) {
const errorSpan = document.getElementById("errorSpan");
errorSpan.innerHTML = `Algo salió mal! Error: ${e.message}`;
}

}

formulario.addEventListener("submit",async(event)=>{
  event.preventDefault()
  let monto = document.querySelector("#monto").value
  let moneda = document.querySelector("#moneda").value
  let result = await obtenerData(moneda)
  let fecha = result.serie.map(item => item.fecha.slice(0, 10))
  let valores = result.serie.map(item => item.valor)
  
//conversion
  
  let conversion = monto / valores[0]  
  let montoRedondeado = Math.round(conversion * 100) / 100;
  
  document.getElementById("resultado").innerHTML = "Resultado: " + montoRedondeado + " " + moneda.toUpperCase();
  
  //Crear grafico
const crearGrafico = ()=>{
  const ctx = document.getElementById('myChart');

  // Reinicio de grafico al cambiar tipo de moneda
if (window.myChart instanceof Chart) {
  window.myChart.destroy();
}

window.myChart = new Chart(ctx, {
      type: 'line',
      data:  {
        labels: fecha.slice(0, 10),
        datasets: [{
          label: 'Historial últimos 10 días',
          data: valores,
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false
          }
        }
      },
    });
    ctx.style.backgroundColor='white'
  }
  crearGrafico()

}) 


