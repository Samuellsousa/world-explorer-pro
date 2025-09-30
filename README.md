# World Explorer Pro

## Visão Geral

O World Explorer Pro é uma aplicação web interativa desenvolvida em React que permite aos usuários explorar informações detalhadas sobre todos os países do mundo. A aplicação oferece uma interface profissional e completa, com dados em português brasileiro, visualização geográfica através de mapas interativos, informações climáticas em tempo real e gráficos estatísticos para análise comparativa entre países.

Este projeto foi aprimorado a partir de uma versão inicial (`world-explorer-v.2`), expandindo significativamente suas funcionalidades e a qualidade dos dados.

## Funcionalidades Principais

*   **Dados Completos de Países**: Acesso a informações detalhadas de 250 países, incluindo nome oficial, capital, região, sub-região, população, área, idiomas, moedas e bandeiras.
*   **Interface Profissional**: Design moderno e responsivo, otimizado para diferentes tamanhos de tela, com uma experiência de usuário intuitiva.
*   **Busca e Filtragem Avançada**: Capacidade de buscar países por nome ou capital e filtrar por região (Europa, Américas, África, Ásia, Oceania, Antártica).
*   **Visualização em Grid e Lista**: Alternância entre diferentes modos de exibição dos países.
*   **Detalhes do País Interativos**: Um modal detalhado para cada país, apresentando:
    *   **Informações Básicas**: Dados gerais do país.
    *   **Localização no Mapa**: Um mapa interativo (via Leaflet/OpenStreetMap) mostrando a localização geográfica do país.
    *   **Clima Atual**: Informações climáticas em tempo real para a capital do país (via Open-Meteo).
*   **Estatísticas Globais**: Uma seção dedicada a gráficos estatísticos (via Recharts) que visualizam:
    *   Os 10 países mais populosos.
    *   Os 10 países com maior área territorial.
    *   A distribuição de países por região.
*   **Localização**: Toda a interface e os dados dos países são apresentados em português do Brasil.

## Tecnologias Utilizadas

### Frontend

*   **React**: Biblioteca JavaScript para construção de interfaces de usuário.
*   **Vite**: Ferramenta de build rápida para projetos web modernos.
*   **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
*   **shadcn/ui**: Coleção de componentes de UI construídos com Radix UI e Tailwind CSS.
*   **Lucide React**: Biblioteca de ícones.

### Integrações com APIs

*   **REST Countries API**: Utilizada para obter dados abrangentes sobre todos os países do mundo.
*   **Open-Meteo API**: Fornece dados climáticos atuais e previsões de forma gratuita.
*   **Leaflet & OpenStreetMap**: Bibliotecas para renderização de mapas interativos e dados geográficos.

### Visualização de Dados

*   **Recharts**: Uma biblioteca de gráficos composta construída com React e D3.

## Como Rodar o Projeto Localmente

Para configurar e executar o World Explorer Pro em sua máquina local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js (versão 18 ou superior) e o pnpm instalados em seu sistema.

### Instalação

1.  **Clone o repositório (se aplicável)**:
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd world-explorer-pro
    ```
    *(Nota: Como este projeto foi desenvolvido em um ambiente sandboxed, você já deve ter os arquivos. Se estiver configurando em outro ambiente, substitua `<URL_DO_SEU_REPOSITORIO>` pelo link correto.)*

2.  **Navegue até o diretório do projeto**:
    ```bash
    cd world-explorer-pro
    ```

3.  **Instale as dependências**:
    ```bash
    pnpm install
    ```

### Execução

Para iniciar o servidor de desenvolvimento e visualizar a aplicação em seu navegador:

```bash
pnpm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível, se 5173 estiver em uso).

## Estrutura do Projeto

```
world-explorer-pro/
├── public/
├── src/
│   ├── assets/
│   │   └── countries_pt_br.json  # Dados dos países em português
│   ├── components/
│   │   ├── CountryCard.jsx       # Componente para exibir o card de um país
│   │   ├── CountryListItem.jsx   # Componente para exibir o item de lista de um país
│   │   ├── CountryMap.jsx        # Componente para o mapa interativo (Leaflet)
│   │   ├── CountryStats.jsx      # Componente para os gráficos estatísticos (Recharts)
│   │   └── WeatherInfo.jsx       # Componente para informações climáticas (Open-Meteo)
│   ├── lib/
│   │   └── utils.js              # Utilitários (ex: formatação de números)
│   ├── App.css                   # Estilos globais
│   ├── App.jsx                   # Componente principal da aplicação
│   ├── main.jsx                  # Ponto de entrada da aplicação React
│   └── index.css                 # Estilos base do Tailwind
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js
└── vite.config.js
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorias, correções de bugs ou novas funcionalidades.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

