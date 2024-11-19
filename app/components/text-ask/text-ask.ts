import "./text-ask.css";

import { LiveLikeTextAsk, html } from "@livelike/engagementsdk";

export class TntTextAsk extends LiveLikeTextAsk {

  connectedCallback(): Promise<void> {
    this.kind = "text-ask"
    return super.connectedCallback();
  }

  checkExpiry() {
    const interactiveUntil: string | undefined = this.widgetPayload.interactive_until;
    this.isExpired = interactiveUntil
      ? Date.now() > new Date(interactiveUntil).getTime()
      : false;
  }

  render() {
    const renderSubmitBtnText = () => {
      this.checkExpiry()
      if (this.isExpired) {
        if (this.interaction) return this.owner.localize('widget.submitted.expired');
        else return this.owner.localize('widget.expired');
      } else {
        if (this.disabled) return this.owner.localize('widget.submitted');
        return this.owner.localize('widget.submit');;
      }
    };

    const charactersLeft = this.disabled
      ? null
      : html`<span class="text-ask-input-counter">${this.maxlength}</span>`;
    return html`
        <template>
          <livelike-widget-root>
            <livelike-widget-header>
              <livelike-title></livelike-title>
              <livelike-timer></livelike-timer>
              <livelike-dismiss-button></livelike-dismiss-button>
            </livelike-widget-header>
            <livelike-widget-body>
              <div class="text-ask-prompt-container">
                <span class="text-ask-prompt">${this.prompt}</span>
              </div>
              <form class="text-ask-form">
                <div class="text-ask-input-container">
                  <textarea
                    class="text-ask-input"
                    type="text"
                    name="reply"
                    rows="2"
                    .value=${this.text}
                    maxlength="${this.maxlength}"
                    ?disabled="${this.disabled}"
                    placeholder=${this.owner.localize(
                    "widget.textAsk.placeholder"
                  )}
                    @input=${this.inputHandler}
                  ></textarea>
                  ${charactersLeft}
                </div>
              </form>
              <div class="text-ask-footer">
                <button
                    class="vote-button"
                    @click=${this.submitReply}
                    ?disabled="${this.disabled || this.replyDisable}"
                  >
                  ${renderSubmitBtnText()}
                </button>
                <div
                  class="confirmation-message-container ${!this.showConfirmation
                  ? "hidden"
                  : ""}">
                  <span class="confirmation-message"
                    >${this.confirmation_message}</span
                  >
                </div>
              </div>
              ${this.owner.renderWidgetFooter()}
            </livelike-widget-body>
          </livelike-widget-root>
        </template>
      `;
  }
}

// customElements.define(
//   "ll-tnt-image-quiz",
//   LLtntImageQuiz as any
// );
