import { ITNTWidgets, TNTWidgetType } from "../entities";

export interface ICreateWidgetsArg {
  matchId: string;
  widgetTypes: TNTWidgetType[];
}

export interface IMatchApi {
  createWidgets: (arg: ICreateWidgetsArg) => Promise<ITNTWidgets>;
}
