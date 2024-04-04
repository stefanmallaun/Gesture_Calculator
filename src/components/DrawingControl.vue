<template>
  <section>
    <label for="drawfeature"><b>Choose a warhead yield for the TSAR BOMBA</b></label>
    <select name="drawfeature" v-model="selected">
      <option disabled value="">Please select one</option>
      <option v-for="(type, key) in allowedFeatures" :key="key" :value="type">{{ type }}</option>
    </select>
    <button :disabled="!hasActiveLayers" type="button" @click="clear">Clear</button>
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div>
        <label for="tonnenTNT">How much Tons of TNT (in Kilo Tons):</label>
        <input type="number" id="tonnenTNT" v-model="tonnenTNT">
      </div>
      <button @click="confirmInputs">Confirm</button>
      <div class="table-container">
      <table v-if="radii.length > 0">
        <thead>
          <tr>
            <th>Circle Type</th>
            <th>Radius (meters)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(radius, index) in radii" :key="index" :class="getRowColorClass(index)">
            <td>{{ radius.type }}</td>
            <td>{{ radius.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
  import Draw from 'ol/interaction/Draw'
  import LayerGroup from 'ol/layer/Group'
  import VectorLayer from 'ol/layer/Vector'
  import VectorSource from 'ol/source/Vector'
  import Collection from 'ol/Collection'
  import Circle from 'ol/geom/Circle'
  import axios from 'axios'; // Import Axios for HTTP requests
  import Style from 'ol/style/Style';
  import Fill from 'ol/style/Fill';
  import Stroke from 'ol/style/Stroke';


  export default {
    name: 'DrawingControl',
    props: {
      layerGroup: LayerGroup,
      interactions: Collection
    },
    data: () => ({
      allowedFeatures: [], // Example data, adjust as needed
      selected: '',
      hasActiveLayers: false,
      radii: [],
    }),
    mounted() {
      this.fetchAllowedFeatures();
      this.vector = new VectorLayer({
        source: new VectorSource({ wrapX: false })
      });
      this.layerGroup.getLayers().push(this.vector);
    },
    watch: {
      selected(value) {
        this.toggleInteraction(value);
      }
    },
    methods: {
      getRowColorClass(index) {
        const colors = ['row-color-1', 'row-color-2', 'row-color-3', 'row-color-4', 'row-color-5', 'row-color-6']; 
        return colors[index % colors.length]; 
      },
      calculateRadii(type) {
    const index = this.allowedFeatures.indexOf(type);
    if (index !== -1) {
      const tonnen = this.tonnenTNTList[index];
      this.radii = [
        
        { type: 'Fireball Circle', value: tonnen + 500 },
        { type: 'Heavy Blast Damage Circle', value: tonnen + 2000 },
        { type: 'Radiation Circle', value: tonnen + 2500 },
        { type: 'Moderate Blast Damage Circle', value: tonnen + 6000 },
        { type: 'Thermal Radiation Circle', value: tonnen + 13250 },
        { type: 'Light Blast Damage Circle', value: 15000 + tonnen }
      ];
    } else {
      this.radii = [];
    }},
      confirmInputs() {
        const data = {
          name: this.name,
          tonnenTNT: this.tonnenTNT,
        };
        
        axios.post('http://localhost:5000/save_inputs', data)
          .then(response => {
            console.log(response.data.message);
            window.location.reload();
          })
          .catch(error => {
            console.error('Error saving inputs:', error);
          });
      },
      fetchAllowedFeatures() {
    axios.get('http://127.0.0.1:5000/get_allowed_features')
        .then(response => {
            // Assuming the response contains an array of objects with 'name' attribute
            this.allowedFeatures = response.data.map(entry => entry.name);
            this.tonnenTNTList = response.data.map(entry => entry.tonnenTNT);
        })
        .catch(error => {
            console.error('Error fetching allowed features:', error);
        });
      },
      toggleInteraction(type) {
      
      this.interactions.remove(this.radiationCircle);
      this.interactions.remove(this.fireBallCircle);
      this.interactions.remove(this.heavyBlastDamageCircle);
      this.interactions.remove(this.ModerateBlastDamageCircle);
      this.interactions.remove(this.LightBlastDamageCircle);
      this.interactions.remove(this.ThermalRadiationCircle);
      if (type && type !== 'None') {
          // Draw for Radiation Circle
          const index = this.allowedFeatures.indexOf(type);
          this.calculateRadii(type);
          if (index !== -1) {
            
            const tonnen = this.tonnenTNTList[index];
            
          this.radiationCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              
              const RadiationRadius = tonnen + 2500; // in meters

              if (!geometry) {
                geometry = new Circle(center, RadiationRadius);
              }

              geometry.setCenterAndRadius(center, RadiationRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(50, 50, 0, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(50, 50, 0, 0.9)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
          });

          // Draw for FireBall Circle
          this.fireBallCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              
              const FireBallRadius = tonnen + 500; // in meters

              if (!geometry) {
                geometry = new Circle(center, FireBallRadius);
              }

              geometry.setCenterAndRadius(center, FireBallRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(255, 0, 0, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, 0.9)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
          });

          // Draw for Heavy Blast Damage Circle
          this.heavyBlastDamageCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              const HeavyBlastDamageRadius = tonnen + 2000; // in meters

              if (!geometry) {
                geometry = new Circle(center, HeavyBlastDamageRadius);
              }

              geometry.setCenterAndRadius(center, HeavyBlastDamageRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(0, 0, 255, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(0, 0, 255, 0.9)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
          });

          // Draw for Moderate Blast Damage Circle
          this.ModerateBlastDamageCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              const ModerateBlastDamageRadius = tonnen + 6000; // in meters

              if (!geometry) {
                geometry = new Circle(center, ModerateBlastDamageRadius);
              }

              geometry.setCenterAndRadius(center, ModerateBlastDamageRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(0, 0, 100, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(0, 0, 100, 0.8)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
 
          });
          

          // Draw for Thermal Radiation Circle
          this.ThermalRadiationCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              const ThermalRadiationRadius = tonnen + 13250;

              if (!geometry) {
                geometry = new Circle(center, ThermalRadiationRadius);
              }

              geometry.setCenterAndRadius(center, ThermalRadiationRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(150, 0, 0, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(255, 0, 0, 0.9)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
          });

          // Draw for Light Blast Damage Circle
          this.LightBlastDamageCircle = new Draw({ 
            source: this.vector.getSource(), 
            type: 'Circle',
            geometryFunction: function(coordinates, geometry) {
              const center = coordinates[0];
              const LightBlastDamageRadius = 15000 + tonnen;// in meters

              if (!geometry) {
                geometry = new Circle(center, LightBlastDamageRadius);
              }

              geometry.setCenterAndRadius(center, LightBlastDamageRadius);

              return geometry;
            },
            style: new Style({
            fill: new Fill({
              color: 'rgba(0, 0, 20, 0.1)', // Red color with 20% opacity
            }),
            stroke: new Stroke({
              color: 'rgba(0, 0, 20, 0.9)', // Red color with 80% opacity
              width: 2, // Adjust stroke width as needed
              }),
            }),
          });

          this.interactions.push(this.radiationCircle);
         
          
          this.radiationCircle.once('drawstart', () => this.hasActiveLayers = true);
          this.radiationCircle.once('drawend', () => this.hasActiveLayers = true);
          this.interactions.extend([this.LightBlastDamageCircle, this.ThermalRadiationCircle, this.ModerateBlastDamageCircle, this.radiationCircle, this.heavyBlastDamageCircle, this.fireBallCircle]);
          
          
          
          
        }
      }
      },
      toggleMapCursor(active) {
        if (this.radiationCircle && this.radiationCircle.getMap()) {
          this.radiationCircle.getMap().getViewport().style.cursor = active ? 'default' : '';
        }
      },
      clear() {
        this.toggleMapCursor(true);
        this.selected = '';
        this.hasActiveLayers = false
        this.vector.getSource().clear();
      }
    }
  }
</script>

<style scoped>

.table-container {
  max-width: 10vw; /* Adjust the max-width as needed */
  margin: 0 auto; /* Center the container horizontally */
  overflow-x: auto; /* Enable horizontal scrolling if the table exceeds the container width */
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 12px; /* Adjust the font size as needed */
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ddd;
}



</style>
