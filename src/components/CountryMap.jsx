import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const CountryMap = ({ country, className = "" }) => {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || !country?.latlng) return

    // Initialize map
    const map = L.map(mapRef.current).setView(country.latlng, 5)
    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    // Add marker for the country
    const marker = L.marker(country.latlng).addTo(map)
    marker.bindPopup(`
      <div class="text-center">
        <img src="${country.flags.png}" alt="Bandeira de ${country.name.portuguese}" class="w-8 h-6 mx-auto mb-2" />
        <h3 class="font-semibold">${country.name.portuguese}</h3>
        <p class="text-sm text-gray-600">${country.capital}</p>
      </div>
    `)

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [country])

  if (!country?.latlng) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}>
        <p className="text-gray-500">Coordenadas não disponíveis</p>
      </div>
    )
  }

  return (
    <div 
      ref={mapRef} 
      className={`rounded-lg overflow-hidden ${className}`}
      style={{ minHeight: '300px' }}
    />
  )
}

export default CountryMap
