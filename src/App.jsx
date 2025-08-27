import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";

import { Home } from "./components/Home/Home";
import { Cart } from "./components/Cart/Cart";
import { Categories } from "./components/Categories/Categories";
import { Product } from "./components/Product/Product";
import { Brands } from "./components/Brands/Brands";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { NotFound } from "./components/NotFound/NotFound";
import { ProtectedRoutes } from "./components/ProtectedRoutes/ProtectedRoutes";
import { ProtectedAuth } from "./components/ProtectedAuth/ProtectedAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { AllOrders } from "./components/AllOrders/AllOrders";
import { CheckOut } from "./components/CheckOut/CheckOut";
import { ForgetPassword } from "./components/ForgetPassword/ForgetPassword";
import { VerifyResetCode } from "./components/VerifyResetCode/VerifyResetCode";
import { ResetPassword } from "./components/ResetPassword/ResetPassword";

import { WishList } from "./components/WishList/WishList";


function App() {
  const queryClient = new QueryClient();

  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <WishList/>
            </ProtectedRoutes>
          ),
        },
        {
          path: "cat",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Product />
            </ProtectedRoutes>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id/:category",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <ProtectedAuth>
              <ForgetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "verifycode",
          element: (
            <ProtectedAuth>
              <VerifyResetCode />
            </ProtectedAuth>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <ProtectedAuth>
              <ResetPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster position="top-right" reverseOrder={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
