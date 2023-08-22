import { ref, onMounted, computed } from 'vue'

export default function useCripto() {
    let criptoMonedas = ref([])

    let monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    let cotizacion = ref({})
    let cargando = ref(false)

    onMounted(() => {
      let url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      fetch(url)
        .then(resp => resp.json())
        .then(({Data}) => criptoMonedas.value = Data)
    })

    let obtenerCotizacion = async (cotizar) => {
        cargando.value = true
        cotizacion.value = {}
        try {
          let { moneda, cripto} = cotizar
          let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
          let respuesta = await fetch(url)
          let data = await respuesta.json()
    
          cotizacion.value = data.DISPLAY[cripto][moneda]
        } catch (error) {
          console.log(error)
        } finally {
          cargando.value = false
        }    
    }

    let mostrarResultado = computed(() => {
      return Object.values(cotizacion.value).length > 0
    })
      
    return {
        monedas,
        criptoMonedas,
        cargando,
        cotizacion,
        obtenerCotizacion,
        mostrarResultado
    }
}