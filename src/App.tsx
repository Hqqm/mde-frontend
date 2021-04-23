import "./App.css";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import {
  $engineFilter,
  getEnginesFx,
  lastFetchedEngineIdChanged,
  lengthData,
  widthData,
  heightData,
  weightDryNoImplementsData,
  powerRating,
} from "./engines_search/model";
import Button from "@material-ui/core/Button";
import { getQueryParams } from "./lib/getQueryParams";
import { EngineSearch } from "./components/EngineSearch";
import { ImoEcoStandard } from "./components/eco-standards/ImoEcoStandard";
import { EpaEcoStandard } from "./components/eco-standards/EpaEcoStandard";
import { EuEcoStandard } from "./components/eco-standards/EuEcoStandard";
import { Facet } from "./components/Facet";
import { EngineDemo } from "./components/EngineDemo";
import { LoadMoreEnginesButton } from "./components/LoadMoreEnginesButton";
import { Routes } from "./routes";
import { UicEcoStandard } from "./components/eco-standards/UicEcoStandard";
import { FlangeType } from "./components/flangeType";
import { CylinderQuantity } from "./components/cylinderQuantity";
import { Manufacturers } from "./components/manufacturers";
import { RotationSpeed } from "./components/rotation-speed";

const Btn = () => {
  const engineFilter = useStore($engineFilter);
  const history = useHistory();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const params = getQueryParams(engineFilter);
        lastFetchedEngineIdChanged(0);
        params.delete("lastFetchedEngineId");
        history.push({ search: params.toString() });
        return getEnginesFx(history.location.search);
      }}
    >
      Поиск
    </Button>
  );
};

const Aside = () => {
  console.log("aside render");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <EngineSearch />
      <Manufacturers />
      <RotationSpeed />
      <FlangeType />
      <CylinderQuantity />

      <ImoEcoStandard />
      <EpaEcoStandard />
      <EuEcoStandard />
      <UicEcoStandard />

      <Facet data={powerRating} label="Мощность двигателя" />
      <Facet data={weightDryNoImplementsData} label="Вес без оборудования" />
      <Facet data={lengthData} label="Длина" />
      <Facet data={widthData} label="Ширина" />
      <Facet data={heightData} label="Высота" />
      <Btn />
    </div>
  );
};

export const MainPage = () => (
  <div className="wrapper">
    <header className="header">header</header>
    <aside className="aside">
      <Aside />
    </aside>
    <main className="main">
      <EngineDemo />
      <LoadMoreEnginesButton />
    </main>
    <footer className="footer">footer</footer>
  </div>
);

function App() {
  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  );
}

export default App;
