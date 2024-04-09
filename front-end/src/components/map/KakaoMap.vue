<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "MultipleMarkersMap",
  props: ['name'],
  data() {
    return {
      markers: []
    }
  },
  async mounted() {
    await this.getMarker();

    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      this.loadKakaoMap();
    }
  },
  methods: {
    loadKakaoMap() {
      const script = document.createElement('script');

      /* global kakao */
      script.onload = () => this.initMap();
      script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=	b9a141fcf540b8f0fc3f7a46c97671d1';
      document.head.appendChild(script);
    },
    initMap() {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.566535, 126.9779692),
        level: 9
      };

      var map = new kakao.maps.Map(container, options);
      console.log(this.markers);
      this.markers.forEach((markerData) => {
        var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(markerData.lat, markerData.lng),
          title: markerData.name,
          clickable: true
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          var infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:2px; font-size:10px">${markerData.name}<br>
              ${markerData.addr}</div>`,
            removable: true
          });

          infowindow.open(map, marker);
        });
      });

      
      var mapTypeControl = new kakao.maps.MapTypeControl();

      map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
      var zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    },
    async getMarker() {
      try {
        const res = await axios.get(`http://localhost:3001/cafe/${this.name}`);
        
        //forEach, 
        res.data.map((marker) => ( this.markers.push({
          name: marker.bplcnm,
          lat: parseFloat(marker.x),
          lng: parseFloat(marker.y),
          addr: marker.sitewhladdr
        })));
        console.log(res.data);
      } catch (err) {
        console.error("마커를 받아오는 도중 문제가 생김", err);
      }
    }
  }
};
</script>

<style scoped>
#map {
  max-width: 100%;
  height: 400px;
  margin: 20px;
}
</style>
