declare module '@livelike/engagementsdk' {
  function html(strings: TemplateStringsArray, ...a: unknown[]): unknown;
  const userProfile: {
    id: string;
  };
  enum SdkEvent {
    INITIALISED = 'INITIALISED',
  }
  type LiveLikeInitArgs = {
    clientId: string;
  };
  function init(initArgs: LiveLikeInitArgs): Promise<void>;

  function addSdkEventListener(
    sdkEvent: SdkEvent,
    loadReactionDetails: () => void
  ): void;
  function removeEventListener(
    sdkEvent: SdkEvent,
    loadReactionDetails: () => void
  ): void;

  const _$$: {
    ready: boolean;
  };

  export type ReactionSpace = {
    id: string;
  };

  const reactionSpaceController: {
    loadReactionSpaceDetail({ targetGroupId: string }): Promise<ReactionSpace>;
  };

  const reactionPackController: {
    loadReactionPackFromReactionSpace(
      reactionSpace: ReactionSpace
    ): Promise<void>;
  };

  export type LoadUserReaction = {
    reactionSpaceId: string;
    targetIds: string[];
  };

  const userReactionController: {
    loadUserReactions(
      loadUserReaction: LoadUserReaction
    ): Promise<{ id: string }>;
  };

  export type UserReaction = {
    count: number;
    self_reacted_user_reaction_id: string;
    imageSrc: string;
  };

  class LiveLike extends HTMLElement {
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    firstUpdated(): void;
    update(): void;
    inputHandler(arg1: unknown, arg2: unknown): void;
    keypressHandler(e: Event): void;
  }
  class LiveLikeReaction extends LiveLike {
    showReactionPicker: boolean;
    userReactions: UserReaction[];
    toggleReactionPicker(e: Event): void;
    targetGroupId: string;
    targetId: string;
    handleReactionClick(userReaction: UserReaction): void;
    hideReactionPicker(e: Event): void;
    setup(reactionSpaceId: string): void;
  }

  class LiveLikeEmbedReaction extends HTMLElement {}

  class LiveLikeOption extends LiveLike {
    correct: boolean;
    incorrect: boolean;
    isFollowUp: boolean;
    isDisabled: boolean;
    isExpired: boolean;
    option: ImageNumberPredictionOption;
    optionSelected(MouseEvent: e): void;
  }

  export type WidgetPayload = {
    interactive_until: string;
  };

  export type ImageNumberPredictionOption = {
    id: string;
    number: number;
    correct_number?: number;
  };

  export type PredictionEvent = Event & {
    detail: {
      widget: {
        id: string;
      };
      prediction: {
        option_id: string;
        claim_token: string;
      };
    };
  };

  class LiveLikeQuiz extends LiveLike {
    connectedCallback(): Promise<void>;
    kind: string | undefined;
    widgetPayload: {
      interactive_until?: string;
    };
    isExpired: boolean;
    interaction:string;
  }

  class LiveLikeNumberPrediction extends LiveLike {
    showReactionPicker: boolean;
    isExpired: boolean;
    disabled: boolean;
    voteButtonDisabled: boolean;
    voteDisable: boolean;
    interaction: boolean;
    widgetPayload: WidgetPayload;
    vote_url: string;
    kind: string;
    options: ImageNumberPredictionOption[];
    updateComplete: Promise<void>;
    createVote(voteUrl: string, data: unknown): Promise<void>;
  }

  class LiveLikeNumberFollowUp extends LiveLike {
    options: ImageNumberPredictionOption[];
    interaction: boolean;
    isUserInteracted: boolean;
  }
}
