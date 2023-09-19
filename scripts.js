// Declara as variáveis de latitude e longitude no escopo global
var latitude;
var longitude;

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
            zoom: 10, // Nível de zoom (0 a 21)
        };

        // Cria o objeto do mapa
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

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

// Exemplo de como carregar um arquivo GeoJSON usando fetch
fetch('ucn_recife.geojson')
  .then(response => response.json())
  .then(data => {
    // Agora 'data' contém os dados GeoJSON

    // Aqui, você deve adicionar os polígonos ao mapa
    data.features.forEach(feature => {
      const geometry = feature.geometry;

      if (geometry.type === 'MultiPolygon') {
        // Se for um MultiPolygon, crie polígonos no mapa
        const coordinates = geometry.coordinates;

        coordinates.forEach(polygonCoordinates => {
          // Criar um polígono no mapa sem preenchimento
          const polygon = new google.maps.Polygon({
            paths: polygonCoordinates[0].map(coord => ({ lat: coord[1], lng: coord[0] })),
            map: map,
            strokeColor: 'blue', // Cor da borda (azul)
            strokeWeight: 2, // Espessura da borda
          });
        });
      }
    });
  })
  .catch(error => {
    console.error('Erro ao carregar o arquivo GeoJSON:', error);
  });