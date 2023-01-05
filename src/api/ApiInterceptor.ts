import axios, { AxiosResponse } from "axios";

class ApiInterceptorService {
  interceptor: any;

  constructor() {
    this.createInterceptor();
  }

  createInterceptor() {
    this.interceptor = axios.interceptors.response.use(
      this.onSuccess,
      this.onError
    );
  }

  removeInterceptor() {
    axios.interceptors.request.eject(this.interceptor);
  }

  onSuccess(response: AxiosResponse) {
    return response;
  }

  onError(response: AxiosResponse) {
    console.log("error", response);
  }
}

export default ApiInterceptorService;
