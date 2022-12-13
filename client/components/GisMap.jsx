import React, { Component } from "react";
import esriConfig from "@arcgis/core/config.js";
import MapGis from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

esriConfig.assetsPath = "./build/assets";

class GisMap extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        const apiKey = "AAPKec24e4d4b57446a980bc8938cccb1ed2bb1PKtJrlt66E8A6XVF3Ji_xxaVGFlYRw3gTHIphMe5arHUSFJCt2TpYzo7BSEyN";

        esriConfig.apiKey = apiKey

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
        // https://developers.arcgis.com/javascript/latest/display-a-pop-up/
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
        
        return (
            <div id="viewDiv">
            </div>
        )
    }
}
export default GisMap;