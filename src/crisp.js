import { Crisp } from "crisp-sdk-web";

export const initCrisp = () => {
  Crisp.configure(`${import.meta.env.VITE_CRISP_ID}`);
};
