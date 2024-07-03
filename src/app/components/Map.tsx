import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { renderToString } from 'react-dom/server';
import anime from 'animejs/lib/anime.es.js'; // Importer anime.js

const Map = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Créer la carte
      const map = L.map('map', {
        center: [0, 0], // Centrer la carte à l'emplacement souhaité
        zoom: 1, // Ajuster le niveau de zoom selon vos besoins
        zoomControl: false, // Désactiver les contrôles de zoom
        dragging: false, // Désactiver le déplacement de la carte
        scrollWheelZoom: false, // Désactiver le zoom avec la molette de la souris
        doubleClickZoom: false, // Désactiver le zoom double-clic
        touchZoom: false, // Désactiver le zoom tactile
        attributionControl: false // Désactiver le contrôle d'attribution
      });

      // Ajouter une couche de carte OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Définir l'icône de marqueur personnalisé
      const customIcon = L.divIcon({
        html: renderToString(<FaMapMarkerAlt color="BluFil" size={10} />),
        className: 'custom-marker-icon'
      });

      // Ajouter des marqueurs pour différents endroits avec l'icône personnalisée
      const addMarkers = (markers) => {
        markers.forEach(marker => {
          L.marker(marker.coordinates, { icon: customIcon }).addTo(map).bindPopup(marker.name);
        });
      };

      const markers = [
        { coordinates: [45.5017, -73.5673], name: 'Montréal' },
        { coordinates: [50.8503, 4.3517], name: 'Bruxelles' },
        { coordinates: [46.2044, 6.1432], name: 'Genève' },
        { coordinates: [5.3599, -4.0083], name: 'Abidjan' },
        { coordinates: [14.6928, -17.4467], name: 'Dakar' },
        { coordinates: [36.8065, 10.1815], name: 'Tunis' },
        { coordinates: [49.6116, 6.1319], name: 'Luxembourg' },
        { coordinates: [18.0735, -15.9582], name: 'Nouakchott' },
        { coordinates: [18.5944, -72.3074], name: 'Port-au-Prince' },
        { coordinates: [-4.4419, 15.2663], name: 'Kinshasa' }
      ];

      addMarkers(markers);

      // Ajouter des lignes de connexion entre les marqueurs
      const connections = [
        [[45.5017, -73.5673], [50.8503, 4.3517]],
        [[50.8503, 4.3517], [46.2044, 6.1432]],
        [[46.2044, 6.1432],[5.3599, -4.0083]],
        [[5.3599, -4.0083], [14.6928, -17.4467]],
        [[14.6928, -17.4467], [36.8065, 10.1815]],
        [[36.8065, 10.1815], [49.6116, 6.1319]],
        [[49.6116, 6.1319], [18.0735, -15.9582]],
        [[18.0735, -15.9582], [18.5944, -72.3074]],
        [[18.5944, -72.3074], [-4.4419, 15.2663]],
        [[-4.4419, 15.2663], [45.5017, -73.5673]]
      ];

      const animateConnections = () => {
        connections.forEach(coords => {
          const polyline = L.polyline(coords, { color: 'blue', weight: 3 }).addTo(map);
          const length = polyline._path.getTotalLength(); // Longueur totale de la ligne
          anime({
            targets: polyline._path,
            strokeDashoffset: [length, 0], // Animation de l'offset du trait
            easing: 'linear',
            duration: 5000,
            direction: 'alternate',
            loop: true
          });
        });
      };

      animateConnections();

      // Nettoyer lorsque le composant est démonté
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '100%' }} />
  );
};

export default Map;
