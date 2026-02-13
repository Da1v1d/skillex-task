import { BetCalculationPage, ProductsPage } from "@/pages";
import { Layout } from "@/shared/ui";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/bet-calculation" element={<BetCalculationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
