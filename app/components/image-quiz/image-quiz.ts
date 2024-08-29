import "./image-quiz.css";

import { LiveLikeQuiz, html } from "@livelike/engagementsdk";

export class LLtntImageQuiz extends LiveLikeQuiz {
  lockInVote: any;
  selectedOption: any;
  quizVoteSubmitted: boolean = false;
  voteDisable: any;
  disabled: any;
  votedLabel: any;
  connectedCallback(): Promise<void> {
    this.kind = "image-quiz"
    return super.connectedCallback();
  }

  checkExpiry() {
    const interactiveUntil: string | undefined= this.widgetPayload.interactive_until;
    this.isExpired = interactiveUntil
      ? Date.now() > new Date(interactiveUntil).getTime()
      : false;
  }

  render() {
    const renderSubmitBtnText = () => {
      this.checkExpiry()
      if (this.isExpired) {
        if (this.interaction) return "Expired - Answer submitted";
        else return "Expired";
      } else {
        if (this.disabled) return "Submitted";
        else return "Submit";
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
          
                  <livelike-image class="player-image"></livelike-image>
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
