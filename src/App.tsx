import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import styled, { createGlobalStyle } from 'styled-components'
import { init } from '@noriginmedia/norigin-spatial-navigation';
import axios from 'axios'
import './App.css';
import Menu from './components/Menu'
import Content from './components/Content'

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1440px;
  height: 810px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  const [isLoading, setLoading] = React.useState(true)
  
  const [marketList, setMarketList] = useState([])


  const getData = async () => {
    const [marketsResponse, matchMarketResponse] = await Promise.allSettled([
      axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/markets').then(r => r.data),
      axios.get('https://us-central1-hearsttelevision-158321.cloudfunctions.net/dev-1-ipman/matchMarket').then(r => r.data),
    ])
    console.log('prince 4')
    const marketList = marketsResponse.status === 'fulfilled' ? marketsResponse.value.stations : []
    setMarketList(marketList)
    console.log('prince 6')
    const currentMarket = matchMarketResponse.status === 'fulfilled' ? matchMarketResponse.value.market : ''
    setLoading(false)
    console.log('prince 7')
  }

  useEffect(() => {
    console.log('prince 1')
    getData()
    console.log('prince 2')

    init({
      debug: false,
      visualDebug: false
    });
    console.log('prince 3')
  }, [])
  if (isLoading) return <span>Loading...</span>

  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" data={Object.keys(marketList)} />
      <Content />
    </AppContainer>
  )
}

export default App;
