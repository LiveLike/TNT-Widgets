import {
  ImageNumberPredictionOption,
  LiveLikeNumberFollowUp,
  html,
} from '@livelike/engagementsdk';

import "./image-number-prediction-follow-up.css";

export class TNTImageNumberPredictionFollowUp extends LiveLikeNumberFollowUp {
  render() {
    const isUserCorrect =
      this.options?.filter(
        (option: any) =>
          option.number === option.correct_number
      ).length === 2
        ? true
        : false;

    return html`
      <template kind="image-number-prediction-follow-up">
        <livelike-widget-root class="custom-widget">
          <livelike-widget-header class="widget-header" slot="header">
            <div>Quiz</div>
            <livelike-title class="custom-title"></livelike-title>
          </livelike-widget-header>
          <livelike-widget-body>
            <livelike-select>
              <template>
                <tnt-image-number-prediction-option
                  .isFollowUp=${true}
                  .isExpired=${!(this.interaction || this.isUserInteracted)}
                >
                </tnt-image-number-prediction-option>
              </template>
            </livelike-select>
            <livelike-footer>
              <div class="results">
                ${this.interaction || this.isUserInteracted
                  ? isUserCorrect
                    ? 'Correct!'
                    : 'Wrong!'
                  : 'Expired - No selection submitted'}
              </div>
            </livelike-footer>
          </livelike-widget-body>
        </livelike-widget-root>
      </template>
    `;
  }
}
