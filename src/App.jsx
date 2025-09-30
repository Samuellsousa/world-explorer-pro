import { useState, useEffect } from 'react'
import { Search, Globe, MapPin, Users, BarChart3, Filter, Grid, List, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import CountryMap from './components/CountryMap.jsx'
import WeatherInfo from './components/WeatherInfo.jsx'
import CountryStats from './components/CountryStats.jsx'
import countriesData from './assets/countries_pt_br.json'
import './App.css'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setCountries(countriesData)
    setFilteredCountries(countriesData)
  }, [])

  useEffect(() => {
    let filtered = countries

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(country =>
        country.name.portuguese.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.capital.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by region
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(country => country.region === selectedRegion)
    }

    setFilteredCountries(filtered)
  }, [searchTerm, selectedRegion, countries])

  const regions = [...new Set(countries.map(country => country.region))].filter(region => region !== 'N/A')

  const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0)
  const totalArea = countries.reduce((sum, country) => sum + country.area, 0)

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  const CountryCard = ({ country }) => (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setSelectedCountry(country)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={country.flags.png} 
              alt={`Bandeira de ${country.name.portuguese}`}
              className="w-8 h-6 object-cover rounded shadow-sm"
            />
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {country.name.portuguese}
              </CardTitle>
              <CardDescription className="text-sm">
                {country.name.official}
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{country.region}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{country.capital}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span>{formatNumber(country.population)}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {country.languages.slice(0, 2).map((language, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {language}
            </Badge>
          ))}
          {country.languages.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{country.languages.length - 2}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const CountryListItem = ({ country }) => (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setSelectedCountry(country)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={country.flags.png} 
              alt={`Bandeira de ${country.name.portuguese}`}
              className="w-10 h-7 object-cover rounded shadow-sm"
            />
            <div>
              <h3 className="font-semibold text-lg">{country.name.portuguese}</h3>
              <p className="text-sm text-muted-foreground">{country.capital}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <p className="font-medium">{formatNumber(country.population)}</p>
              <p className="text-muted-foreground">População</p>
            </div>
            <div className="text-center">
              <p className="font-medium">{formatNumber(country.area)} km²</p>
              <p className="text-muted-foreground">Área</p>
            </div>
            <Badge variant="secondary">{country.region}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const CountryDetail = ({ country, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={country.flags.png} 
                alt={`Bandeira de ${country.name.portuguese}`}
                className="w-16 h-12 object-cover rounded shadow-md"
              />
              <div>
                <CardTitle className="text-2xl">{country.name.portuguese}</CardTitle>
                <CardDescription className="text-lg">{country.name.official}</CardDescription>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>Fechar</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info">Informações</TabsTrigger>
              <TabsTrigger value="map">Localização</TabsTrigger>
              <TabsTrigger value="weather">Clima</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Informações Básicas</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Capital:</span>
                      <span className="font-medium">{country.capital}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Região:</span>
                      <span className="font-medium">{country.region}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub-região:</span>
                      <span className="font-medium">{country.subregion}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">População:</span>
                      <span className="font-medium">{formatNumber(country.population)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Área:</span>
                      <span className="font-medium">{formatNumber(country.area)} km²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coordenadas:</span>
                      <span className="font-medium">{country.latlng[0]}°, {country.latlng[1]}°</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Idiomas e Moedas</h4>
                  <div className="space-y-2">
                    <div>
                      <span className="text-muted-foreground">Idiomas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {country.languages.map((language, index) => (
                          <Badge key={index} variant="outline">{language}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Moedas:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {country.currencies.map((currency, index) => (
                          <Badge key={index} variant="outline">{currency}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="map">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Localização no Mapa</h4>
                <CountryMap country={country} className="w-full h-96" />
              </div>
            </TabsContent>
            
            <TabsContent value="weather">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Informações Climáticas</h4>
                <WeatherInfo country={country} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">World Explorer Pro</h1>
                <p className="text-sm text-muted-foreground">Explore países do mundo inteiro</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {filteredCountries.length} países
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{countries.length}</p>
                <p className="text-sm text-muted-foreground">Países</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{formatNumber(totalPopulation)}</p>
                <p className="text-sm text-muted-foreground">População Total</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{formatNumber(totalArea)}</p>
                <p className="text-sm text-muted-foreground">Área Total (km²)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{regions.length}</p>
                <p className="text-sm text-muted-foreground">Regiões</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar países, capitais..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filtrar por região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as regiões</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="countries" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="countries" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Países</span>
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Estatísticas</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="countries">
              {filteredCountries.length === 0 ? (
                <div className="text-center py-12">
                  <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Nenhum país encontrado</h3>
                  <p className="text-muted-foreground">Tente ajustar seus filtros de busca</p>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }>
                  {filteredCountries.map((country, index) => (
                    viewMode === 'grid' 
                      ? <CountryCard key={index} country={country} />
                      : <CountryListItem key={index} country={country} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stats">
              <CountryStats countries={countries} selectedRegion={selectedRegion} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Country Detail Modal */}
      {selectedCountry && (
        <CountryDetail 
          country={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  )
}

export default App
