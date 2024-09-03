export interface ILLCreateProgramArg {
  customId: string;
  title: string;
  clientId?: string;
  scheduledAt?: string;
  customData?: string;
}

export interface ILLGetProgramArg {
  customId: string;
}

export interface ILLProgram {
  id: string;
  custom_data: string;
  title: string;
}

export interface ILLWidgetOption {
  description: string;
  imageUrl: string;
}

export interface ILLCreateWidgetArg<TWidgetOption = ILLWidgetOption> {
  programId: string;
  question: string;
  options: TWidgetOption[];
  widgetAttributes?: { key: string; value: string }[];
  customData?: string;
  interactiveUntil?: string;
}

export interface ILLPublishWidgetArg {
  url: string;
  delayDuration: string;
}

export interface IAsset {
  id: string;
  url: string;
  client_id: string;
  created_at: string;
  description: string;
  file: string;
  mimetype: string;
  tags: string;
}
