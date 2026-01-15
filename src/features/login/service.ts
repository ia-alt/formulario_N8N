import { acoesSectiApi } from "../../shared/acoes-secti-api";
import type { DadosLogin, RespostaLogin } from "../../shared/acoes-secti-api";


class LoginService {
  async login(dados: DadosLogin): Promise<RespostaLogin> {
    return acoesSectiApi.login(dados);
  }
}

export const loginService = new LoginService();
