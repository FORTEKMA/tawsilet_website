import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AuthService from "../../services/auth.service";
import { message } from "antd";
import { useNavigate } from "react-router";

export const loginUser = createAsyncThunk("user/login", async (credentials) => {
  let beforeLoginUrl = null;
  try {
    if (sessionStorage.getItem("beforeLogin") !== null) {
      beforeLoginUrl = sessionStorage.getItem("beforeLogin");
    }
    const response = await axios.post(
      `${AuthService.apiUrl}/auth/local?populate=*`,
      credentials
    );

    // localStorage.setItem("token", response.data.jwt);
    if (response?.data?.user?.user_role === "client") {
      localStorage.setItem("token", response.data.jwt);
      sessionStorage.removeItem("beforeLogin");
      window.location.href = beforeLoginUrl ? beforeLoginUrl : "/";
      // window.location.href = "/";
    } else {
      message.loading(`Vous allez être dirigé vers dashboard societé`);
      setTimeout(() => {
        window.location.replace(process.env.REACT_APP_DASH_URL);
      }, 2000);
    }

    return response.data.user;
  } catch (error) {
    // console.error("Login error:", error);
    message.error(`Identifiant ou mot de passe incorrect`);
    throw error;
  }
});

export const loginUserEstimation = createAsyncThunk(
  "user/login",

  async (credentials) => {
    try {
      const response = await axios.post(
        `${AuthService.apiUrl}/auth/local?populate=*`,
        credentials
      );

      // localStorage.setItem("token", response.data.jwt);
      if (response?.data?.user?.user_role === "client") {
        localStorage.setItem("token", response.data.jwt);
      } else {
        message.loading(`Vous allez être dirigé vers dashboard societé`);
        setTimeout(() => {
          window.location.replace(process.env.REACT_APP_DASH_URL);
        }, 2000);
      }

      return response.data.user;
    } catch (error) {
      // console.error("Login error:", error);
      message.error(`Identifiant ou mot de passe incorrect`);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${AuthService.apiUrl}/register/client`,
        credentials
      );

      // localStorage.setItem("token", response.data.jwt);
      if (response.data.user.user_role === "client") {
        localStorage.setItem("token", response.data.jwt);
        window.location.href = "/";
      } else {
        message.error(`Vous allez être dirigé vers dashboard societé`);

        window.location.href = process.env.REACT_APP_DASH_URL;
      }

      return response.data.user;
    } catch (error) {
      console.error("Login error:", error);
      message.error(`Adresse email déjà utilisée`);

      throw error;
    }
  }
);

export const createUserAndCompany = createAsyncThunk(
  "user/register",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${AuthService.apiUrl}/register/owner-and-company`,
        credentials
      );

      // localStorage.setItem("token", response.data.jwt);
      if (response.data.user.user_role === "client") {
        localStorage.setItem("token", response.data.jwt);
        window.location.href = "/";
      } else {
        message.error(`Vous allez être dirigé vers dashboard societé`);

        window.location.href = process.env.REACT_APP_DASH_URL;
      }

      return response.data.user;
    } catch (error) {
      console.error("Login error:", error);
      message.error(`Adresse email déjà utilisée`);

      throw error;
    }
  }
);

export const registerUserEstimation = createAsyncThunk(
  "user/register/user_estimation",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${AuthService.apiUrl}/register/client`,
        credentials
      );

      // localStorage.setItem("token", response.data.jwt);
      if (response.data.user.user_role === "client") {
        localStorage.setItem("token", response.data.jwt);
      } else {
        message.error(`Vous allez être dirigé vers dashboard societé`);

        window.location.href = process.env.REACT_APP_DASH_URL;
      }

      return response.data.user;
    } catch (error) {
      console.error("Login error:", error);
      message.error(`Adresse email déjà utilisée`);

      throw error;
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changepassword",
  async (credentials) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${AuthService.apiUrl}/auth/change-password`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("token", response.data.jwt);
      // if (response.data.user.user_role === "admin") {
      //   window.location.href = "/admin/dashboard";
      // } else {
      //   window.location.href = "/clientprofile/details";
      // }

      return response.data.user;
    } catch (error) {
      // console.error("CHange password error:", error);
      // return error;
      alert("Combinaison incorrecte");
      throw error;
    }
  }
);

export const getCurrentUser = createAsyncThunk("user/current", async () => {
  try {
    const jwt = localStorage.getItem("token");
    const response = await axios.get(
      `${process.env.REACT_APP_DOMAIN_URL}/api/users/me?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("current user error:", error);
    throw error;
  }
});

export const getCurrentUserEstimation = createAsyncThunk(
  "user/currentt",
  async () => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.REACT_APP_DOMAIN_URL}/api/users/me?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("current user error:", error);
      throw error;
    }
  }
);

export const getUser = createAsyncThunk(async (id) => {
  try {
    let response = axios.get("");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk("user/update", async (newUser) => {
  try {
    const jwt = localStorage.getItem("token");
    let response = await axios.put(
      `${process.env.REACT_APP_DOMAIN_URL}/api/users/${newUser.id}`,
      newUser,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    // console.log(response);
    return await response.data;
  } catch (error) {
    throw error;
  }
});

export const usersGetAll = createAsyncThunk("admin/allusers", async () => {
  try {
    let response = axios.get("");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const usersDel = createAsyncThunk("user/delete", async (id) => {
  try {
    let response = axios.delete(``);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (data) => {
    try {
      // const response = await axios.get(
      //   `${process.env.REACT_APP_DOMAIN_URL}/api/users?filters[$and][0][email][$eq]=${data.email}`
      // );
      // console.log(response);
      // if (response.data.length) {
      const response = axios
        .post(
          `${process.env.REACT_APP_DOMAIN_URL}/api/auth/forgot-password`,
          data
        )
        .then((ress) => {
          return ress.data;
        });
      // } else {
      //   return {
      //     ok: false,
      //   };
      // }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (data) => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_DOMAIN_URL}/api/auth/reset-password`,
        data
      );
      if (response?.data?.user?.user_role === "client") {
        localStorage.setItem("token", response.data.jwt);
        window.location.href = "/";
      } else {
        message.loading(`Vous allez être dirigé vers dashboard societé`);
        setTimeout(() => {
          window.location.replace(process.env.REACT_APP_DASH_URL);
        }, 2000);
      }

      return response.data.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getReviewsByUser = createAsyncThunk(
  "Reviews/Get/user",
  async ({ id }) => {
    try {
      const jwt = localStorage.getItem("token");

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/reviews?filters[driver][documentId][$eq]=${id}&pagination[pageSize]=999999`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  currentUser: null,
  users: [],
  status: null,
  newuserupdated: {},
  userUpdated: null,
  isLoading: false,
  reviews: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    loaderPause: (state) => {
      // console.log(state);
      state.isLoading = false;
    },
  },
  extraReducers: {
    [AuthService.register.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [AuthService.register.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      localStorage.setItem("user", action.payload.jwt);
      state.isLoading = false;
    },
    [AuthService.register.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },

    [loginUser.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      window.location.replace("/");
      state.isLoading = false;
    },
    [loginUser.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [loginUserEstimation.pending]: (state) => {
      // state.status = "pending";
      // state.isLoading = true;
    },
    [loginUserEstimation.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      // window.location.replace("/");

      // state.isLoading = false;
    },
    [loginUserEstimation.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },

    [registerUser.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;

      state.isLoading = false;
    },
    [registerUser.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
      alert("email deja utiliser ");
    },
    [registerUserEstimation.pending]: (state) => {
      state.status = "pending";
      // state.isLoading = true;
    },
    [registerUserEstimation.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;

      // state.isLoading = false;
    },
    [registerUserEstimation.rejected]: (state) => {
      state.status = "fail";
      // state.isLoading = false;
      alert("email deja utiliser ");
    },

    [changePassword.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [changePassword.rejected]: (state, action) => {
      state.status = "fail";
      state.isLoading = false;
      // console.log(action);
    },
    [updateUser.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.userUpdated = action.payload;
      state.newuserupdated = action.payload;
      state.status = "success";
      state.isLoading = false;
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "fail";
      state.isLoading = false;
      // alert(action.payload);
    },
    [getUser.pending]: (state) => {
      state.status = "pending";
    },
    [getUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.users = action.payload;
    },
    [getUser.rejected]: (state) => {
      state.status = "fail";
    },
    [getCurrentUser.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [getCurrentUser.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [getCurrentUserEstimation.pending]: (state) => {
      state.status = "pending";
      // state.isLoading = true;
    },
    [getCurrentUserEstimation.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.isLoading = false;
    },
    [getCurrentUserEstimation.rejected]: (state) => {
      state.status = "fail";
      // state.isLoading = false;
    },
    [forgetPassword.pending]: (state) => {
      state.status = "pending";
      // state.isLoading = true;
    },
    [forgetPassword.fulfilled]: (state, action) => {
      state.status = "success";
      // state.currentUser = action.payload;
      // state.isLoading = false;
    },
    [forgetPassword.rejected]: (state) => {
      state.status = "fail";
      // state.isLoading = false;
    },
    [resetPassword.pending]: (state) => {
      state.status = "pending";
      state.isLoading = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      window.location.replace("/SidentifierClient");

      state.isLoading = false;
    },
    [resetPassword.rejected]: (state) => {
      state.status = "fail";
      state.isLoading = false;
    },
    [getReviewsByUser.pending]: (state) => {
      state.status = "pending";
      // state.isLoading = true;
    },
    [getReviewsByUser.fulfilled]: (state, action) => {
      state.status = "success";
      // state.isLoading = false;
      state.reviews = action.payload.data;
    },
    [getReviewsByUser.rejected]: (state) => {
      state.status = "fail";
      // state.isLoading = false;
      state.error = "fail";
    },
  },
});

// Action creators are generated for each case reducer function
export const { logout, loaderPause } = userSlice.actions;

export default userSlice.reducer;
