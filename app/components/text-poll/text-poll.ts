import "./text-poll.css";

import { LiveLikePoll, QuizOption, html } from "@livelike/engagementsdk";

export class TntTextPoll extends LiveLikePoll {
  
  connectedCallback(): Promise<void> {
    this.kind = "text-poll"
    return super.connectedCallback();
  }

  checkExpiry() {
    const interactiveUntil: string | undefined = this.widgetPayload.interactive_until;
    this.isExpired = interactiveUntil
      ? Date.now() > new Date(interactiveUntil).getTime()
      : false;
  }

  submitVote = (option: QuizOption) => {
    if (!this.disabled && option.id !== this.selectedOption.id) {
      this.selectedOption = option;
      this.syntheticIncrement = true;
      this.interactionEvent();
    }
  };
  
  lockInVote = (_option: any) => {
    if (!this.voteDisable && this.selectedOption?.id) {
      this.updateVoteCount(this.selectedOption);
      this.voteDisable = true;
      this.createVote(this.selectedOption.vote_url).then(() => {
        this.quizVoteSubmitted = true;
        this.disabled = true;
      });
    }
  };
  
  firstUpdated(): void {
    super.firstUpdated()
    this.updateComplete.then(() => {
      if (this.interaction) {
        this.disabled = true;
        this.voteDisable = true;
      }
    });
  }

  render() {
    const renderSubmitBtnText = () => {
      this.checkExpiry()
      if (this.isExpired) {
        if (this.interaction) return  this.owner.localize('widget.submitted.expired');
        else return this.owner.localize('widget.expired');
      } else {
        if (this.disabled) return this.owner.localize('widget.submitted');
        return this.owner.localize('widget.submit');;
      }
    };

    return html`
      <template kind="text-quiz">
  <livelike-widget-root>
    <livelike-widget-header>
      <div class="quiz">Quiz</div>
      <livelike-title></livelike-title>
      <livelike-timer></livelike-timer>
      <livelike-dismiss-button></livelike-dismiss-button>
    </livelike-widget-header>
    <livelike-widget-body>
    <livelike-select>
      <template>
        <livelike-option class="option-container">
          
                  <div class="info-container">
                    <livelike-description class="player-name"></livelike-description>
                    <div class="percentage-bar">
                      <livelike-progress class="percentage-fill"></livelike-progress>
                    </div>
                  </div>
                  <livelike-percentage class="percentage-text"></livelike-percentage>
          
        </livelike-option>
      </template>
    </livelike-select>
    <livelike-footer>
                  <button
                    class="vote-button"
                    @click=${this.lockInVote}
                    ?disabled="${!this.selectedOption ||
      !this.selectedOption.id ||
      this.quizVoteSubmitted ||
      this.voteDisable ||
      this.disabled}"
                  >
                  ${renderSubmitBtnText()}
                  </button>
                  
                </livelike-footer>
                <livelike-widget-body>
  </livelike-widget-root>
</template>
    `;
  }
}

// customElements.define(
//   "ll-tnt-image-quiz",
//   LLtntImageQuiz as any
// );
