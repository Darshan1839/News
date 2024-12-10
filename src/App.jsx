import { useState } from 'react'
// import { NewsApi } from './NEwsAPi'
import {NewsApiWithLoadMore} from "./NewsApiwithLoadMore.jsx"


function App() {

  return (
    <>
      {/* <NewsApi/> */}
      <NewsApiWithLoadMore/>
    </>
  )
}

export default App
