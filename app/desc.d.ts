
declare module '@livelike/engagementsdk' {
  function html(strings: TemplateStringsArray, ...a: unknown[]): unknown;
  function property(options: PropertyOptions): PropertyDecorator;
  const userProfile: {
    id: string;
    access_token: string;
  };
  enum SdkEvent {
    INITIALISED = 'INITIALISED',
  }
  type LiveLikeInitArgs = {
    clientId: string;
  };
  function init(initArgs: LiveLikeInitArgs): Promise<void>;

  function applyLocalization(localization: { [languageCode: string]: { [key: string]: string, [value: string]: string } }): void;

  type IWidgetResults = {
    results: IWidgetPayload[];
  };

  function getWidgets(widgetArds: IWidgetArgs): Promise<IWidgetResults>;

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
    url: string;
    average_magnitude: number;
    options: ImageNumberPredictionOption[];
    vote_url: string;
    initial_magnitude: number;
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

  class LiveLikeCheerMeter extends LiveLike {
    connectedCallback(): Promise<void>;
    kind: string | undefined;
    widgetPayload: WidgetPayload;
    vote_url: string;
    kind: string;
    options: ImageNumberPredictionOption[];
    updateComplete: Promise<void>;
    createVote(voteUrl: string, data: unknown): Promise<void>;
  }

  export type SliderInteraction = {
    magnitude: number;
  };

  class LiveLikeEmojiSlider extends LiveLike {
    connectedCallback(): Promise<void>;
    kind: string | undefined;
    widgetPayload: WidgetPayload;
    vote_url: string;
    kind: string;
    options: ImageNumberPredictionOption[];
    updateComplete: Promise<void>;
    createVote(voteUrl: string, data: unknown): Promise<void>;
    isExpired: boolean;
    url: string;
    average_magnitude: number; 
    voteDisable: boolean;
    showUserVoteInstantly: boolean;
    updateAverageMagnitude(magnitude: number): void;
    sliderVoteSubmitted: boolean;
    disabled: boolean;
    interaction: SliderInteraction;
    phase: string;
    val: number;
    userInteracted: boolean;
    owner: ElementOwner;
  }

  class LiveLikeWidgetElement extends LiveLike {
    connectedCallback(): Promise<void>;
    items: any;
    item: any;
    updateBackground(): void;
    updated(changedProps: Map<PropertyKey, unknown>): void;
  }

  export type ElementOwner = {
    localize: (key: string) => string;
  };

  class LiveLikeQuiz extends LiveLike {
    connectedCallback(): Promise<void>;
    kind: string | undefined;
    widgetPayload: {
      interactive_until?: string;
    };
    isExpired: boolean;
      interaction:string;
    owner: ElementOwner;
    localize: (key: string) => string;
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
    owner: ElementOwner;
  }

  class LiveLikeNumberFollowUp extends LiveLike {
    options: ImageNumberPredictionOption[];
    interaction: boolean;
    isUserInteracted: boolean;
  }
}