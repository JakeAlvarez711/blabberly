// src/components/map/HeatmapLayer.js
import { useEffect, useRef } from "react";
import { useGoogleMap } from "@react-google-maps/api";

const GRADIENT = [
  "rgba(0, 0, 0, 0)",
  "rgba(242, 101, 34, 0.2)",
  "rgba(242, 101, 34, 0.4)",
  "rgba(242, 101, 34, 0.6)",
  "rgba(255, 140, 50, 0.8)",
  "rgba(255, 180, 50, 0.9)",
  "rgba(255, 220, 100, 1)",
];

function HeatmapLayer({ data }) {
  const map = useGoogleMap();
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (!map || !window.google?.maps?.visualization || !data || data.length === 0) {
      // Remove existing heatmap if data is empty
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
        heatmapRef.current = null;
      }
      return;
    }

    const points = data.map((d) => ({
      location: new window.google.maps.LatLng(d.lat, d.lng),
      weight: d.weight,
    }));

    // Update existing heatmap data
    if (heatmapRef.current) {
      heatmapRef.current.setData(points);
      heatmapRef.current.setMap(map);
      return;
    }

    // Create new heatmap
    heatmapRef.current = new window.google.maps.visualization.HeatmapLayer({
      data: points,
      radius: 30,
      opacity: 0.6,
      gradient: GRADIENT,
      map,
    });

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
        heatmapRef.current = null;
      }
    };
  }, [map, data]);

  return null;
}

export default HeatmapLayer;
