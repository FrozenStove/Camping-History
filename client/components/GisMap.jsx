import React, { Component } from "react";
// import HistoryCard from "./historyCard.jsx"

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./build/assets";

// Default import
// import WebMap from "@arcgis/core/WebMap";
import MapGis from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
// import Extent from "@arcgis/core/geometry/Extent";

// import Layer from "@arcgis/core/layers/Layer";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


// import { getService } from '@esri/arcgis-rest-feature-service';
// import { queryFeatures } from '@esri/arcgis-rest-feature-service';
// // import * as arcgisRest from '@esri/arcgis-rest-request';
// import { ApiKeyManager } from '@esri/arcgis-rest-request';


// https://developers.arcgis.com/javascript/latest/add-a-feature-layer/

// import { queryFeatures } from '@esri/arcgis-rest-feature-layer';

// import { queryFeatures } from "@esri/arcgis-rest-feature-service";
// import FeatureLayer from '@esri/arcgis-rest-feature-layer';
// import FeatureLayer from '@esri/lay'

// Namespace import
// import * as projection from "@arcgis/core/geometry/projection";



class GisMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        const apiKey = "AAPKec24e4d4b57446a980bc8938cccb1ed2bb1PKtJrlt66E8A6XVF3Ji_xxaVGFlYRw3gTHIphMe5arHUSFJCt2TpYzo7BSEyN";

        esriConfig.apiKey = apiKey

        // const authentication = ApiKeyManager.fromKey(apiKey);

        const map = new MapGis({
            basemap: "arcgis-topographic" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [-119, 37],
            zoom: 6,  // Sets the zoom LOD to 13
            container: "viewDiv" // Div element
        });

        // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html

        const popupCampSites = {
          "title": "Campgrounds",
          "content": "<b>Campground:</b> {Campground}<br><br><b>Type:</b> {TYPE}<br><br><b>Detail:</b> {DETAIL}"
        }

        const parcelLayer = new FeatureLayer({
            url: "https://services2.arcgis.com/AhxrK3F6WM8ECvDi/ArcGIS/rest/services/Campgrounds/FeatureServer/0",
            outFields: ["Campground", "TYPE", "DETAIL"],
            popupTemplate: popupCampSites,
        });

        map.add(parcelLayer);

        // const popupTrailheads = {
        //     "title": "Trailhead",
        //     "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
        //   }

        // const trailheads = new FeatureLayer({
        //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
        //     outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
        //     popupTemplate: popupTrailheads
        //   });

    
        //   map.add(trailheads);
        

        return (
            <div id="viewDiv">
            </div>
        )
    }
}



        // getService("https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0", {
        //     authentication
        // }).then((metadata) => {
        //     console.log('the get service',metadata);
        // })

        // queryFeatures({
        //     url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
        //     where: "UseType = 'Residential'",
        //     resultRecordCount: 1,
        //     authentication
        //   }).then((results) => {
        //     console.log('the query feature', results);
        //     map.add(results);
        //   })

        // new extent for the mapview where the spatialReference.wkid is 4326
        // const extent = new Extent({
        //     XMin: -13825738.0701,
        //     YMin: 3847010.1028,
        //     XMax: -12758434.5907,
        //     YMax: 5145851.7942,
        //     spatialReference: {
        //         wkid: 102100
        //     }
        // });

        // view.extent = extent;


        // const options = {
        //     url:
        //         "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
        //     where: "Species = 'Oak'"
        // };

        //   myQueryTask = new esri.tasks.QueryTask
        //   ("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Water_Network_Base_Map/MapServer/78");

        //   queryFeatures(options)
        //     .then(response => {
        //       console.log(response.features.length); // 500
        //     });
        // const queryGeometry = {
        //     x: -118.807,
        //     y: 34.002,
        //     spatialReference: {
        //         wkid: 4326
        //     }
        // };

        // arcgisRest
        //     .queryFeatures({
        //         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/LA_County_Parcels/FeatureServer/0",
        //         geometry: queryGeometry,
        //         geometryType: "esriGeometryPoint",
        //         spatialRel: "esriSpatialRelIntersects",
        //         authentication
        //     })
        //     .then((response) => {
        //         console.log(response.features);
        //         document.getElementById("viewDiv").textContent = JSON.stringify(response.features, null, 2);
        //     });
export default GisMap;