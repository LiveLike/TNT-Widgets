import { WidgetKind } from "@livelike/javascript";

export enum TNTWidgetType {
  MATCH_SCORE_NUMBER_PREDICTOR = "match-score-number-predictor",
  MATCH_SCORE_NUMBER_PREDICTOR_RESULT = "match-score-number-predictor-result",
  TEAM_CHEER_METER = "team-cheer-meter",
  TEAM_EMOJI_SLIDER = "team-emoji-slider",
}

export interface ITNTWidget {
  widgetType: TNTWidgetType;
  widgetId: string;
  widgetKind: WidgetKind;
}

export interface ITNTWidgets {
  programId: string;
  widgets: ITNTWidget[];
}
