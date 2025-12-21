import {useEffect, useLayoutEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import LoginPage from "../../routes/login-page.jsx";
import {getMe, grantToken, loginUser, logoutUser} from "../../calls.js";
import axios from "axios";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

// 1 - call the api to get user data with the accessToken
// 2 - if no token, send request with /grantToken that looks at Refresh token in cookie
// 3 - if again no token or the refresh is gone, just logout buddy
export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // this fetches the user - if he refreshed or simply was gone for more than the expiration of access
        // token, token is set to null
        const response = await getMe();
        setToken(response.data.accessToken);
        setUser(response.data.user);
        setLoading(false)
      } catch {
        setToken(null);
      }
    }

    fetchMe()
  }, []);

  useLayoutEffect(() => {
    // basically just makes sure the access token is always the newest added one
    const authInterceptor = axios.interceptors.request.use((config) => {
      config.headers.authorization =
        !config._retry && token ? `Bearer ${token}` : config.headers.authorization;
      return config;
    });

    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  },[token]);

  useLayoutEffect(() => {
    // this reacts to not having accessToken, sends grantToken request and gets
    // new accessToken via refreshToken
    // if even this one fails -> logout
    const refreshInterceptor = axios.interceptors.response.use((response) => response,
      async (error) => {
      const originalRequest = error.config;

      if(
        error.response.status === 401 &&
        error.response.data.message === "Unauthorized"
      ) {
        try{
          const response = await grantToken()
          setToken(response.data.accessToken);
          originalRequest.headers.authorization = `Bearer ${response.data.accessToken}`;
          originalRequest._retry = true;

          return axios(originalRequest);
        } catch {
          // the only error it throws is possibly refresh token invalid or missing sooo logout
          setLoading(false);
          setToken(null);
          setUser(null);
        }
      }
      return Promise.reject(error);
      })
    return () => {
      axios.interceptors.request.eject(refreshInterceptor);
    }
  }, [])

  const login = async (dtoIn) => {
    const response = await loginUser(dtoIn);
    setToken(response.data.accessToken);
    setUser(response.data.user);
  }

  const logout = async () => {
    await logoutUser();
    setToken(null);
    setUser(null);
  }

  return <AuthContext.Provider value={{user, login, logout}}>
    {!user
      ? loading
        ? <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="80vh">
            <CircularProgress/>
          </Box>
        : <LoginPage />
      : children}
  </AuthContext.Provider>
}

