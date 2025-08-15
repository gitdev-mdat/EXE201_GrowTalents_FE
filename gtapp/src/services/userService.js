import instance from "./axiosConfig";

export const login = async (authenticationRequest) => {
  return instance.post(`/users/login`, authenticationRequest);
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
};
