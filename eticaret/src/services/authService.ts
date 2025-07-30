import axios from "../api/axiosInstance";

// Kullanıcı girişi
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/Auth/login", {
    email,
    password,
  });
  return response.data;
};

// Kullanıcı kaydı
export const registerUser = async (userData: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  const response = await axios.post("/Auth/register", userData);
  return response.data;
};

// E-posta doğrulama kodu gönder
export const sendConfirmationEmail = async (userId: number) => {
  const response = await axios.post(`/Auth/email-send-confirmtoken/${userId}`);
  return response.data;
};

// E-posta doğrulama kodunu onayla
export const verifyEmailToken = async (
  userId: number,
  confirmationToken: string
) => {
  const response = await axios.post(
    `/Auth/verify-email-confirmtoken`,
    null,
    {
      params: {
        userId,
        confirmationToken,
      },
    }
  );
  return response.data;
};

// Şifre değiştirme
export const changePassword = async (userId: number, oldPassword: string, newPassword: string) => {
  const response = await axios.post("/Auth/change-password", {
    userId,
    oldPassword,
    newPassword,
  });
  return response.data;
};
