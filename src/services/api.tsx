type TConstructor = {
  baseUrl: string;
}

type TForgotPasswordBody = {
  email: string;
}

type TResetPasswordBody = {
  password: string;
  token: string;
}

export type TLoginBody = {
  password: string;
  email: string;
}

export type TRegisterBody = {
  password: string;
  email: string;
  name: string;
}

export type TProfileBody = {
  password?: string;
  email?: string;
  name?: string;
}

export type TProfileArgs = {
  token?: string;
  body?: TProfileBody;
}

type THeaders = {
  Authorization?: string;
} & {
  "Content-Type": "application/json",
}

type TArgs= {
  body?: any;
  token?: string;
}

class Api {
  _baseUrl: string;
  _headers: THeaders;

  constructor({ baseUrl }: TConstructor) {
    this._baseUrl = baseUrl;
    this._headers = {
      "Content-Type": "application/json",
    }
  }

  checkReponse(res: Response) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };

  refreshToken() {
    return this._makeRequest("/auth/token", "POST", {
      body: { token: localStorage.getItem("refreshToken") || '' },
    });
  }

  _makeRequest = (endPoint: string, method = "GET", { token, body }: TArgs): any => {
    if (token)
      this._headers = {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      };
    return fetch(this._baseUrl + endPoint, {
      method,
      headers: this._headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        return this.checkReponse(res);
      })
      .catch(async (err) => {
        if (err.message === "jwt expired") {
          const refreshData = await this.refreshToken(); //обновляем токен
          localStorage.setItem(
            "accessToken",
            refreshData.accessToken.split("Bearer ")[1]
          );
          localStorage.setItem("refreshToken", refreshData.refreshToken);
          const res = await this._makeRequest(endPoint, method, {
            token: refreshData.accessToken.split("Bearer ")[1],
            body,
          }); //повторяем запрос
          return await this.checkReponse(res);
        } else {
          return Promise.reject("error");
        }
      })
  }

  forgotPassword(body: TForgotPasswordBody) {
    return this._makeRequest("/password-reset", "POST", { body });
  }

  resetPassword(body: TResetPasswordBody) {
    return this._makeRequest("/password-reset/reset", "POST", { body });
  }

  login(body: TLoginBody) {
    return this._makeRequest("/auth/login", "POST", { body });
  }

  register(body: TRegisterBody) {
    return this._makeRequest("/auth/register", "POST", { body });
  }

  getProfile(token: string) {
    return this._makeRequest("/auth/user", "GET", { token });
  }

  updateProfile({ token, body}: TProfileArgs) {
    return this._makeRequest("/auth/user", "PATCH", { token, body });
  }

  logout() {
    return this._makeRequest("/auth/logout", "POST", {
      body: { token: localStorage.getItem("refreshToken") },
    });
  }
}

const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
});

export default api;
