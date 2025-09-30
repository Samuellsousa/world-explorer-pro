import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'

const CountryStats = ({ countries, selectedRegion = 'all' }) => {
  // Filter countries based on selected region
  const filteredCountries = selectedRegion === 'all' 
    ? countries 
    : countries.filter(country => country.region === selectedRegion)

  // Prepare data for population chart (top 10 most populous countries)
  const populationData = filteredCountries
    .filter(country => country.population > 0)
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .map(country => ({
      name: country.name.portuguese.length > 15 
        ? country.name.portuguese.substring(0, 15) + '...' 
        : country.name.portuguese,
      population: country.population,
      fullName: country.name.portuguese
    }))

  // Prepare data for area chart (top 10 largest countries)
  const areaData = filteredCountries
    .filter(country => country.area > 0)
    .sort((a, b) => b.area - a.area)
    .slice(0, 10)
    .map(country => ({
      name: country.name.portuguese.length > 15 
        ? country.name.portuguese.substring(0, 15) + '...' 
        : country.name.portuguese,
      area: country.area,
      fullName: country.name.portuguese
    }))

  // Prepare data for region distribution
  const regionData = countries.reduce((acc, country) => {
    if (country.region && country.region !== 'N/A') {
      acc[country.region] = (acc[country.region] || 0) + 1
    }
    return acc
  }, {})

  const regionChartData = Object.entries(regionData).map(([region, count]) => ({
    name: region,
    value: count
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

  const formatNumber = (num) => {
    return new Intl.NumberFormat('pt-BR').format(num)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.fullName || label}</p>
          <p className="text-sm">
            {payload[0].dataKey === 'population' 
              ? `População: ${formatNumber(payload[0].value)}`
              : `Área: ${formatNumber(payload[0].value)} km²`
            }
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Estatísticas dos Países</h2>
        <p className="text-muted-foreground">
          {selectedRegion === 'all' 
            ? `Dados de todos os ${countries.length} países`
            : `Dados da região ${selectedRegion} (${filteredCountries.length} países)`
          }
        </p>
      </div>

      <Tabs defaultValue="population" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="population">População</TabsTrigger>
          <TabsTrigger value="area">Área</TabsTrigger>
          <TabsTrigger value="regions">Regiões</TabsTrigger>
        </TabsList>

        <TabsContent value="population">
          <Card>
            <CardHeader>
              <CardTitle>Países Mais Populosos</CardTitle>
              <CardDescription>
                Top 10 países por população {selectedRegion !== 'all' ? `na região ${selectedRegion}` : 'no mundo'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={populationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => formatNumber(value)}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="population" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area">
          <Card>
            <CardHeader>
              <CardTitle>Países com Maior Área</CardTitle>
              <CardDescription>
                Top 10 países por área territorial {selectedRegion !== 'all' ? `na região ${selectedRegion}` : 'no mundo'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={areaData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={(value) => formatNumber(value)}
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="area" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Regiões</CardTitle>
              <CardDescription>
                Número de países por região do mundo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={regionChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CountryStats
