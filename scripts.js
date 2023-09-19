// Declara as variáveis de latitude e longitude no escopo global
var latitude;
var longitude;

// Variável global para armazenar o mapa
var map;

// Função para receber latitude e longitude
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        
        // Após receber as coordenadas, chama a função para inicializar o mapa
        initMap();
    });
} else {
    // Problema na localização
    alert("Não foi possível usar a localização.");
}

// Função para inicializar o mapa
function initMap() {
    // Verifica se as coordenadas estão definidas
    if (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') {
        // Cria um objeto LatLng com as coordenadas
        var coordenadas = new google.maps.LatLng(latitude, longitude);

        // Opções de configuração do mapa
        var mapOptions = {
            center: coordenadas,
            zoom: 15, // Nível de zoom (0 a 21)
        };

        // Cria o objeto do mapa e atribui à variável global map
        map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Adiciona um marcador para indicar a localização
        var marker = new google.maps.Marker({
            position: coordenadas,
            map: map,
            title: 'Você está aqui'
        });
    } else {
        alert("Latitude e/ou longitude não definidas.");
    }
}

fetch('academiadacidade.json')
  .then(response => response.json())
  .then(data => {
    // Agora você tem acesso aos dados do JSON
    console.log(data)
    // Vamos percorrer os registros e criar marcadores no mapa
    data.records.forEach(record => {
      const latitude = record.latitude;
      const longitude = record.longitude;

      if (latitude && longitude) {
        // Crie um objeto LatLng com as coordenadas
        const coordenadas = new google.maps.LatLng(latitude, longitude);

        // Opções de configuração do marcador
        const markerOptions = {
          position: coordenadas,
          map: map, // Usa a variável global map aqui
          title: record.nome_oficial // Use o nome oficial como título do marcador
        };

        // Crie o marcador
        const marker = new google.maps.Marker(markerOptions);
      }
    });
  })
  .catch(error => {
    console.error('Erro ao obter dados do JSON: ', error);
  });
