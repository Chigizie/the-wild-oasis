import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";

import GlobalStyle from "./styles/Globalstyle";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import { StyleSheetManager } from "styled-components";
import ProtectedRoute from "./ui/ProtectedRoute";
import DarkModeContext from "./features/context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop !== "variation"}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyle />
        <BrowserRouter>
          <DarkModeContext>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  path="/"
                  index
                  element={<Navigate replace to="dashboard" />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/bookings" element={<Bookings />} />
                <Route path="/bookings/:bookingId" element={<Booking />} />
                <Route path="/checkin/:bookingId" element={<Checkin />} />
                <Route path="/cabins" element={<Cabins />} />
                <Route path="/account" element={<Account />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/users" element={<Users />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </DarkModeContext>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOPtions={{
            success: { duration: 3000 },
            errrr: { duration: 5000 },
            style: {
              fontSizs: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </QueryClientProvider>
    </StyleSheetManager>
  );
}

export default App;
