import React, { Component } from "react";
import HistoryCard from "./historyCard.jsx"

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./build/assets";

// Default import
import WebMap from "@arcgis/core/WebMap";
import MapGis from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent";

// import layer from "@es"

import { queryFeatures } from "@esri/arcgis-rest-feature-service";
// import { queryFeatures } from '@esri/arcgis-rest-feature-layer';

// Namespace import
import * as projection from "@arcgis/core/geometry/projection";



class GisMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log(esriConfig)
        const apiKey = "AAPKec24e4d4b57446a980bc8938cccb1ed2bb1PKtJrlt66E8A6XVF3Ji_xxaVGFlYRw3gTHIphMe5arHUSFJCt2TpYzo7BSEyN";

        esriConfig.apiKey = apiKey

        // const authentication = arcgisRest.ApiKeyManager.fromKey(apiKey);

        const map = new MapGis({
            basemap: "arcgis-topographic" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [-119, 37],
            zoom: 6,  // Sets the zoom LOD to 13
            container: "viewDiv" // Div element
        });

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


        const options = {
            url:
              "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
            where: "Species = 'Oak'"
          };
          
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




        return (
            <div id="viewDiv">
            </div>
        )
    }
}

export default GisMap;