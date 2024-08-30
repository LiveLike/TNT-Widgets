/* eslint-disable @typescript-eslint/unbound-method */
import {
  ImageNumberPredictionOption,
  LiveLikeNumberPrediction,
  html,
  PredictionEvent,
} from '@livelike/engagementsdk';

import "./image-number-prediction.css";

export const predictionVotes = {};

export class TNTImageNumberPrediction extends LiveLikeNumberPrediction {
  connectedCallback() {
    this.kind = 'image-number-prediction';
    return super.connectedCallback().then(() => {
      const interactiveUntil: string = this.widgetPayload.interactive_until;
      this.isExpired = interactiveUntil
        ? Date.now() > new Date(interactiveUntil).getTime()
        : false;
    });
  }

  firstUpdated() {
    super.firstUpdated();
    this.updateComplete.then(() => {
      if (this.interaction) {
        this.disabled = true;
      }
    });
    this.addEventListener('prediction', ((e: PredictionEvent) => {
      //@ts-ignore
      predictionVotes[e.detail.widget.id] = {
        option_id: e.detail.prediction.option_id,
        claim_token: e.detail.prediction.claim_token,
      };
    }) as EventListener);
  }

  lockInVote = (options: ImageNumberPredictionOption[]) => {
    if (!this.disabled && !this.voteButtonDisabled) {
      this.voteDisable = true;
      const data = {
        votes:
          options &&
          options instanceof Array &&
          options.map((option) => ({
            option_id: option.id,
            number: option.number,
          })),
      };
      this.createVote(this.vote_url, data).then(() => {
        this.voteDisable = true;
        this.disabled = true;
        this.disableOptions();
      });
    }
  };
  disableOptions = () => {
    const optionsList = this.querySelectorAll('.livelike-voting-number-input');
    optionsList.forEach((element: Element) => {
      element.setAttribute('disabled', 'true');
    });
  };

  render() {
    const renderSubmitBtnText = () => {
      if (this.isExpired) {
        if (this.interaction) return 'Expired - Answer submitted';
        else return 'Expired';
      } else {
        if (this.disabled) return 'Submitted';
        else return 'Submit';
      }
    };

    return html`
      <template kind="image-number-prediction">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <div class="quiz">QUIZ</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <livelike-select>
              <template>
                <tnt-image-number-prediction-option
                  .isFollowUp=${false}
                  .isDisabled=${this.disabled ||
                  this.voteDisable ||
                  this.isExpired ||
                  this.interaction}
                  .inputHandler=${this.inputHandler}
                  .keypressHandler=${this.keypressHandler}
                >
                </tnt-image-number-prediction-option>
              </template>
            </livelike-select>
            <livelike-footer>
              <button
                class=${`widget-button ${
                  this.isExpired
                    ? 'widget-expired'
                    : !this.voteButtonDisabled
                      ? 'option-selected'
                      : ''
                }`}
                @click=${() => this.lockInVote(this.options)}
                ?disabled=${this.disabled}
              >
                ${renderSubmitBtnText()}
              </button>
            </livelike-footer>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
