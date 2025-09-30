import { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, Thermometer, Wind, Droplets } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const WeatherInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!country?.latlng || country.latlng.length !== 2) return

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const [lat, lng] = country.latlng
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        )
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados climáticos')
        }
        
        const data = await response.json()
        setWeather(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [country])

  const getWeatherIcon = (weatherCode) => {
    // WMO Weather interpretation codes
    if (weatherCode === 0) return <Sun className="w-6 h-6 text-yellow-500" />
    if (weatherCode <= 3) return <Cloud className="w-6 h-6 text-gray-500" />
    if (weatherCode <= 67) return <CloudRain className="w-6 h-6 text-blue-500" />
    return <Cloud className="w-6 h-6 text-gray-500" />
  }

  const getWeatherDescription = (weatherCode) => {
    const descriptions = {
      0: 'Céu limpo',
      1: 'Principalmente limpo',
      2: 'Parcialmente nublado',
      3: 'Nublado',
      45: 'Neblina',
      48: 'Neblina com geada',
      51: 'Garoa leve',
      53: 'Garoa moderada',
      55: 'Garoa intensa',
      61: 'Chuva leve',
      63: 'Chuva moderada',
      65: 'Chuva intensa'
    }
    return descriptions[weatherCode] || 'Condição desconhecida'
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Clima Atual</span>
          </CardTitle>
          <CardDescription>Carregando dados climáticos...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Clima Atual</span>
          </CardTitle>
          <CardDescription>Erro ao carregar dados climáticos</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!weather?.current) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Thermometer className="w-5 h-5" />
            <span>Clima Atual</span>
          </CardTitle>
          <CardDescription>Dados climáticos não disponíveis</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const { current } = weather

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5" />
          <span>Clima Atual</span>
        </CardTitle>
        <CardDescription>
          {country.capital} - {new Date(current.time).toLocaleString('pt-BR')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getWeatherIcon(current.weather_code)}
            <div>
              <p className="text-2xl font-bold">{Math.round(current.temperature_2m)}°C</p>
              <p className="text-sm text-muted-foreground">
                {getWeatherDescription(current.weather_code)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-sm font-medium">{current.relative_humidity_2m}%</p>
              <p className="text-xs text-muted-foreground">Umidade</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-sm font-medium">{current.wind_speed_10m} km/h</p>
              <p className="text-xs text-muted-foreground">Vento</p>
            </div>
          </div>
        </div>
        
        <Badge variant="outline" className="text-xs">
          Dados fornecidos por Open-Meteo
        </Badge>
      </CardContent>
    </Card>
  )
}

export default WeatherInfo
