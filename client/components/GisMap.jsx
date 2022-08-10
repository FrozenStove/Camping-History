import React, { Component } from "react";
import HistoryCard from "./historyCard.jsx"

import esriConfig from "@arcgis/core/config.js";
esriConfig.assetsPath = "./build/assets";

// Default import
import WebMap from "@arcgis/core/WebMap";
import MapGis from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

// Namespace import
import * as projection from "@arcgis/core/geometry/projection";



class GisMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        // console.log(esriConfig)
        esriConfig.apiKey = "AAPKec24e4d4b57446a980bc8938cccb1ed2bb1PKtJrlt66E8A6XVF3Ji_xxaVGFlYRw3gTHIphMe5arHUSFJCt2TpYzo7BSEyN";
        const map = new MapGis({
            basemap: "arcgis-topographic" // Basemap layer service
        });

        const view = new MapView({
            map: map,
            center: [-118.805, 34.027], // Longitude, latitude
            zoom: 13, // Zoom level
            container: "viewDiv" // Div element
        });

        return (
            <div id="viewDiv">
            </div>
        )
    }
}

export default GisMap;