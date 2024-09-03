export interface IInArenaMatchParticipantTeam {
  name: string;
  id: string;
  flag: string;
  logo: string;
  isNational: boolean;
}

export interface IInArenaMatchParticipantResult {
  score: string;
  aggregate: string | null;
  isWinner: boolean;
  isWinning: boolean;
  isQualified: boolean;
}

export interface IInArenaMatchParticipant {
  id: string;
  participant: IInArenaMatchParticipantTeam;
  result: IInArenaMatchParticipantResult | null;
}

export interface IInArenaMatchDetails {
  id: string;
  description: string;
  status: string;
  startTime: string;
  participants: IInArenaMatchParticipant[];
}
