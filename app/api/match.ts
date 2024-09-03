import LiveLike from "@livelike/engagementsdk";
import {
  ILLGetProgramArg,
  ILLProgram,
  ITNTWidgets,
  TNTWidgetType,
} from "../types";
import { request } from "https";

const { userProfile } = LiveLike;

const LIVELIKE_CLIENT_ID = 'NHSsguscIF6g4OlAdI5dEdtm8zIGFHFG0Pv0EdQz'//import.meta.env.VITE_LL_CLIENT_ID;
const LIVELIKE_ENDPOINT = 'https://cf-blast.livelikecdn.com/api/v1/'//import.meta.env.VITE_LL_ENDPOINT;
const API_BASE_URL = 'https://tnt-match-center-qa-backend.livelikeapp.com'//import.meta.env.VITE_API_BASE_URL;

// const GAME_CENTER_API_KEY = import.meta.env.VITE_GAME_CENTER_API_KEY;
const apiHeaders = {
  Authorization: `Bearer ${userProfile.access_token}`,
};

export async function createWidgets(
  matchId: string,
  widgetTypes: TNTWidgetType[]
): Promise<ITNTWidgets> {
  const res = await fetch(`${API_BASE_URL}/tnt-match-center/widgets`, {
    method: "POST",
    headers: {
      ...apiHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      matchId,
      widgetTypes: widgetTypes.join(","),
    }),
  });
  return res.json();
}

export async function getProgram({
  customId,
}: ILLGetProgramArg): Promise<ILLProgram | undefined> {
  return fetch(`${LIVELIKE_ENDPOINT}/program-by-custom-id/${LIVELIKE_CLIENT_ID}/${customId}`)
    .then((response) => {
      if (!response.ok) {
        return undefined;
      }
      return response.json();
    })
    .catch(() => {
      return undefined;
    });
}
