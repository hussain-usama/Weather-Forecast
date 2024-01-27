import { Route, Routes } from "react-router-dom";
import NotFound from './NotFound'
import { Suspense, useEffect, useState } from "react";
import Loader from "../components/Loader";
import ForecastHome from "../views/ForecastHome";
import SearchHostory from "../views/SearchHistory";
import SearchResult from "../views/SearchResult";

function BaseRoutes() {

  
  return (
    <Suspense fallback={<Loader open={true}/>}>
      <Routes>
        <Route path="/" element={<ForecastHome />} />
        <Route path="/history" element={<SearchHostory />} />
        <Route path="/search/:name" element={<SearchResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default BaseRoutes;

