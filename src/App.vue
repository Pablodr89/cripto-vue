<script setup>
  import { ref, reactive } from 'vue'
  import Alerta from './components/Alerta.vue'
  import Spinner from './components/Spinner.vue'
  import MostrarResultado from './components/MostrarResultado.vue'
  import useCripto from './composables/useCripto'

  let { monedas, criptoMonedas, cargando, cotizacion, obtenerCotizacion, mostrarResultado } = useCripto()

  let cotizar = reactive({
    moneda: '',
    cripto: ''
  })

  let error = ref('')
  
  let cotizarCripto = () => {
    //Validar formulario
    if(Object.values(cotizar).includes('')) {
      error.value = 'Todos los campos son obligatorios'
      setTimeout(() => {
        error.value = ''
      },3000)
      return
    }
    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">

      <Alerta v-if="error">
        {{ error }}
      </Alerta>

      <form class="formulario" @submit.prevent="cotizarCripto">

        <div class="campo">

          <label for="moneda">Moneda:</label>
          <select id="moneda" v-model="cotizar.moneda">
            <option value="">-- Selecciona --</option>  
            <option v-for="moneda in monedas" :value="moneda.codigo">{{ moneda.texto }}</option>
          </select>

          <label for="cripto">Criptomoneda:</label>
          <select id="cripto" v-model="cotizar.cripto">
            <option value="">-- Selecciona --</option> 
            <option v-for="cripto in criptoMonedas" :value="cripto.CoinInfo.Name">{{ cripto.CoinInfo.FullName }}</option> 
          </select>

        </div>

        <input type="submit" value="Cotizar">
      </form>

      <Spinner v-if="cargando"/>
      <MostrarResultado v-if="mostrarResultado" :cotizacion="cotizacion"/>
    </div>
  </div>
</template>
