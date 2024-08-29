import "./image-number-prediction-follow-up.css";
import "../image-number-prediction-option";

import { LiveLikeNumberFollowUp } from "@livelike/engagementsdk";

const html = (window as any).html;

export class LLtntImageNumberPredictionFollowUp extends LiveLikeNumberFollowUp {
  render() {
    const isUserCorrect =
      this.options?.filter(
        (option: any) => option.number === option.correct_number
      ).length === 2
        ? true
        : false;

    return html`
      <template kind="image-number-prediction-follow-up">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <div class="quiz">prediction</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <livelike-select>
              <template>
                <ll-tnt-image-number-prediction-option .isFollowUp=${true} .isExpired=${!(this.interaction || this.isUserInteracted)}>
                </ll-tnt-image-number-prediction-option>
              </template>
            </livelike-select>
            <livelike-footer>
              <button class="results">
                ${this.interaction || this.isUserInteracted
        ? isUserCorrect
          ? "Submitted"
          : "Submitted"
        : "Expired"}

              </button>
            </livelike-footer>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}

// customElements.define(
//   "ll-tnt-image-number-prediction-follow-up",
//   LLtntImageNumberPredictionFollowUp as any
// );
